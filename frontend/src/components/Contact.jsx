import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";
import { toast } from "react-toastify";
const Contact = () => {
  return (
    <section className="min-h-screen bg-[#fdfbfb] py-5 mt-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-zinc-800"
        >
          Let’s <span className="text-indigo-600">Connect</span> 🌐
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-500 text-lg mb-14"
        >
          Feel free to drop a message or hire me — I'm open for collaboration & internships!
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-gray-700 text-lg"
          >
            <div className="flex items-center gap-3">
              <Mail className="text-indigo-600" /> the.sandeep.sen@gmail.com
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-indigo-600" /> India
            </div>
            <div className="flex items-center gap-3">
              <Github className="text-indigo-600" />
              <a href="https://github.com/sandeep-senn" target="_blank" className="hover:underline">
                github.com/sandeep-senn
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Linkedin className="text-indigo-600" />
              <a
                href="https://linkedin.com/in/sandeep-sen-762a4b256"
                target="_blank"
                className="hover:underline"
              >
                linkedin.com/in/sandeep-sen
              </a>
            </div>
          </motion.div>

          {/* Modern Form */}
          <motion.form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Thanks for your message, Sandeep will respond soon! 😊");
              e.target.reset();
            }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6"
          >
            <div className="relative">
              <input
                type="text"
                required
                className="peer w-full p-2 pt-4 text-gray-800 bg-transparent border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <label className="absolute left-4 top-3 text-gray-500 text-sm peer-focus:text-xs peer-focus:-top-2 peer-focus:text-indigo-500 transition-all bg-white px-1">
                Name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                required
                className="peer w-full p-2 pt-4 text-gray-800 bg-transparent border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <label className="absolute left-4 top-3 text-gray-500 text-sm peer-focus:text-xs peer-focus:-top-2 peer-focus:text-indigo-500 transition-all bg-white px-1">
                Email
              </label>
            </div>

            <div className="relative">
              <textarea
                rows="5"
                required
                className="peer w-full p-2 pt-4 text-gray-800 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <label className="absolute left-4 top-3 text-gray-500 text-sm peer-focus:text-xs peer-focus:-top-2 peer-focus:text-indigo-500 transition-all bg-white px-1">
                Your Message
              </label>
            </div>

            <button
              type="submit"
              onClick =()=>{
                toast.success("Details successfully sent to the admin"
              }
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
            Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
