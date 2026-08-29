"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, Search } from "lucide-react";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroPreviewCard() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={stagger}
      className="w-full max-w-md rounded-3xl border border-ink/[0.06] bg-white/80 p-6 shadow-card sm:p-8"
    >
      <motion.div variants={item} className="flex items-center justify-between">
        <span className="eyebrow">Live match preview</span>
        <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-bridge-dark">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-bridge" />
          Active
        </span>
      </motion.div>

      <motion.div
        variants={item}
        className="mt-5 flex items-center gap-3 rounded-2xl border border-ink/[0.06] bg-paper px-4 py-3.5"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/[0.05] text-ink">
          <Search size={16} />
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-ink">A Level Physics · Online</p>
          <p className="text-[12px] text-slate-light">Request received</p>
        </div>
      </motion.div>

      <motion.div variants={item} className="ml-[34px] h-6 w-px bg-ink/10" />

      <motion.div
        variants={item}
        className="flex items-center gap-3 rounded-2xl border border-bridge/25 bg-bridge-light px-4 py-3.5"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bridge text-white">
          <CheckCircle2 size={16} />
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-ink">Tutor matched</p>
          <p className="text-[12px] text-bridge-dark">3 years experience · A Level Physics</p>
        </div>
      </motion.div>

      <motion.div variants={item} className="ml-[34px] h-6 w-px bg-ink/10" />

      <motion.div
        variants={item}
        className="flex items-center gap-3 rounded-2xl bg-ink px-4 py-3.5 text-paper"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper/10 text-paper">
          <MessageCircle size={16} />
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-medium">Connected on WhatsApp</p>
          <p className="text-[12px] text-paper/55">Ready to schedule the first session</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
