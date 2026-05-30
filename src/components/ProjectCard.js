'use client';

import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import Image from 'next/image';

export default function ProjectCard({ project, index }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        // OUTER WRAPPER: This is your clickable link
        <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="
        group relative h-72 flex flex-col justify-end cursor-pointer
        bg-neutral-900/50 
        rounded-2xl 
        border border-white/5
        transition-colors duration-300 ease-in-out
        overflow-hidden 
      "
        >
            {/* INNER SPOTLIGHT: Changed back to motion.div so the browser doesn't crash */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-30"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.18),
              transparent 80%
            )
          `,
                }}
            />

            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover mix-blend-overlay opacity-0 group-hover:opacity-40 transition-opacity duration-700 group-hover:duration-300 ease-out"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />

            <div className="z-20 relative p-8">
                <p className="text-sm font-medium text-gray-400 mb-2 tracking-widest uppercase">
                    {project.stack}
                </p>
                <h2 className="text-3xl font-semibold mb-3 text-white">
                    {project.title}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                    {project.description}
                </p>
            </div>

        </motion.a>
    );
}