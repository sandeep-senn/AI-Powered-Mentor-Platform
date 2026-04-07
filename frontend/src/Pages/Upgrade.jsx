import React from "react";
import { Sparkles, Check, Rocket, ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Upgrade() {
  const { planName } = useAuth();

  const handleUpgrade = (plan) => {
    toast.info(
      `${plan.charAt(0).toUpperCase() + plan.slice(1)} payment is not integrated yet. We will be back soon with this feature.`
    );
  };

  const tiers = [
    {
      id: "free",
      name: "Standard",
      price: "$0",
      period: "/forever",
      limit: "3 AI Requests / day",
      features: ["Code Translation", "Bug Analysis", "Core Skill Roadmaps"],
      buttonText: "Current Plan",
      isCurrent: planName === "free",
      color: "zinc",
    },
    {
      id: "silver",
      name: "Silver Pro",
      price: "$4.99",
      period: "/month",
      limit: "10 AI Requests / day",
      features: ["Faster AI Responses", "Priority Support", "Silver Badge", "Advanced Skill Roadmaps"],
      buttonText: "Upgrade to Silver",
      isCurrent: planName === "silver",
      color: "indigo",
    },
    {
      id: "gold",
      name: "Gold Pro",
      price: "$9.99",
      period: "/month",
      limit: "50 AI Requests / day",
      features: ["Maximum AI Limits", "Exclusive Gold Badge", "Beta Access Features", "Direct Mentor Chat"],
      buttonText: "Get Gold Access",
      isCurrent: planName === "gold",
      color: "amber",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 bg-[#020202] text-white flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Platform</span>
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-500">
            Choose Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              Learning Velocity
            </span>
          </h1>
          <p className="text-zinc-500 text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
            Select the plan that fits your coding intensity. Upgrade or downgrade anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full lg:px-12">
          {tiers.map((tier) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: tier.id === "silver" ? 0.1 : tier.id === "gold" ? 0.2 : 0 }}
              className={`relative flex flex-col p-8 rounded-[2.5rem] border transition-all duration-300 ${
                tier.isCurrent
                  ? "bg-white/5 border-white/10 ring-2 ring-indigo-500/50"
                  : "bg-zinc-900/30 border-white/5 hover:border-white/10"
              } ${tier.id === "gold" ? "md:scale-105 z-10" : ""}`}
            >
              {tier.id === "gold" && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-400 to-orange-600 rounded-full text-[10px] font-black uppercase tracking-widest text-black shadow-xl">
                  Best Value
                </div>
              )}

              <div className="mb-8">
                <h3
                  className={`text-lg font-bold mb-1 flex items-center gap-2 ${
                    tier.id === "silver" ? "text-indigo-400" : tier.id === "gold" ? "text-amber-400" : "text-zinc-400"
                  }`}
                >
                  {tier.name}
                  {tier.id === "gold" && <Sparkles size={16} className="animate-pulse" />}
                  {tier.id === "silver" && <Zap size={16} />}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{tier.period}</span>
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-10">
                <div
                  className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-3 ${
                    tier.id === "gold"
                      ? "bg-amber-500/10 text-amber-500"
                      : tier.id === "silver"
                        ? "bg-indigo-500/10 text-indigo-500"
                        : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  <ShieldCheck size={16} />
                  {tier.limit}
                </div>
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-zinc-400 text-sm pl-2">
                    <Check size={14} className={tier.id === "free" ? "text-zinc-700" : "text-emerald-500"} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => tier.id !== "free" && handleUpgrade(tier.id)}
                disabled={tier.isCurrent || tier.id === "free"}
                className={`w-full py-4 rounded-2xl font-bold text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                  tier.isCurrent || tier.id === "free"
                    ? "bg-zinc-800/50 text-zinc-500 cursor-default"
                    : tier.id === "gold"
                      ? "bg-gradient-to-r from-amber-400 to-orange-600 hover:from-amber-300 hover:to-orange-500 text-black shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-white text-black hover:bg-zinc-200 shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {tier.isCurrent ? (
                  "Currently Active"
                ) : tier.id === "free" ? (
                  "Default Plan"
                ) : (
                  <>
                    {tier.buttonText} <Rocket size={16} />
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
