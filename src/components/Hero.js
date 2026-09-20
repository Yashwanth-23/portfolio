'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto pt-10 pb-24 md:pt-16 md:pb-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <p className="text-gray-400 tracking-widest uppercase text-sm font-medium">
            Based in United States
          </p>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]">
          I&apos;m Yashwanth Reddy Vasireddy. <br className="hidden md:block" />
          <span className="text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-700 mt-2 inline-block">
            AI, ML & Data Science.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">
          In theory, I architect complex AI systems and distributed data pipelines. In practice, I spend my days convincing massive, messy datasets to cooperate so businesses can actually use them. I love doing the heavy engineering that makes smart software look effortless.
        </p>

        {/* THE NEW RESUME BUTTON */}
        <motion.a
          href="https://drive.google.com/file/d/1liq96-1banlm9ryEnPRa_LPTU2TkeNg2/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-400 transition-colors duration-300"
        >
          View Resume
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
}
