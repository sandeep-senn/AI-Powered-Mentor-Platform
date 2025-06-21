import React, { useState } from "react";
import axios from "axios";
import {motion} from 'framer-motion'
import '../components/Styles/animateBg.css'

const languages = ["Python", "JavaScript", "Java", "C++", "C#", "TypeScript"];

function CodeConverter() {
  const [sourceCode, setSourceCode] = useState("");
  const [convertedCode, setConvertedCode] = useState("");
  const [fromLang, setFromLang] = useState("Python");
  const [toLang, setToLang] = useState("JavaScript");
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!sourceCode.trim()) return;

    setLoading(true);
    setConvertedCode("");

    try {
      const res = await axios.post("http://localhost:5000/convert-code", {
        sourceCode,
        fromLang,
        toLang,
      });
      setConvertedCode(res.data.convertedCode);
    } catch (err) {
      setConvertedCode("// ❌ Error converting code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="animated-bg min-h-screen px-6 py-10 text-gray-800"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-5xl font-bold mb-8 text-center text-gray-900 tracking-tight"
        >
          AI Code Converter
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-4 rounded-xl shadow-lg border border-gray-200"
          >
            <label className="block font-semibold text-lg mb-2">Source Code</label>
            <textarea
              className="w-full h-72 p-4 font-mono border border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-blue-400 resize-none bg-gray-50"
              placeholder="Write your code here..."
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-zinc-900 p-4 rounded-xl shadow-xl"
          >
            <label className="block font-semibold text-lg text-white mb-2">Converted Code</label>
            <pre className="w-full h-72 p-4 font-mono text-green-300 rounded-xl overflow-auto text-sm bg-transparent">
              {loading ? "// ⏳ Converting..." : convertedCode || "// Output will appear here"}
            </pre>
          </motion.div>
        </div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 my-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div>
            <label className="block text-sm mb-1 font-medium">From:</label>
            <select
              className="p-2 rounded-md border border-gray-300 shadow-sm"
              value={fromLang}
              onChange={(e) => setFromLang(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">To:</label>
            <select
              className="p-2 rounded-md border border-gray-300 shadow-sm"
              value={toLang}
              onChange={(e) => setToLang(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "#1d4ed8",
              boxShadow: "0px 5px 20px rgba(37, 99, 235, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConvert}
            disabled={loading}
            className="bg-blue-600 text-white px-7 py-3 rounded-full font-semibold mt-6 transition-all shadow-md"
          >
            {loading ? "Converting..." : "✨ Convert Code"}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CodeConverter;
