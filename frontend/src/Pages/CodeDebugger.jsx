import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../components/Styles/animateBg.css";

export default function CodeDebugger() {
  const [code, setCode] = useState("");
  const [debugResult, setDebugResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDebug = async () => {
    setLoading(true);
    setDebugResult("");
    try {
      const res = await axios.post("http://localhost:5000/debug-code", {
        code,
      });
      const rawReply = res.data.result;
      const formattedResult = rawReply
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
        .replace(/\n/g, "<br/>"); // Line breaks
      setDebugResult(formattedResult);

      setDebugResult(formattedResult);
    } catch (err) {
      setDebugResult("❌ Debugging failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <motion.div
      className="animated-bg min-h-screen px-6 py-10 text-gray-800"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-4xl font-bold text-center mb-10 text-white drop-shadow-lg"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        🛠️ AI Code Debugger
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Input Code */}
        <motion.div
          className="flex flex-col"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <label className="text-lg font-semibold mb-2">Paste Your Code</label>
          <textarea
            className="w-full h-72 p-4 font-mono rounded-xl border border-gray-300 shadow-md resize-none focus:ring-2 focus:ring-green-400"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste buggy code here..."
          />

          <motion.button
            onClick={handleDebug}
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow-md transition-all w-fit"
          >
            {loading ? "Debugging..." : "Debug Code"}
          </motion.button>
        </motion.div>

        {/* Output */}
        <motion.div
          className="flex flex-col"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <label className="text-lg font-semibold mb-2">Debug Output</label>
          <div
            className="w-full h-72 p-4 font-mono bg-zinc-900 text-green-300 rounded-xl overflow-auto shadow-inner text-sm"
            dangerouslySetInnerHTML={{
              __html: loading
                ? "Debugging in progress..."
                : debugResult || "Output will appear here",
            }}
          ></div>
        </motion.div>
      </div>
    </motion.div>
  );
}
