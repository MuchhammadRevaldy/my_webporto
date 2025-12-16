import React, { useState, useEffect } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';
import { FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const projects = [
    {
        id: 5,
        title: "WorkLab Insight",
        desc: "A comprehensive economic analytics platform designed to visualize critical labor market data. Features interactive dashboards for tracking unemployment rates, labor issues, and regional economic growth.",
        tags: ["Tailwind CSS", "Recharts", "Data Vis"],
        link: "https://worklabinsight.vercel.app/index.html"
    },
    {
        id: 6,
        title: "NutriGuard",
        desc: "Integrated health platform featuring AI-powered food scanning (NutriScan) utilizing an image detection model, family profile management, and smart recipe generation. Uses Groq API for rapid analysis and Larave/Python backend.",
        tags: ["React.js", "Laravel", "Python", "Groq API"],
        link: "https://lte-lyzer.atmadja.id/"
    },
    {
        id: 1,
        title: "QC Machine Production App",
        desc: "A production-quality control app used by operators to perform, log, and monitor machine quality checks. Features photo attachments, timestamped entries, and digital signature capture for audit-friendly records.",
        tags: ["Kotlin", "Camera API", "MVVM"]
    },
    {
        id: 2,
        title: "Painting Process Tracker",
        desc: "Mobile solution to digitize and monitor the complex painting process of production parts. Allows task assignment, real-time progress tracking, and comprehensive reporting to analyze process quality.",
        tags: ["Kotlin", "API Integration", "Real-time DB", "Analytics"]
    },
    {
        id: 3,
        title: "Online Food Ordering App",
        desc: "Food ordering platform allowing users to browse menus, customize dishes, and place orders with integrated payment gateways. Features real-time order tracking and estimated delivery times.",
        tags: ["Flutter", "Payment Gateway", "Geolocation", "State Management"]
    },
    {
        id: 4,
        title: "Image Classification Model",
        desc: "Developed a high-accuracy Convolutional Neural Network (CNN) for image classification as part of the LKS Artificial Intelligence 2023 competition. Optimized for real-time inference and deployed for practical use cases.",
        tags: ["Python", "TensorFlow", "CNN", "Computer Vision"]
    }
];

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full group relative p-6 md:p-8 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-[2px] border border-white/10 rounded-3xl overflow-hidden hover:border-brand-500/30 transition-all duration-300 flex flex-col shadow-xl"
        >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-brand-300 transition-colors line-clamp-2">
                        {project.title}
                    </h3>
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-brand-400 transition-colors p-2 hover:bg-white/5 rounded-full"
                        >
                            <FiExternalLink size={24} />
                        </a>
                    )}
                </div>

                <p className="text-gray-400 leading-relaxed mb-6 flex-grow overflow-y-auto pr-2 scrollbar-none text-sm md:text-base">
                    {project.desc}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-white/5 border border-white/10 text-brand-200 group-hover:bg-brand-500/20 group-hover:border-brand-500/30 transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default function Portfolio() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);

    // Update items per view based on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setItemsPerView(3);
            } else {
                setItemsPerView(1);
            }
        };

        handleResize(); // Initial call
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const slideNext = () => {
        setCurrentIndex((prev) => {
            // If we are at the end (showing the last possible full view), loop to 0
            // The max index we can slide to is: Total Items - Items Per View
            // But user wants to loop.
            // Let's loop when we reach the very end.
            const maxIndex = projects.length - itemsPerView;
            if (prev >= maxIndex) return 0;
            return prev + 1;
        });
    };

    const slidePrev = () => {
        setCurrentIndex((prev) => {
            const maxIndex = projects.length - itemsPerView;
            if (prev <= 0) return maxIndex;
            return prev - 1;
        });
    };

    return (
        <section id="portfolio" className="min-h-screen py-20 pt-32 relative z-10 flex flex-col items-center justify-center overflow-hidden">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-display font-bold mb-12 text-center"
            >
                Selected Works
            </motion.h2>

            <div className="relative w-full max-w-7xl mx-auto px-4 md:px-12">

                {/* Navigation Buttons: Side of the Carousel */}
                <div className="absolute top-1/2 -translate-y-1/2 left-1 md:-left-8 z-30 pointer-events-auto">
                    <button
                        onClick={slidePrev}
                        className="bg-white/5 hover:bg-white/10 backdrop-blur-md p-3 md:p-4 rounded-full text-white transition-all border border-white/10 hover:border-brand-500/50 shadow-lg active:scale-95"
                    >
                        <FiChevronLeft size={24} className="md:w-8 md:h-8" />
                    </button>
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 right-1 md:-right-8 z-30 pointer-events-auto">
                    <button
                        onClick={slideNext}
                        className="bg-white/5 hover:bg-white/10 backdrop-blur-md p-3 md:p-4 rounded-full text-white transition-all border border-white/10 hover:border-brand-500/50 shadow-lg active:scale-95"
                    >
                        <FiChevronRight size={24} className="md:w-8 md:h-8" />
                    </button>
                </div>

                {/* Carousel Window */}
                <div className="overflow-hidden w-full">
                    <motion.div
                        className="flex"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = offset.x; // negative = left, positive = right
                            const swipeThreshold = 50;

                            if (swipe < -swipeThreshold || velocity.x < -500) {
                                slideNext();
                            } else if (swipe > swipeThreshold || velocity.x > 500) {
                                slidePrev();
                            }
                        }}
                        animate={{
                            x: `-${currentIndex * (100 / itemsPerView)}%`
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                    >
                        {projects.map((project, index) => (
                            <div
                                key={project.id}
                                className={`flex-shrink-0 p-8 md:p-4 box-border`}
                                style={{
                                    width: `${100 / itemsPerView}%`
                                }}
                            >
                                <div className="h-[500px]">
                                    <ProjectCard project={project} index={index} />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
