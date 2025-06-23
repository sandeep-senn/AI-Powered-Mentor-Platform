import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, BrainCircuit, BookOpenText, Database, Cloud, Puzzle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    title: 'AI Code Debugging',
    description: 'Get instant AI-generated solutions and explanations for your code.',
    icon: <Code size={28} className="text-indigo-600" />,
    route: '/code-debug',
  },
  {
    title: 'Code Converter',
    description: 'Convert code between languages using AI',
    icon: <Database size={28} className="text-blue-600" />,
    route: '/code-convertor',
  },
  {
    title: 'Data Structures & Algorithms',
    description: 'Visual DSA tutorials and hundreds of problem-solving challenges.',
    icon: <BrainCircuit size={28} className="text-pink-600" />,
    route: '/learn',
  },
  {
    title: 'Learning Roadmaps',
    description: 'Helps in guiding you through the learning process.',
    icon: <Puzzle size={28} className="text-green-600" />,
    route: '/roadmap',
  },
  {
    title: 'Chatbot',
    description: 'A chatbot that helps you to access our facility',
    icon: <BookOpenText size={28} className="text-yellow-500" />,
    route: '/help',
  },
  {
    title: 'Cloud Computing',
    description: 'Hands-on AWS basics to deployment and architecture skills.',
    icon: <Cloud size={28} className="text-teal-600" />,
    route: '/learn',
  },
];

const Feature = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="features" ref={ref} className="bg-gray-50 py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
        >
          Everything You Need to <span className="text-indigo-600">Level Up</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-600 mb-12"
        >
          Whether you're a beginner or preparing for placements, your AI mentor has got you covered.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              onClick={() => navigate(feature.route)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              className="bg-white rounded-2xl shadow-md p-6 text-left cursor-pointer"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
