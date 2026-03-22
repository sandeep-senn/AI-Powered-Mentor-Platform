import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Copy, Rocket, RotateCcw, ArrowRightLeft, Sparkles, Check, Clock, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import ConfirmModal from "../components/ConfirmModal";

export default function CodeConvertor() {
  const [code, setCode] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("Python");
  const [convertedCode, setConvertedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { user } = useAuth();

  const languages = ["Python", "JavaScript", "C++", "Java", "Go", "Rust", "TypeScript", "Swift"];

  useEffect(() => {
    if (user) fetchHistory();
  }, [user]);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("converter_history")
        .select("*")
        .eq("user_email", user.email)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setHistory(data || []);
    } catch (err) {
      console.error("History fetch error:", err);
    }
  };

  const handleConvert = async () => {
    if (!code.trim()) return toast.error("Please enter some code");
    setLoading(true);
    try {
      // Get the session token for the Authorization header
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await axios.post(
        "https://ai-powered-mentor-platform.onrender.com/convert-code", 
        { 
          sourceCode: code, 
          fromLang: "Code", 
          toLang: targetLanguage 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      const result = res.data.convertedCode;
      setConvertedCode(result);
      
      if (user) {
        await supabase.from("converter_history").insert([{
          user_id: user.id,
          user_email: user.email,
          source_code: code,
          target_lang: targetLanguage,
          converted_code: result
        }]);
        fetchHistory();
      }
      
      toast.success("Conversion complete! ✨");
    } catch (error) {
      if (error.response?.status === 429) {
        toast.warning(error.response.data.message || "Daily limit reached. Upgrade to Premium.");
      } else {
        toast.error("Conversion failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const deleteHistoryItem = async (id) => {
    try {
      const { error } = await supabase.from("converter_history").delete().eq("id", id);
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
               <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-500/20">
                  <ArrowRightLeft size={24} />
               </div>
               <h1 className="text-4xl font-extrabold tracking-tight">AI Code <span className="text-indigo-600">Converter</span></h1>
            </div>
            <p className="text-zinc-500 font-medium max-w-md">Instantly translate your snippets into any major programming language.</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-zinc-900 p-2 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm">
             <div className="flex flex-col px-3">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Target Language</span>
                <select 
                  value={targetLanguage} 
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="bg-transparent text-sm font-bold outline-none cursor-pointer hover:text-indigo-600 transition-colors dark:text-white"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang} className="dark:bg-zinc-900">{lang}</option>
                  ))}
                </select>
             </div>
             <div className="w-[1px] h-8 bg-zinc-200 dark:bg-white/10 mx-1 hidden sm:block" />
             <button
               onClick={handleConvert}
               disabled={loading}
               className="group px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
             >
               {loading ? "Converting..." : <><Rocket size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Convert</>}
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[500px]">
          <div className="flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all hover:border-indigo-500/30">
            <div className="px-8 py-4 border-b border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02] flex justify-between items-center">
               <div className="flex items-center gap-2 text-zinc-500">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-xs font-bold uppercase tracking-widest">Source Code</span>
               </div>
               <button onClick={() => setCode("")} className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-all rounded-lg">
                  <RotateCcw size={16} />
               </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Paste your code here..."
              className="flex-1 p-8 bg-transparent border-none outline-none resize-none font-mono text-sm dark:text-zinc-300 leading-relaxed"
            />
          </div>

          <div className="flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all hover:border-purple-500/30">
            <div className="px-8 py-4 border-b border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02] flex justify-between items-center">
               <div className="flex items-center gap-2 text-zinc-500">
                  <Sparkles size={16} className="text-purple-500" />
                  <span className="text-xs font-bold uppercase tracking-widest">AI Result</span>
               </div>
               <button 
                onClick={() => handleCopy(convertedCode)} 
                disabled={!convertedCode}
                className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-zinc-400 hover:text-indigo-600 transition-all rounded-lg disabled:opacity-30"
               >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
               </button>
            </div>
            <div className="flex-1 p-8 overflow-y-auto font-mono text-sm">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-4">
                   <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
                   <p className="font-mono text-sm">Translating logic...</p>
                </div>
              ) : (
                <div className="prose prose-sm dark:prose-invert max-w-none prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/5">
                  <ReactMarkdown>{convertedCode || "_Converted code will appear here..._"}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>

        {history.length > 0 && (
          <div className="mt-8 space-y-6">
             <div className="flex items-center gap-3 px-4">
                <Clock size={20} className="text-zinc-400" />
                <h2 className="text-xl font-bold">Conversion History</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {history.map((item) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="group bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                       <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-indigo-600/10 text-indigo-600 text-[10px] font-bold rounded-full uppercase tracking-widest">
                             {item.target_lang}
                          </span>
                       </div>
                       <div className="flex gap-2">
                          <button onClick={() => setCode(item.source_code)} title="Load Source" className="p-2 rounded-lg bg-zinc-50 dark:bg-white/5 hover:text-indigo-600 transition-colors">
                             <RotateCcw size={14} />
                          </button>
                          <button onClick={() => setItemToDelete(item.id)} className="p-2 rounded-lg bg-zinc-50 dark:bg-white/5 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                             <Trash2 size={14} />
                          </button>
                       </div>
                    </div>
                    <div className="relative">
                       <pre className="text-[10px] font-mono text-zinc-500 dark:text-zinc-500 bg-zinc-50 dark:bg-black/20 p-3 rounded-xl overflow-hidden h-24 line-clamp-4">
                          {item.converted_code}
                       </pre>
                       <button onClick={() => handleCopy(item.converted_code)} className="absolute bottom-2 right-2 p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-all hover:scale-105">
                          <Copy size={12} />
                       </button>
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
        title="Delete Item?"
        description="Are you sure you want to remove this conversion from your history?"
      />
    </div>
  );
}
