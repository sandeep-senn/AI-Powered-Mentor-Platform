import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Send, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { supabase } from "../lib/supabase";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const contactInfo = [
    { icon: Mail, label: "Email", value: "the.sandeep.sen@gmail.com", href: "mailto:the.sandeep.sen@gmail.com" },
    { icon: Github, label: "Github", value: "github.com/sandeep-senn", href: "https://github.com/sandeep-senn" },
    { icon: Linkedin, label: "Linkedin", value: "linkedin.com/in/sandeep-sen", href: "https://linkedin.com/in/sandeep-sen-762a4b256" },
    { icon: MapPin, label: "Location", value: "India", href: null },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            message: formData.message 
          }
        ]);

      if (error) throw error;

      toast.success("Message sent! I'll get back to you soon. 😊");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error submitting contact form:", err);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="min-h-screen bg-zinc-50 dark:bg-[#09090b] py-24 px-6 md:px-12 transition-colors duration-500 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-3 bg-indigo-600/10 text-indigo-600 rounded-2xl"
          >
            <MessageSquare size={24} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white"
          >
            Let’s <span className="text-indigo-600">Connect</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-zinc-500 dark:text-zinc-400 max-w-lg font-medium"
          >
            Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and collaborations.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((info, i) => (
              <motion.a
                key={info.label}
                href={info.href}
                target={info.href ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-4 p-6 rounded-3xl border transition-all duration-300 group ${
                  info.href 
                    ? "bg-white dark:bg-white/[0.02] border-zinc-200 dark:border-white/10 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5" 
                    : "bg-zinc-100/50 dark:bg-white/[0.01] border-transparent"
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-indigo-600 transition-colors">
                  <info.icon size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5">{info.label}</p>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-200 text-sm md:text-base truncate max-w-[200px] md:max-w-none">
                    {info.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-purple-600" />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-zinc-100 dark:bg-white/[0.03] border border-transparent focus:border-indigo-500 rounded-2xl px-6 py-4 outline-none transition-all text-sm font-medium dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-zinc-100 dark:bg-white/[0.03] border border-transparent focus:border-indigo-500 rounded-2xl px-6 py-4 outline-none transition-all text-sm font-medium dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Your Message</label>
                <textarea
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="How can I help you?"
                  className="w-full bg-zinc-100 dark:bg-white/[0.03] border border-transparent focus:border-indigo-500 rounded-2xl px-6 py-4 outline-none transition-all text-sm font-medium resize-none dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={18} />}
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
