import React, { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Shield, Trash2, Globe, Heart, Sun } from "lucide-react";
import { ModeToggle } from "../../components/mode-toggle";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/ConfirmModal";

export default function SettingsPage() {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const settingsSections = [
    {
      title: "Appearance",
      icon: Sun,
      description: "Customize how Mentor AI looks on your screen.",
      action: <ModeToggle />
    },
    {
      title: "Data & Privacy",
      icon: Shield,
      description: "Manage your stored conversation and history data.",
      action: (
        <button 
          onClick={() => setShowClearConfirm(true)} 
          className="flex items-center gap-2 px-6 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all"
        >
          <Trash2 size={14} /> Clear History
        </button>
      )
    },
    {
       title: "Language preference",
       icon: Globe,
       description: "Choose your preferred interface language.",
       action: (
         <select className="bg-zinc-100 dark:bg-white/5 border-none outline-none p-2 rounded-lg text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            <option>English (US)</option>
            <option>Hindi (HI)</option>
         </select>
       )
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] pt-32 pb-20 px-6 transition-colors duration-500">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div className="space-y-2">
              <div className="flex items-center gap-3">
                 <div className="p-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl">
                    <Settings size={22} />
                 </div>
                 <h1 className="text-4xl font-extrabold tracking-tight dark:text-white">Settings</h1>
              </div>
              <p className="text-zinc-500 font-medium">Manage your account preferences and system configuration.</p>
           </div>
           
           <div className="px-6 py-2 bg-indigo-600/10 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-indigo-600/20">
              System Version v1.0.4-Beta
           </div>
        </div>

        <div className="space-y-6">
           {settingsSections.map((section, idx) => (
             <motion.div
               key={section.title}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: idx * 0.1 }}
               className="bg-white dark:bg-zinc-950/30 border border-zinc-200 dark:border-white/5 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 hover:border-indigo-500/20 transition-all shadow-sm"
             >
               <div className="flex items-center gap-6 text-center md:text-left">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-500">
                     <section.icon size={24} />
                  </div>
                  <div className="space-y-1">
                     <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{section.title}</h3>
                     <p className="text-sm text-zinc-500 max-w-sm">{section.description}</p>
                  </div>
               </div>
               <div className="shrink-0">{section.action}</div>
             </motion.div>
           ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-center pt-10"
        >
           <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2">
             Handcrafted with <Heart size={10} className="text-red-500 fill-red-500" /> by Sandeep Sen
           </p>
        </motion.div>
      </div>

      <ConfirmModal 
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={() => toast.success("History clear simulated! ✨")}
        title="Clear All History?"
        description="This will permanently delete your chats, conversions, and debugging logs from the cloud."
      />
    </div>
  );
}
