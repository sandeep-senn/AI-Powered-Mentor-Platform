import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Bug, Search, RotateCcw, Clock, Sparkles, Code2, Trash2, Copy, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import ConfirmModal from "../components/ConfirmModal";
import { motion } from "framer-motion";

export default function CodeDebugger() {
  const [code, setCode] = useState("");
  const [diagnostics, setDiagnostics] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchHistory();
  }, [user]);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("debugger_history")
        .select("*")
        .eq("user_email", user.email)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setHistory(data || []);
    } catch (err) {
      console.error("History fetch error:", err);
    }
  };

  const handleDebug = async () => {
    if (!code.trim()) return toast.error("Please enter code to debug");
    setLoading(true);
    setDiagnostics("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await axios.post(
        "https://ai-powered-mentor-platform.onrender.com/debug-code", 
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      const result = res.data.result;
      setDiagnostics(result);
      
      if (user) {
        await supabase.from("debugger_history").insert([{
          user_id: user.id,
          user_email: user.email,
          source_code: code,
          diagnostics: result
        }]);
        fetchHistory();
      }
      
      toast.success("Analysis complete! 🔍");
    } catch (error) {
      if (error.response?.status === 429) {
        toast.warning(error.response.data.message || "Daily limit reached. Upgrade to Premium.");
      } else {
        toast.error("Analysis failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteHistoryItem = async (id) => {
    try {
      const { error } = await supabase.from("debugger_history").delete().eq("id", id);
      if (error) throw error;
      setHistory(history.filter(item => item.id !== id));
      toast.info("Item removed from history");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 bg-zinc-50 dark:bg-[#09090b] flex flex-col items-center transition-colors duration-500">
      <div className="w-full max-w-6xl flex flex-col gap-10 animate-in fade-in duration-700">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
               <div className="p-3 bg-red-600 rounded-2xl text-white shadow-xl shadow-red-500/20">
                  <Bug size={24} />
               </div>
               <h1 className="text-4xl font-extrabold tracking-tight">AI <span className="text-red-600">Bug Analyzer</span></h1>
            </div>
            <p className="text-zinc-500 font-medium max-w-md">Surface errors faster, understand root causes, and get clearer repair suggestions.</p>
          </div>

          <button
            onClick={handleDebug}
            disabled={loading}
            className="group px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg shadow-red-500/20 flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search size={20} className="group-hover:scale-110 transition-transform" />
            )}
            {loading ? "Analyzing..." : "Analyze Code"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[500px]">
          <div className="flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all hover:border-red-500/30">
            <div className="px-8 py-4 border-b border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02] flex justify-between items-center">
               <div className="flex items-center gap-2 text-zinc-500">
                  <Code2 size={16} className="text-red-500" />
                  <span className="text-xs font-bold uppercase tracking-widest">Analysis Lab</span>
               </div>
               <button onClick={() => setCode("")} className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-all rounded-lg">
                  <RotateCcw size={16} />
               </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Paste your buggy code here..."
              className="flex-1 p-8 bg-transparent border-none outline-none resize-none font-mono text-sm dark:text-zinc-300 leading-relaxed"
            />
          </div>

          <div className="flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all hover:border-emerald-500/30 relative">
            <div className="px-8 py-4 border-b border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02] flex items-center gap-2 text-zinc-500">
               <Sparkles size={16} className="text-emerald-500" />
               <span className="text-xs font-bold uppercase tracking-widest">AI Diagnostics Report</span>
            </div>
            <div className="flex-1 p-8 overflow-y-auto font-sans text-sm text-zinc-300">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-4">
                   <div className="w-16 h-16 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
                   <p className="font-mono text-sm animate-pulse">Running diagnostics...</p>
                </div>
              ) : diagnostics ? (
                <div className="prose prose-sm dark:prose-invert max-w-none prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/5">
                   <ReactMarkdown>{diagnostics}</ReactMarkdown>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-zinc-400 text-center gap-4 opacity-40">
                   <AlertCircle size={48} />
                   <p className="italic">Hit "Analyze Code" to start analysis.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {history.length > 0 && (
          <div className="mt-8 space-y-6">
             <div className="flex items-center gap-3 px-4 text-zinc-400">
                <Clock size={20} />
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Recent Diagnostics</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {history.map((item) => (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="group bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                       <span className="text-[10px] text-zinc-400 font-medium italic">
                          {new Date(item.created_at).toLocaleDateString()}
                       </span>
                       <div className="flex gap-2">
                          <button onClick={() => setCode(item.source_code)} className="p-2 rounded-lg bg-zinc-50 dark:bg-white/5 hover:text-red-600 transition-colors">
                             <RotateCcw size={14} />
                          </button>
                          <button onClick={() => setItemToDelete(item.id)} className="p-2 rounded-lg bg-zinc-50 dark:bg-white/5 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                             <Trash2 size={14} />
                          </button>
                       </div>
                    </div>
                    <div className="relative overflow-hidden group">
                       <div className="text-[10px] font-mono text-zinc-500 dark:text-zinc-500 bg-zinc-50 dark:bg-black/20 p-3 rounded-xl h-24 line-clamp-4 leading-relaxed group-hover:bg-zinc-100 dark:group-hover:bg-black/40 transition-colors">
                          {item.diagnostics}
                       </div>
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>
        )}
      </div>
      <ConfirmModal 
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={() => deleteHistoryItem(itemToDelete)}
        title="Delete Diagnostic?"
        description="Are you sure you want to remove this analysis from your history?"
      />
    </div>
  );
}
