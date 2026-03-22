import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Sparkles, Loader2, ArrowRight, Rocket, BookOpen, Zap } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

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
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error("Supabase credentials missing in .env");
      }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const features = [
    { icon: Rocket, text: "Instant AI Learning Solutions", color: "from-indigo-500 to-blue-500" },
    { icon: BookOpen, text: "Structured Learning Paths", color: "from-purple-500 to-pink-500" },
    { icon: Zap, text: "Real-time Code Optimization", color: "from-orange-500 to-red-500" }
  ];

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-zinc-50 dark:bg-[#09090b] overflow-hidden transition-colors duration-500">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/15 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/15 blur-[150px] rounded-full animate-pulse delay-700" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl mx-auto px-4 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[600px]">
          {/* Left Side - Login Form */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col"
          >
            <div className="max-w-md mx-auto w-full lg:mx-0">
              <motion.div variants={itemVariants} className="flex flex-col items-start mb-12">
                <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mb-6 shadow-2xl shadow-indigo-500/30">
                  <LogIn size={28} />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">Welcome Back</h1>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg">Continue your learning journey</p>
              </motion.div>

              <form onSubmit={handleLogin} className="space-y-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full h-13 pl-12 pr-4 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 focus:border-indigo-500/50 dark:focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 rounded-xl outline-none transition-all font-medium text-sm"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">Password</label>
                    <Link to="#" className="text-xs font-bold text-indigo-500 hover:text-indigo-600 transition-colors">Lost?</Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full h-13 pl-12 pr-4 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 focus:border-indigo-500/50 dark:focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 rounded-xl outline-none transition-all font-medium text-sm"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-13 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-2xl shadow-indigo-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                </motion.div>
              </form>

              <motion.div variants={itemVariants} className="mt-8">
                <p className="text-zinc-600 dark:text-zinc-400 text-sm text-center">
                  Don't have an account?{" "}
                  <Link to="/signup" className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors inline-flex items-center gap-1 group">
                    Create one
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Features with Gradient Background */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:flex flex-col justify-between h-full gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden"
          >
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 blur-3xl rounded-full -ml-20 -mb-20" />

            <div className="relative z-10">
              <motion.div variants={itemVariants} className="mb-12">
                <h2 className="text-5xl font-extrabold text-white mb-4 leading-tight">
                  Master Coding,{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-orange-200">
                    Fast
                  </span>
                </h2>
                <p className="text-white/90 text-lg font-medium">
                  AI-powered learning platform designed for developers who want to level up their skills
                </p>
              </motion.div>

              <div className="space-y-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      transition={{ delay: 0.1 * (index + 1) }}
                      className="flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg`}>
                        <Icon size={24} />
                      </div>
                      <span className="font-semibold text-white text-lg">{feature.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <motion.div variants={itemVariants} className="relative z-10 pt-8 border-t border-white/20">
              <p className="text-white/80 text-sm font-medium">
                Join <span className="font-bold text-white">5000+</span> developers learning with Mentor AI
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
