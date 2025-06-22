import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HelpSection() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();

  // On load
  useEffect(() => {
    const savedChat = localStorage.getItem("chatHistory");
    if (savedChat) setMessages(JSON.parse(savedChat));
  }, []);

  // On update
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const suggestions = [
    "Convert this code to Python",
    "Fix this bug in my JS code",
    "Give me a DSA roadmap",
  ];

  const handleSend = async () => {
  if (!input.trim()) return;

  const userMsg = { role: "user", text: input };
  setMessages((prev) => [...prev, userMsg]);
  setInput("");
  setIsTyping(true);

  try {
    const res = await fetch("https://ai-powered-mentor-platform.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const reply = data.reply;
    const lower = reply.toLowerCase();

    // ✅ Auto-redirect based on reply
    if (lower.includes("go to roadmap")) {
      navigate("/roadmap");
    } else if (lower.includes("go to convert")) {
      navigate("/code-convertor");
    } else if (lower.includes("go to debug")) {
      navigate("/code-debug");
    }

    const formattedReply = reply.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    const botMsg = { role: "bot", text: formattedReply };
    setMessages((prev) => [...prev, botMsg]);
  } catch (err) {
    const botMsg = { role: "bot", text: "❌ Error getting response." };
    setMessages((prev) => [...prev, botMsg]);
  } finally {
    setIsTyping(false);
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white font-sans px-4 py-10">
      {/* Liquid AI Sphere */}

      {/* Title */}
      <motion.h1
        className="text-3xl font-semibold mb-2 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome to Mentor AI Help 🤖
      </motion.h1>
      <motion.p
        className="text-center text-gray-400 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Ask anything — code conversion, debugging, or roadmap suggestions!
      </motion.p>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {suggestions.map((sug, idx) => (
          <button
            key={idx}
            className="bg-white text-black px-4 py-1 rounded-full hover:bg-gray-200 text-sm"
            onClick={() => handleSend(sug)}
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Chat Box */}
      <div className="w-full max-w-xl bg-yellow-300 rounded-lg p-4 h-[400px] overflow-y-auto space-y-3 border border-[#2c2c2c] shadow-lg">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: msg.role === "user" ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            className={`w-fit max-w-[80%] break-words px-5 py-3 rounded-2xl shadow-md transition-all duration-300 ${
              msg.role === "user"
                ? "bg-gray-900 text-white ml-auto self-end rounded-tr-none"
                : "bg-white text-black backdrop-blur-sm border border-white/10 mr-auto self-start rounded-tl-none"
            }`}
          >
            <div dangerouslySetInnerHTML={{ __html: msg.text }} />
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-700 text-white px-4 py-2 rounded-full w-fit max-w-[80%] self-start mr-auto animate-pulse"
          >
            Bot is typing...
          </motion.div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="mt-4 flex w-full max-w-xl gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your query..."
          className="flex-grow px-4 py-2 rounded-full bg-[#1f1f1f] text-white border border-[#333] focus:outline-none"
        />
        <button
          onClick={() => {
            localStorage.removeItem("chatHistory");
            setMessages([]);
          }}
          className="text-xs text-gray-400 underline mt-3"
        >
          Clear Chat History
        </button>
      </form>
    </div>
  );
}
