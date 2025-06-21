import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
      }}
      className="bg-gray-900 text-gray-300 py-16 px-6 md:px-24 mt-16 rounded-t-3xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Logo and Tagline */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-2">MentorAI</h2>
          <p className="text-gray-400">
            Your AI-powered mentor to master programming, DSA, cloud, and more.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
            <li><a href="#home" className="hover:text-white">Home</a></li>
          </ul>
        </div>

        {/* Courses */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Courses</h3>
          <ul className="space-y-2">
            <li>Data Structures</li>
            <li>Cloud Computing</li>
            <li>Fullstack Dev</li>
            <li>DBMS & SQL</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              <FaGithub size={22} className="hover:text-white" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
              <FaLinkedin size={22} className="hover:text-white" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <FaTwitter size={22} className="hover:text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-12 text-center text-sm text-gray-500 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()}. All rights reserved | Made by Developer | for Developer
      </div>
    </motion.footer>
  );
};

export default Footer;
