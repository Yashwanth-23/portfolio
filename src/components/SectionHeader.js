'use client';

import { motion } from 'framer-motion';

export default function SectionHeader({ title, delay = 0.2 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className="flex items-center justify-between mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
        {title}
      </h2>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent ml-8 md:ml-12" />
    </motion.div>
  );
}
