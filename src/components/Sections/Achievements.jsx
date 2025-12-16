import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const achievements = [
    { id: 1, title: "2nd Place LKS Cloud Computing", detail: "Regional Level Competition" },
    { id: 2, title: "Finalist iCyption", detail: "Cyber Security Competition by Telkom" },
    { id: 3, title: "BNSP Junior Network Admin", detail: "Certified Professional" },
    { id: 4, title: "MTCNA Certified", detail: "MikroTik Certified Network Associate" },
];

export default function Achievements() {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <section className="min-h-[80vh] py-20 px-6 relative z-10 flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">Achievements</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl w-full place-items-center">
                {achievements.map((item) => (
                    <motion.div
                        key={item.id}
                        layoutId={`card-${item.id}`}
                        onClick={() => setSelectedId(item.id)}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-[2px] border border-white/10 flex items-center justify-center p-4 text-center cursor-pointer hover:shadow-cyan-glow transition-all relative overflow-hidden group shadow-lg"
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className="absolute inset-0 bg-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h4 className="font-bold text-sm md:text-base">{item.title}</h4>
                    </motion.div>
                ))}
            </div>

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
                )}
            </AnimatePresence>
        </section>
    );
}
