import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Shield, Activity, Award, Code2, Bug, MessageSquare } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";

export default function Profile() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ chat: 0, convert: 0, debug: 0 });

  useEffect(() => {
    if (user) fetchUserStats();
  }, [user]);

  const fetchUserStats = async () => {
    try {
      const [chatRes, convertRes, debugRes] = await Promise.all([
        supabase.from("chat_messages").select("*", { count: 'exact', head: true }).eq("user_email", user.email),
        supabase.from("converter_history").select("*", { count: 'exact', head: true }).eq("user_email", user.email),
        supabase.from("debugger_history").select("*", { count: 'exact', head: true }).eq("user_email", user.email)
      ]);

      setStats({
        chat: chatRes.count || 0,
        convert: convertRes.count || 0,
        debug: debugRes.count || 0
      });
    } catch (err) {
      console.error("Stats fetch failed");
    }
  };

  const statCards = [
    { label: "Messages Sent", value: stats.chat, icon: MessageSquare, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { label: "Code Conversions", value: stats.convert, icon: Code2, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Bugs Analyzed", value: stats.debug, icon: Bug, color: "text-red-500", bg: "bg-red-500/10" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] pt-32 pb-20 px-6 transition-colors duration-500">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-950/50 border border-zinc-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-purple-600" />
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative">
              <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-2xl shadow-indigo-500/30">
                <div className="w-full h-full rounded-[2.2rem] bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg border-4 border-white dark:border-zinc-950">
                <Shield size={16} />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight dark:text-white uppercase">@{user?.email?.split('@')[0]}</h1>
                <p className="text-zinc-500 font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
                  <Mail size={14} /> {user?.email}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                 <span className="px-4 py-1.5 bg-indigo-600/10 text-indigo-600 text-[10px] font-extrabold uppercase tracking-widest rounded-full border border-indigo-600/20">
                    Pro Member
                 </span>
                 <span className="px-4 py-1.5 bg-zinc-100 dark:bg-white/5 text-zinc-500 text-[10px] font-extrabold uppercase tracking-widest rounded-full flex items-center gap-2">
                    <Calendar size={12} /> Joined March 2026
                 </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white dark:bg-zinc-950/30 border border-zinc-200 dark:border-white/5 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all"
            >
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
                 <stat.icon size={24} />
              </div>
              <h3 className="text-3xl font-black text-zinc-900 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.4 }}
           className="bg-white dark:bg-zinc-950/20 border border-zinc-200 dark:border-white/5 rounded-[2rem] p-8"
        >
           <div className="flex items-center gap-3 mb-8">
              <Award className="text-amber-500" />
              <h2 className="text-xl font-bold">Platform Achievements</h2>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-white/[0.02] rounded-2xl border border-transparent hover:border-indigo-500/20 transition-all">
                 <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xs italic">1st</div>
                 <div>
                    <p className="text-sm font-bold">Early Adopter</p>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">Joined during Alpha</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-white/[0.02] rounded-2xl border border-transparent hover:border-indigo-500/20 transition-all opacity-50">
                 <div className="w-10 h-10 rounded-xl bg-zinc-500/10 text-zinc-500 flex items-center justify-center"><Activity size={18} /></div>
                 <div>
                    <p className="text-sm font-bold">In Progress</p>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter text-wrap">Complete 10 Roadmaps</p>
                 </div>
              </div>
           </div>
        </motion.div>

      </div>
    </div>
  );
}
