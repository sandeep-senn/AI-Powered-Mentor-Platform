import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [planName, setPlanName] = useState('free');
  const [loading, setLoading] = useState(true);
  const isPremium = planName === 'gold';
  
  const refreshProfile = async (userId) => {
    if (!userId) {
      setPlanName('free');
      return;
    }
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('plan_name')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) throw error;

      if (data && data.plan_name) {
        setPlanName(data.plan_name);
      } else {
        // Safe Upsert: Create profile if missing (helps existing users)
        const { data: userData } = await supabase.auth.getUser();
        if (userData?.user) {
          await supabase.from('profiles').upsert(
            { id: userId, email: userData.user.email, plan_name: 'free' },
            { onConflict: 'id' }
          );
        }
        setPlanName('free');
      }
    } catch (err) {
      console.error("Profile sync error:", err);
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) refreshProfile(session.user.id);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        refreshProfile(session.user.id);
      } else {
        setPlanName('free');
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = (email, password) => supabase.auth.signUp({ email, password });
  const signIn = (email, password) => supabase.auth.signInWithPassword({ email, password });
  const signOut = () => supabase.auth.signOut();
  const forgotPassword = (email) =>
    supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
  const updatePassword = (password) => supabase.auth.updateUser({ password });

  const value = {
    signUp,
    signIn,
    signOut,
    forgotPassword,
    updatePassword,
    user,
    isPremium,
    refreshProfile: () => refreshProfile(user?.id),
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
