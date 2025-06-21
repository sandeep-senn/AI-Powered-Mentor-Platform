import React from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-br from-indigo-600 to-blue-500 text-white py-30 mt-0 rounded-b-4xl px-6 md:px-12 text-center">
      <Navbar />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.3
            }
          }
        }}
        className="text-center"
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, y: -30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6 }}
          className="text-lg text-gray-300 mb-10"
        >
          Struggling with code ? Let AI help you in debug, <br />learn and convert code with
        </motion.p>

        <motion.h1
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 }
          }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-4xl font-bold leading-tight mb-10"
        >
          AI Powered{' '}
          <motion.span
            className="text-green-300 text-7xl block"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 }
            }}
            transition={{ duration: 1 }}
          >
            Mentor Platform
          </motion.span>
          for Coding & Tech Growth
        </motion.h1>

        <motion.div
          className="sm:flex-row sm:items-center gap-4"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            onClick={() => navigate('/learn')}
            className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-100 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Learning
          </motion.button>
        </motion.div>

        <motion.p
          className="text-sm text-white/70 mt-6"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6 }}
        >
          Trusted by 10K+ students | Powered by OpenAI | Built for Developers
        </motion.p>
      </motion.div>
    </section>
  );};

export default Hero;
