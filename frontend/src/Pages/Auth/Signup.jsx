import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Mail, Lock, Sparkles, Loader2, ArrowRight, ShieldCheck, Github, Chrome } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
         throw new Error("Supabase credentials missing in .env");
      }
      const { error } = await signUp(email, password);
      if (error) throw error;
      toast.success("Account created! Verify your email. 📧");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 bg-zinc-50 dark:bg-[#09090b] overflow-hidden transition-colors duration-500">
      {/* Background Glows */}
      <div className="absolute top-[-5%] right-[-5%] w-[45%] h-[45%] bg-purple-500/10 blur-[140px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[45%] h-[45%] bg-indigo-500/10 blur-[140px] rounded-full animate-pulse delay-1000" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[440px] relative z-10"
      >
        <div className="bg-white/70 dark:bg-zinc-950/40 backdrop-blur-2xl border border-zinc-200 dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] rounded-[2.5rem] overflow-hidden">
          <div className="p-10 md:p-12">
            <motion.div variants={itemVariants} className="flex flex-col items-center mb-10 text-center">
              <div className="w-16 h-16 rounded-[22px] bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white mb-6 shadow-2xl shadow-purple-500/30">
                <UserPlus size={32} />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-2">Create Account</h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Start your journey with Mentor AI</p>
            </motion.div>

            <form onSubmit={handleSignup} className="space-y-6">
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Email Destination</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-purple-500 transition-colors" size={18} />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-14 pl-12 pr-4 bg-zinc-100 dark:bg-white/[0.03] border border-transparent focus:border-purple-500/50 dark:focus:border-purple-500/30 focus:ring-4 focus:ring-purple-500/10 rounded-2xl outline-none transition-all font-medium text-sm dark:text-white"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Security Key</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-purple-500 transition-colors" size={18} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-14 pl-12 pr-4 bg-zinc-100 dark:bg-white/[0.03] border border-transparent focus:border-purple-500/50 dark:focus:border-purple-500/30 focus:ring-4 focus:ring-purple-500/10 rounded-2xl outline-none transition-all font-medium text-sm dark:text-white"
                  />
                </div>
                <div className="flex items-center gap-2 mt-2 ml-1 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                   <ShieldCheck size={12} className="text-emerald-500" />
                   Min. 8 char + Symbols
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-purple-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                  <span className="tracking-wide">{loading ? "Initializing..." : "Create Identity"}</span>
                </button>
              </motion.div>
            </form>

            <motion.div variants={itemVariants} className="mt-10 flex flex-col items-center gap-6">
              <div className="flex items-center gap-4 w-full">
                <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-white/5" />
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Quick Access</span>
                <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-white/5" />
              </div>
              
              <div className="flex gap-4 w-full">
                <button className="flex-1 h-12 flex items-center justify-center gap-3 border border-zinc-200 dark:border-white/5 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/5 transition-all active:scale-95">
                  <Chrome size={18} />
                </button>
                <button className="flex-1 h-12 flex items-center justify-center gap-3 border border-zinc-200 dark:border-white/5 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/5 transition-all active:scale-95">
                  <Github size={18} />
                </button>
              </div>

              <p className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold">
                Already on board?{" "}
                <Link to="/login" className="text-purple-500 hover:text-purple-600 transition-colors inline-flex items-center gap-1 group">
                  Sign In
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
