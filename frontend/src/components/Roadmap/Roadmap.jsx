import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import {
  cloud,
  cn,
  dbms,
  dev,
  lld,
  java,
  mern,
  dsa,
  sd,
  ml
} from '../../assets/assets';

const roadmaps = [
  { title: "Data Structures and Algorithms", img: dsa },
  { title: "DBMS", img: dbms },
  { title: "MERN Stack", img: ml },
  { title: "Java Full Stack", img: java },
  { title: "System Design", img: sd },
  { title: "Cloud Computing", img: cloud },
  { title: "Computer Networks", img: cn },
  { title: "Low Level Design", img: lld },
  { title: "Machine Learning ", img: mern },
  { title: "DevOps", img: dev },
];

const Roadmap = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section className="min-h-screen bg-zinc-50 dark:bg-[#09090b] pt-32 pb-20 px-6 md:px-12 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            Interactive <span className="text-indigo-600">Roadmaps</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-lg font-medium">
            Visual skill trees designed to take you from beginner to industry-ready engineer.
          </p>
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {roadmaps.map((roadmap, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="group bg-white dark:bg-zinc-950 p-5 rounded-[2rem] border border-zinc-200 dark:border-white/10 shadow-sm hover:shadow-2xl hover:border-indigo-500/30 transition-all cursor-pointer overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">{roadmap.title}</h3>
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <ArrowUpRight size={14} className="text-indigo-600" />
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-zinc-100 dark:bg-black/20">
              <img
                src={roadmap.img}
                alt={roadmap.title}
                onClick={() => {
                  setSelectedImage(roadmap.img);
                  setSelectedTitle(roadmap.title);
                }}
                className="w-full h-auto object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>

      {/* Modal Overlay */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative p-4 max-w-[90%] max-h-[90%]"
          >
            <h3 className="text-lg text-center mb-4 font-semibold">{selectedTitle}</h3>
            <img
              src={selectedImage}
              alt="Full View"
              className="max-w-full max-h-[80vh] rounded-lg border shadow-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded hover:bg-red-600 hover:text-white transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Roadmap;
