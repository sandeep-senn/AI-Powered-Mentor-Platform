import React from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Navbar />
      
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-indigo-500 opacity-20 dark:opacity-30 blur-[120px]"></div>
        <div className="absolute right-1/4 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-cyan-500 opacity-20 dark:opacity-20 blur-[120px]"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 md:px-12 text-center pt-32 pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="max-w-4xl mx-auto flex flex-col justify-center items-center"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.8, y: 20 },
              visible: { opacity: 1, scale: 1, y: 0 }
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800/50 mb-8 shadow-sm backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              Mentor AI Platform v2.0
            </span>
          </motion.div>

          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]"
          >
            Master Code Faster with an <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">AI Mentor</span>
          </motion.h1>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Struggling with bugs? Learn, debug, and translate code instantly. 
            Your personal engineering mentor available 24/7.
          </motion.p>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
          >
            <Button 
              onClick={() => navigate('/learn')}
              className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-full px-8 h-14 text-lg font-bold shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Start Learning <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              onClick={() => navigate('/features')}
              variant="outline"
              className="w-full sm:w-auto bg-white/50 hover:bg-white dark:bg-zinc-900/50 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-full px-8 h-14 text-lg font-bold backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
            >
              Explore Features
            </Button>
          </motion.div>
          
          <motion.p
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
            transition={{ delay: 1, duration: 1 }}
            className="text-sm font-medium text-zinc-500 dark:text-zinc-500 mt-12"
          >
            Trusted by 10K+ students • Powered by AI • Built for Developers
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
