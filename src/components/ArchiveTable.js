'use client';

import { motion } from 'framer-motion';

// Placeholders for your massive GitHub output. You can easily add to this list later.
const archiveProjects = [
    {
        year: '2026',
        title: 'Omnisense Local AI Multimodal Agent',
        stack: 'Python • Streamlit • Docker',
        links: [
            { label: 'Github', url: 'https://github.com/Yashwanth-23/Omnisense' }
        ]
    },
    {
        year: '2024',
        title: 'Intelligent Q&A LangChain Agent',
        stack: 'LangChain • Hugging Face • ChromaDB',
        links: [
            { label: 'Document', url: 'https://docs.google.com/document/d/1zsbtwMGZjyNAwE2DSD3nL15E49b0T1n7TWpKC27zphc/edit?usp=sharing' }
        ]
    },
    {
        year: '2024',
        title: 'Distributed Sales Analytics Pipeline',
        stack: 'Python • Apache Cassandra • CQL',
        links: [
            { label: 'Github', url: 'https://github.com/Yashwanth-23/bigdata_cassandra' }
        ]
    },
    {
        year: '2021',
        title: 'Pneumonia Detection CNN',
        stack: 'Python • TensorFlow • Deep Learning',
        links: [
            { label: 'Github', url: 'https://github.com/Yashwanth-23/pneumonia-detection-using-cnn' }
        ]
    },
    {
        year: '2024',
        title: 'Advanced Data Mining',
        stack: 'Python • Scikit-Learn • Pandas',
        links: [
            { label: 'Data Mining 1', url: 'https://github.com/Yashwanth-23/DataMining_Prog.Assignment-1' },
            { label: 'Data Mining 2', url: 'https://github.com/Yashwanth-23/DM_prog2' },
            { label: 'Data Mining 3', url: 'https://github.com/Yashwanth-23/DM_prog3' },
            { label: 'Data Mining 4', url: 'https://github.com/Yashwanth-23/dm_prog4' }
        ]
    }
];

export default function ArchiveTable() {
    return (
        <section className="mt-32 max-w-4xl mx-auto px-8 md:px-0">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-10"
            >
                <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-white">
                    Full Project Archive.
                </h3>
            </motion.div>

            <div className="flex flex-col border-t border-white/10">
                {archiveProjects.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-white/10 hover:bg-white/[0.02] transition-colors px-4 -mx-4 rounded-lg"
                    >
                        {/* Year and Title */}
                        <div className="flex items-center gap-6 md:gap-12 mb-4 md:mb-0">
                            <span className="text-gray-500 font-mono text-sm">{item.year}</span>
                            <span className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors">
                                {item.title}
                            </span>
                        </div>

                        {/* Tech Stack and Multiple Links */}
                        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                            <span className="text-sm text-gray-500 font-mono tracking-wider hidden md:block">
                                {item.stack}
                            </span>

                            {/* THE NEW MULTI-LINK SECTION */}
                            <div className="flex items-center gap-4">
                                {item.links?.map((link, i) => (
                                    <a
                                        key={i}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                ))}
                            </div>

                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}