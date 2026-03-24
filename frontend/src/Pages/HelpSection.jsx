import { useState, useEffect, useRef } from "react";
import { Send, Bot, Trash2, Sparkles, User, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import ConfirmModal from "../components/ConfirmModal";

export default function HelpSection() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const scrollRef = useRef(null);
  const { user } = useAuth();

  // Load chat history (Robust Version)
  useEffect(() => {
    const loadChatData = async () => {
      setIsLoadingHistory(true);
      
      // 1. Try to load from Supabase if user exists
      if (user) {
        try {
          const { data, error } = await supabase
            .from("chat_messages")
            .select("*")
            .eq("user_email", user.email)
            .order("created_at", { ascending: true });

          if (error) throw error;
          
          if (data && data.length > 0) {
            setMessages(data.map(m => ({ role: m.role, text: m.text })));
          } else {
            // Check if there's legacy guest data to sync
            const localData = localStorage.getItem("chatHistory");
            if (localData) {
              const parsed = JSON.parse(localData);
              if (parsed.length > 0) {
                // Bulk sync to cloud
                const toInsert = parsed.map(m => ({
                  user_id: user.id,
                  user_email: user.email,
                  role: m.role,
                  text: m.text
                }));
                await supabase.from("chat_messages").insert(toInsert);
                setMessages(parsed);
                localStorage.removeItem("chatHistory");
              }
            }
          }
        } catch (err) {
          console.error("Cloud load failed:", err);
          // Fallback to local if cloud fails (e.g. table doesn't exist yet)
          loadLocalFallback();
        }
      } else {
        // guest mode
        loadLocalFallback();
      }
      setIsLoadingHistory(false);
    };

    const loadLocalFallback = () => {
      const savedChat = localStorage.getItem("chatHistory");
      if (savedChat) {
        try { setMessages(JSON.parse(savedChat)); } catch (e) { setMessages([]); }
      }
    };

    loadChatData();
  }, [user]);

  // Handle Scroll and Local Storage (Only for guests)
  useEffect(() => {
    if (!user && !isLoadingHistory) {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, user, isLoadingHistory]);

  const handleSend = async (text = input) => {
    const msgText = typeof text === 'string' ? text : input;
    if (!msgText.trim()) return;

    const newUserMsg = { role: "user", text: msgText };
    setMessages(prev => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    if (user) {
      await supabase.from("chat_messages").insert([
        { user_id: user.id, user_email: user.email, role: "user", text: msgText }
      ]);
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await fetch("https://ai-powered-mentor-platform.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ message: msgText }),
      });

      // Handle non-streaming responses (navigation redirects, errors)
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        if (res.status === 429) {
          toast.warning(data.message || "Daily limit reached. Upgrade to Premium.");
          setIsTyping(false);
          return;
        }
        if (!res.ok) throw new Error(data.error || "Failed to connect");
        // Navigation reply
        const botMsg = { role: "bot", text: data.reply };
        setMessages(prev => [...prev, botMsg]);
        if (user) {
          await supabase.from("chat_messages").insert([
            { user_id: user.id, user_email: user.email, role: "bot", text: data.reply }
          ]);
        }
        setIsTyping(false);
        return;
      }

      // SSE Streaming response
      setIsTyping(false);
      // Add an empty bot message placeholder
      setMessages(prev => [...prev, { role: "bot", text: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const raw = decoder.decode(value, { stream: true });
        const lines = raw.split("\n").filter(l => l.startsWith("data: "));

        for (const line of lines) {
          try {
            const json = JSON.parse(line.replace("data: ", ""));
            if (json.error) { toast.error(json.error); break; }
            if (json.done) {
              // Save full reply to Supabase
              if (user) {
                await supabase.from("chat_messages").insert([
                  { user_id: user.id, user_email: user.email, role: "bot", text: fullText }
                ]);
              }
            }
            if (json.chunk) {
              fullText += json.chunk;
              // Update the last bot message live
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "bot", text: fullText };
                return updated;
              });
            }
          } catch { /* skip malformed lines */ }
        }
      }
    } catch (err) {
      toast.error("AI connection failed");
      setIsTyping(false);
    }
  };


  const clearChat = async () => {
    if (user) {
      const { error } = await supabase
        .from("chat_messages")
        .delete()
        .eq("user_email", user.email);
      
      if (error) {
        toast.error("Unable to clear cloud data");
      } else {
        setMessages([]);
        toast.success("History cleared");
      }
    } else {
      setMessages([]);
      localStorage.removeItem("chatHistory");
      toast.success("History cleared");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-10 flex flex-col items-center bg-zinc-50 dark:bg-[#09090b] px-4 transition-colors duration-500">
      <div className="w-full max-w-4xl flex flex-col h-[80vh] bg-white dark:bg-zinc-950/50 border border-zinc-200 dark:border-white/10 rounded-[2rem] shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="px-8 py-5 border-b border-zinc-100 dark:border-white/5 flex justify-between items-center bg-zinc-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
               <Bot size={22} />
            </div>
            <div>
               <h2 className="font-bold text-lg leading-none">AI Mentor</h2>
               <p className="text-[10px] text-zinc-500 font-medium lowercase tracking-widest mt-1 capitalize">
                 {user ? `Synced: ${user.email}` : "Guest Mode • Persistence active"}
               </p>
            </div>
          </div>
          <button onClick={() => setShowClearConfirm(true)} className="p-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-all duration-300">
            <Trash2 size={18} />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          {isLoadingHistory ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-400 gap-4">
               <Loader2 className="animate-spin text-indigo-600" size={32} />
               <p className="text-sm font-medium animate-pulse">Retrieving conversation...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-400 text-center space-y-4">
              <div className="p-6 rounded-full bg-indigo-600/5 border border-indigo-600/10 mb-2">
                 <Sparkles size={40} className="text-indigo-500 opacity-40" />
              </div>
              <p className="max-w-xs text-sm font-medium">Hello! I'm your AI Mentor. Ask me any coding or career question to begin.</p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-zinc-100 dark:bg-zinc-900 border dark:border-white/5'}`}>
                  {msg.role === 'user' ? <User size={18} /> : <Bot size={18} className="text-indigo-600 dark:text-indigo-400" />}
                </div>
                <div className={`max-w-[85%] px-5 py-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-zinc-100/50 dark:bg-white/[0.03] text-zinc-800 dark:text-zinc-200 rounded-tl-none border border-zinc-200/50 dark:border-white/5'
                }`}>
                  <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-white/5 line-break-anywhere">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))
          )}
          {isTyping && (
            <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border dark:border-white/5">
                  <Bot size={18} className="text-indigo-600 animate-pulse" />
               </div>
               <div className="px-5 py-4 rounded-3xl bg-zinc-100/50 dark:bg-white/[0.03] border dark:border-white/5 flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
               </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-zinc-50/50 dark:bg-white/[0.02] border-t border-zinc-100 dark:border-white/5">
           <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="relative flex items-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-2 rounded-2xl shadow-inner focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
              <input 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                placeholder={user ? "Synced with cloud..." : "Ask me anything..."} 
                className="flex-1 bg-transparent border-none px-4 py-2 text-sm outline-none placeholder:text-zinc-500 dark:text-white"
              />
              <button type="submit" disabled={!input.trim() || isTyping || isLoadingHistory} className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all duration-300 shadow-lg shadow-indigo-500/20">
                <Send size={18} />
              </button>
           </form>
           <p className="text-[10px] text-center text-zinc-500 mt-3 font-medium opacity-50 uppercase tracking-widest">
             {isLoadingHistory ? "Checking cloud session..." : "Conversation persistent via Link"}
           </p>
        </div>
      </div>
      <ConfirmModal 
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={clearChat}
        title="Clear Conversation?"
        description="This will permanently delete your entire chat history with the AI mentor."
      />
    </div>
  );
}
