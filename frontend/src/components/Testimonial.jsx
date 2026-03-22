import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight, ChevronLeft, X, Quote } from 'lucide-react';

const testimonialsData = [
  { 
    id: 1, 
    name: "Sarah Jenkins", 
    role: "Frontend Engineer at Google", 
    text: "MentorAI completely changed how I prepare for my interviews. The AI logic building and DSA challenges are spot-on.", 
    avatar: "https://i.pravatar.cc/150?img=1" 
  },
  { 
    id: 2, 
    name: "Michael Chen", 
    role: "Fullstack Developer at Stripe", 
    text: "The code converter and live debugging features saved me hundreds of hours. It feels like having a senior engineer next to me.", 
    avatar: "https://i.pravatar.cc/150?img=11" 
  },
  { 
    id: 3, 
    name: "Priya Sharma", 
    role: "Software Engineer at Amazon", 
    text: "The personalized roadmaps gave me exact steps to learn Cloud Computing. Can't recommend this enough for beginners!", 
    avatar: "https://i.pravatar.cc/150?img=5" 
  },
  { 
    id: 4, 
    name: "David Kim", 
    role: "Tech Lead at Netflix", 
    text: "An incredible platform. The curated questions matched exactly what I needed to brush up on System Design.", 
    avatar: "https://i.pravatar.cc/150?img=8" 
  },
];

const sliderVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 400 : -400,
    opacity: 0,
    scale: 0.8,
    rotateY: direction > 0 ? 45 : -45,
    z: -100
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    z: 0
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 400 : -400,
    opacity: 0,
    scale: 0.8,
    rotateY: direction < 0 ? 45 : -45,
    z: -100
  }),
};

const Testimonial = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [{ currentIndex, direction }, setPage] = useState({ currentIndex: 0, direction: 0 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const paginate = (newDirection) => {
    let nextIndex = currentIndex + newDirection;
    if (nextIndex >= testimonialsData.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = testimonialsData.length - 1;
    setPage({ currentIndex: nextIndex, direction: newDirection });
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
  };

  return (
    <section ref={ref} className="py-16 px-6 md:px-12 bg-white dark:bg-zinc-950 transition-colors duration-300 min-h-[500px] flex items-center justify-center">
      <div className="relative w-full max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-900/50 py-24 px-6 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden perspective-[1200px]">
        
        <AnimatePresence mode="wait">
          {!isSliderOpen ? (
            <motion.div
              key="intro"
              className="relative z-10 text-center max-w-3xl mx-auto"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
              variants={textVariants}
            >
              <span className="inline-flex mb-6 text-xs sm:text-sm font-bold tracking-wider uppercase bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 shadow-sm mx-auto">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 tracking-tight">
                Trusted by leaders <br />
                <span className="text-zinc-500 dark:text-zinc-400 font-semibold">from top tech companies</span>
              </h2>
              <p className="text-base text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Discover how thousands of developers rely on our AI Mentor to accelerate their learning and streamline their coding workflow 24/7.
              </p>
              <motion.button
                onClick={() => setIsSliderOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all border border-transparent dark:border-zinc-200"
              >
                Read Success Stories <span className="ml-2 font-normal">→</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="slider"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-20 w-full h-[450px] flex flex-col items-center justify-center transform-style-3d"
            >
              <button 
                onClick={() => setIsSliderOpen(false)}
                className="absolute top-0 right-4 md:right-10 z-50 p-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
              >
                <X size={20} />
              </button>

              <div className="relative w-full max-w-3xl h-[350px] flex items-center justify-center perspective-[1200px]">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={sliderVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 350, damping: 35 },
                      opacity: { duration: 0.3 },
                      rotateY: { type: "spring", stiffness: 350, damping: 35 },
                      z: { type: "spring", stiffness: 350, damping: 35 }
                    }}
                    className="absolute w-full px-4 md:px-0"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 md:p-12 shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center">
                       <Quote className="w-12 h-12 text-indigo-500/20 dark:text-indigo-400/20 mb-6" />
                       <p className="text-lg md:text-xl text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed mb-8">
                         "{testimonialsData[currentIndex].text}"
                       </p>
                       <img 
                         src={testimonialsData[currentIndex].avatar} 
                         alt={testimonialsData[currentIndex].name}
                         className="w-16 h-16 rounded-full border-2 border-indigo-100 dark:border-zinc-700 shadow-md mb-4"
                       />
                       <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
                         {testimonialsData[currentIndex].name}
                       </h4>
                       <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                         {testimonialsData[currentIndex].role}
                       </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-6 mt-28 z-50">
                <button 
                  onClick={() => paginate(-1)}
                  className="p-4 rounded-full bg-white dark:bg-zinc-800 shadow-md hover:shadow-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 transition hover:-translate-x-1"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="flex gap-2">
                  {testimonialsData.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex 
                          ? 'w-8 bg-indigo-600 dark:bg-indigo-400' 
                          : 'w-2 bg-zinc-300 dark:bg-zinc-700'
                      }`}
                    />
                  ))}
                </div>
                <button 
                  onClick={() => paginate(1)}
                  className="p-4 rounded-full bg-white dark:bg-zinc-800 shadow-md hover:shadow-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 transition hover:translate-x-1"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Testimonial;
