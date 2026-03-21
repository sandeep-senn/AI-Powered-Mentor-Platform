import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Are you sure?", 
  description = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  variant = "danger" 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-[2rem] shadow-2xl p-8 overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-400 transition-all"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                variant === 'danger' ? 'bg-red-500/10 text-red-500' : 'bg-indigo-500/10 text-indigo-500'
              }`}>
                <AlertCircle size={32} />
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
                {title}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-8">
                {description}
              </p>

              <div className="flex w-full gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-4 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-300 font-bold rounded-2xl transition-all active:scale-95"
                >
                  {cancelText}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`flex-1 py-4 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 ${
                    variant === 'danger' 
                      ? 'bg-red-600 hover:bg-red-700 shadow-red-500/20' 
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20'
                  }`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
