import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const people = [
  'https://i.pravatar.cc/100?img=1',
  'https://i.pravatar.cc/100?img=3',
  'https://i.pravatar.cc/100?img=5',
  'https://i.pravatar.cc/100?img=7',
  'https://i.pravatar.cc/100?img=9',
  'https://i.pravatar.cc/100?img=10',
];

const Testimonial = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const floatVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, type: 'spring', stiffness: 50 },
    }),
  };
const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3 },
  },
};

  return (
    <section
      ref={ref}
      className="relative bg-gray-200 py-20 px-6 rounded-3xl shadow-lg overflow-hidden mx-4 md:mx-24"
    >
      {/* Floating Images */}
      <div className="absolute inset-0 z-0 flex flex-wrap justify-center gap-10 opacity-80 pointer-events-none">
        {people.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt="User"
            custom={index}
            initial="hidden"
            animate={controls}
            variants={floatVariants}
            className={`w-25 h-25 md:w-30 md:h-30 mt-18 object-cover rounded-xl shadow-md transform 
              ${index % 2 === 0 ? 'translate-y-4' : '-translate-y-4'}
              ${index % 3 === 0 ? 'rotate-2' : '-rotate-2'}`}
          />
        ))}
      </div>

      {/* Text Content */}
<motion.div
  className="relative z-10 text-center max-w-3xl mx-auto"
  initial="hidden"
  animate={controls}
  variants={textVariants}
>

        <span className="inline-block mt-40 mb-5 text-sm font-medium bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
          Testimonials
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Trusted by leaders <br />
          <span className="text-gray-500 font-medium">from various industries</span>
        </h2>
        <p className="text-gray-600 mb-6">
          Learn why professionals trust our solutions to complete their customer journeys.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition"
        >
          Read Success Stories →
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Testimonial;
