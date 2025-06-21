import React, { useState, useEffect } from 'react';
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
  { title: "MERN Stack", img: mern },
  { title: "Java Full Stack", img: java },
  { title: "System Design", img: sd },
  { title: "Cloud Computing", img: cloud },
  { title: "Computer Networks", img: cn },
  { title: "Low Level Design", img: lld },
  { title: "Machine Learning ", img: ml },
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
    <section className="py-12 px-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-4xl font-bold mb-8 text-center">📍 Roadmap Section</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {roadmaps.map((roadmap, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-all"
          >
            <h3 className="text-xl font-semibold mb-4 text-center">{roadmap.title}</h3>
            <img
              src={roadmap.img}
              alt={roadmap.title}
              onClick={() => {
                setSelectedImage(roadmap.img);
                setSelectedTitle(roadmap.title);
              }}
              className="w-full h-auto rounded-md border border-gray-700 cursor-pointer"
            />
          </div>
        ))}
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
