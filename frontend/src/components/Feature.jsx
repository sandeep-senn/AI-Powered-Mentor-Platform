import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, BrainCircuit, BookOpenText, Database, Cloud, Puzzle, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: 'Bug Analyzer',
    description: 'Pinpoint logic issues, understand failures, and get guided fixes in seconds.',
    icon: <Code size={32} className="text-indigo-600 dark:text-indigo-400" />,
    route: '/code-debugger',
    colSpan: 'md:col-span-2',
    bgClass: 'bg-indigo-50/50 dark:bg-indigo-950/20 hover:bg-indigo-50 dark:hover:bg-indigo-900/40',
  },
  {
    title: 'Code Translator',
    description: 'Rewrite code across languages without losing the original logic or structure.',
    icon: <Database size={32} className="text-blue-600 dark:text-blue-400" />,
    route: '/code-convertor',
    colSpan: 'md:col-span-1',
    bgClass: 'bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-50 dark:hover:bg-blue-900/40',
  },
  {
    title: 'Interview Prep Paths',
    description: 'Sharpen DSA, problem-solving, and core concepts with focused practice tracks.',
    icon: <BrainCircuit size={32} className="text-pink-600 dark:text-pink-400" />,
    route: '/learn',
    colSpan: 'md:col-span-1',
    bgClass: 'bg-pink-50/50 dark:bg-pink-950/20 hover:bg-pink-50 dark:hover:bg-pink-900/40',
  },
  {
    title: 'Skill Roadmaps',
    description: 'Follow structured learning journeys built to take you from basics to real-world fluency.',
    icon: <Puzzle size={32} className="text-green-600 dark:text-green-400" />,
    route: '/roadmap',
    colSpan: 'md:col-span-2 lg:col-span-1',
    bgClass: 'bg-green-50/50 dark:bg-green-950/20 hover:bg-green-50 dark:hover:bg-green-900/40',
  },
  {
    title: 'Mentor Chat',
    description: 'Get personalized guidance, quick explanations, and on-demand coding support anytime.',
    icon: <BookOpenText size={32} className="text-amber-600 dark:text-amber-400" />,
    route: '/help',
    colSpan: 'md:col-span-2 lg:col-span-1',
    bgClass: 'bg-amber-50/50 dark:bg-amber-950/20 hover:bg-amber-50 dark:hover:bg-amber-900/40',
  },
];

const Feature = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" ref={ref} className="min-h-screen bg-white dark:bg-zinc-950 py-32 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-6"
          >
            Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Level Up</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            Whether you're a beginner or preparing for placements, your AI mentor provides all the industry-grade tools you need.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              onClick={() => navigate(feature.route)}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.5, type: 'spring' }}
              className={`group relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 cursor-pointer transition-all duration-300 ${feature.colSpan} ${feature.bgClass}`}
            >
              <div className="absolute top-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <ArrowUpRight className="w-6 h-6 text-zinc-400 dark:text-zinc-500" />
              </div>
              
              <div className="h-full flex flex-col justify-end p-8 z-10 relative">
                <div className="mb-6 p-4 bg-white dark:bg-zinc-900 rounded-2xl w-fit shadow-sm border border-zinc-100 dark:border-zinc-800">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed max-w-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
