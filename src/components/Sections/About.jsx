import React from 'react';
import { motion } from 'framer-motion';
import BubbleText from '../UI/BubbleText';

export default function About() {
    return (
        <section id="about" className="py-20 px-6 relative z-10 flex flex-col items-center justify-center min-h-[40vh]">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center"
            >
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-white">About Me</h2>
                <div className="bg-white/[0.02] backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-3xl shadow-xl">
                    <BubbleText
                        as="p"
                        className="text-lg md:text-xl font-light leading-relaxed cursor-default text-justify hyphens-auto"
                        baseTextColor="text-gray-300"
                        text="Emerging Software Engineer specializing in Frontend Development and Cloud Computing, with a solid foundation in building efficient user interfaces from prior professional mobile development experience. Actively expanding expertise in Machine Learning, building upon a competitive history in Artificial Intelligence contests to integrate intelligent solutions into modern web applications. Passionate about combining clean code, responsive design, and cloud infrastructure to deliver high-performance software solutions."
                    />
                </div>
            </motion.div>
        </section>
    );
}
