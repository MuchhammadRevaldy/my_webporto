import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiAlertTriangle, FiX, FiCheck } from 'react-icons/fi';
import Magnetic from '../UI/Magnetic';
import BubbleText from '../UI/BubbleText';

export default function Contact() {
    const [showGithubModal, setShowGithubModal] = useState(false);

    return (
        <section id="contact" className="min-h-[60vh] py-20 px-6 relative z-10 flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full max-w-3xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-[2px] border border-white/10 p-12 rounded-3xl text-center shadow-2xl relative overflow-hidden"
            >
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Ready to Collaborate?</h2>
                <BubbleText
                    as="p"
                    className="text-gray-400 text-lg mb-10 max-w-md mx-auto cursor-default"
                    baseTextColor="text-gray-400"
                    text="Currently open for new opportunities in mobile and web development. Let's create something extraordinary."
                />

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <Magnetic>
                        <a
                            href="mailto:revaldyaji@gmail.com"
                            className="px-8 py-4 bg-white text-space-900 font-bold rounded-full text-lg hover:bg-brand-400 transition-colors inline-block"
                        >
                            revaldyaji@gmail.com
                        </a>
                    </Magnetic>

                    <Magnetic>
                        <button className="px-8 py-4 border border-white/20 text-white font-bold rounded-full text-lg hover:bg-white/10 transition-colors backdrop-blur-sm">
                            Download CV
                        </button>
                    </Magnetic>

                    <Magnetic>
                        <button
                            onClick={() => setShowGithubModal(true)}
                            className="p-4 border border-white/20 text-white font-bold rounded-full text-lg hover:bg-white/10 hover:text-brand-300 transition-colors backdrop-blur-sm flex items-center gap-2"
                        >
                            <FiGithub size={24} />
                            <span className="md:hidden">GitHub</span>
                        </button>
                    </Magnetic>
                </div>
            </motion.div>

            <footer className="absolute bottom-4 text-white/20 text-sm font-mono text-center w-full">
                © {new Date().getFullYear()} Revaldy Sandy Aji. Antigravity Design.
            </footer>

            {/* GitHub Disclaimer Modal */}
            <AnimatePresence>
                {showGithubModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                        onClick={() => setShowGithubModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-space-800 border border-white/10 p-8 rounded-2xl max-w-md w-full shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowGithubModal(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            >
                                <FiX size={24} />
                            </button>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 text-yellow-500">
                                    <FiAlertTriangle size={32} />
                                </div>

                                <h3 className="text-2xl font-bold mb-4">Just a heads up!</h3>

                                <p className="text-gray-300 mb-8 leading-relaxed">
                                    This is my <span className="text-white font-bold">second account</span>.
                                    Unfortunately, my first account was flagged by GitHub.
                                    I am currently rebuilding my presence here.
                                </p>

                                <div className="flex gap-4 w-full">
                                    <button
                                        onClick={() => setShowGithubModal(false)}
                                        className="flex-1 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-semibold"
                                    >
                                        Cancel
                                    </button>
                                    <a
                                        href="https://github.com/MuchhammadRevaldy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setShowGithubModal(false)}
                                        className="flex-1 px-6 py-3 rounded-xl bg-white text-space-900 hover:bg-brand-400 transition-colors font-semibold flex items-center justify-center gap-2"
                                    >
                                        <span>Continue</span>
                                        <FiCheck size={18} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
