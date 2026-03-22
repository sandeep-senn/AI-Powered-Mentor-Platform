import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Check, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[200]"
        >
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-[2rem] p-6 shadow-2xl backdrop-blur-xl">
             <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
                   <Cookie size={24} />
                </div>
                <div className="flex-1">
                   <h3 className="text-lg font-bold mb-2">Cookie Preferences</h3>
                   <p className="text-zinc-500 text-sm font-medium leading-relaxed mb-6">
                      We use cookies to enhance your mentorship experience and analyze traffic. By clicking "Accept All", you agree to our use of cookies.
                   </p>
                   
                   <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        onClick={handleAccept}
                        className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 gap-2"
                      >
                         <Check size={18} /> Accept All
                      </Button>
                      <Button 
                        variant="ghost"
                        onClick={handleDecline}
                        className="flex-1 rounded-xl bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-300 font-bold h-12"
                      >
                         Decline
                      </Button>
                   </div>
                   
                   <div className="mt-4 flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest opacity-50">
                      <ShieldCheck size={12} className="text-emerald-500" />
                      GDPR & Privacy Compliant
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
