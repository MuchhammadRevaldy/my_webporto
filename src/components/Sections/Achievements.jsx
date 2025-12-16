import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const achievements = [
    { id: 1, title: "2nd Place LKS Cloud Computing", detail: "Regional Level Competition - Apr 2022" },
    { id: 2, title: "Finalist iCyption", detail: "National Cloud Computing Competition by Telkom - Apr 2022" },
    { id: 3, title: "2nd Place Programming", detail: "Dies Natalis 17th Mercu Buana Univ - Dec 2025" },
    { id: 4, title: "BNSP Junior Network Admin", detail: "National Professional Certification" },
    { id: 5, title: "MTCNA Certified", detail: "MikroTik Certified Network Associate - 2024" },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const entranceVariants = {
    hidden: {
        x: 300, // Start off-screen right
        opacity: 0,
    },
    visible: (i) => ({
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            damping: 18,
            stiffness: 100, // Smooth slide "surfing" in
            delay: i * 0.15 // Staggered entrance
        }
    })
};

const floatVariants = {
    animate: (i) => ({
        y: [0, -20, 0, 20, 0], // Complete sine wave cycle [0 -> -20 -> 0 -> 20 -> 0]
        transition: {
            repeat: Infinity,
            duration: 4, // Slow, hypnotic 4s loop
            ease: "easeInOut",
            // KEY: Negative delay makes them start at different points in the wave cycle
            delay: -i * 0.5
        }
    })
};

export default function Achievements() {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <section id="achievements" className="min-h-[80vh] py-20 px-6 relative z-10 flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">Achievements</h2>

            <motion.div
                className="flex flex-wrap justify-center gap-8 md:gap-16 max-w-6xl w-full"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {achievements.map((item, index) => {
                    return (
                        <motion.div
                            key={`entrance-${item.id}`}
                            custom={index}
                            variants={entranceVariants}
                            className="relative"
                        >
                            <motion.div
                                key={`float-${item.id}`}
                                custom={index}
                                variants={floatVariants}
                                animate="animate"
                            >
                                <motion.div
                                    key={item.id}
                                    layoutId={`card-${item.id}`}
                                    onClick={() => setSelectedId(item.id)}
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-[2px] border border-white/10 flex items-center justify-center p-4 text-center cursor-pointer hover:shadow-cyan-glow relative overflow-hidden group shadow-lg"
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <div className="absolute inset-0 bg-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <h4 className="font-bold text-sm md:text-base">{item.title}</h4>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </motion.div>

            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div
                            layoutId={`card-${selectedId}`}
                            className="w-full max-w-lg bg-gradient-to-br from-white/[0.02] to-black/20 backdrop-blur-[2px] border border-white/10 p-8 rounded-3xl relative shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >
                            {/* Hide content immediately on close to prevent "squashed" look */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            >
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                                >
                                    ✕
                                </button>
                                {(() => {
                                    const item = achievements.find(a => a.id === selectedId);
                                    return (
                                        <>
                                            <h3 className="text-2xl font-bold mb-2 text-brand-400">{item.title}</h3>
                                            <p className="text-gray-300">{item.detail}</p>
                                        </>
                                    );
                                })()}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
