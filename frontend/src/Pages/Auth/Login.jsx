import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import authHeroBg from "../../assets/auth_hero_bg.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      toast.success("Welcome back! ✨");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#020202] text-white overflow-hidden">
      {/* Left Side: Visual Hero (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={authHeroBg} 
            alt="Auth Hero" 
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#020202] via-[#020202]/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-xl text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-4">
              <Sparkles size={12} />
              AI-Powered Mentorship
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-4 leading-tight">
              Level Up Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                Coding Skills
              </span>
            </h2>
            <p className="text-zinc-400 text-base font-medium leading-relaxed mb-8">
              Join thousands of developers mastering DSA, Cloud, and Full-Stack development with our specialized AI mentor.
            </p>
            <div className="flex items-center gap-12 grayscale opacity-40">
              <div className="text-sm font-bold tracking-widest uppercase">Trusted by 10k+ Engineers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-zinc-950/50 backdrop-blur-3xl border-l border-white/5">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-4 group">
              <ArrowRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Back to Home</span>
            </Link>
            <h1 className="text-3xl font-bold mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-zinc-400 text-sm font-medium">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 pl-12 pr-4 bg-white/[0.03] border border-white/5 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 rounded-xl outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Security Key</label>
                <button type="button" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors tracking-widest uppercase">Forgot Password?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 pl-12 pr-4 bg-white/[0.03] border border-white/5 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 rounded-xl outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-xl shadow-indigo-600/10 active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4 text-[10px] uppercase tracking-widest"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <LogIn size={18} />}
              <span>{loading ? "Signing in..." : "Enter Platform"}</span>
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-white/5">
            <p className="text-zinc-500 font-semibold text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1 font-bold">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
