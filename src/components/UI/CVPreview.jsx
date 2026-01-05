import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload } from 'react-icons/fi';
import Magnetic from './Magnetic';
import { cvDataUrl } from '../../assets/cvData';

const cvImage = `${import.meta.env.BASE_URL}SandyCV.png`;
const cvFile = cvDataUrl;


export default function CVPreview({ isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-5xl h-[85vh] flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <div className="absolute -top-12 right-0 md:-right-12">
                            <Magnetic>
                                <button
                                    onClick={onClose}
                                    className="p-3 text-white/50 hover:text-white transition-colors rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm"
                                >
                                    <FiX size={24} />
                                </button>
                            </Magnetic>
                        </div>

                        <div className="w-full flex-1 min-h-0 bg-white/5 rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-8 relative flex flex-col p-4">
                            <div className="w-full h-full overflow-y-auto cv-scrollbar rounded-xl">
                                <img
                                    src={cvImage}
                                    alt="CV Preview"
                                    className="w-full h-auto shadow-lg block"
                                />
                            </div>
                        </div>

                        <Magnetic>
                            <a
                                href={cvFile}
                                download="Revaldy_Sandy_Aji_CV.pdf"
                                className="px-8 py-4 bg-white text-space-900 font-bold rounded-full text-lg hover:bg-brand-400 transition-colors shadow-lg shadow-brand-400/20 flex items-center gap-2 group"
                            >
                                <FiDownload className="group-hover:translate-y-1 transition-transform duration-300" />
                                <span>Download CV</span>
                            </a>
                        </Magnetic>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
