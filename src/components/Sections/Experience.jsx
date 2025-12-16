import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
    {
        id: 1,
        role: "Junior Mobile Developer Intern",
        company: "CV. Karya Hidup Sentosa (Quick Tractor)",
        desc: "Developed internal software to support product management. Built user-friendly mobile apps for field data input, reducing manual errors. Collaborated with backend developers for real-time API integration.",
        period: "June 2023 - June 2024"
    },
    {
        id: 2,
        role: "Chairperson",
        company: "IT Study Community",
        desc: "Led a community of 50+ students, organized workshops and hackathons.",
        period: "2022 - 2023"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12
        }
    }
};

const Card = ({ item, index }) => {
    return (
        <motion.div variants={cardVariants}>
            <motion.div
                drag
                dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                animate={{
                    y: [0, -10, 0],
                    rotate: [0, 1, -1, 0]
                }}
                transition={{
                    duration: 5 + index,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="p-6 md:p-8 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-[2px] border border-white/10 rounded-2xl cursor-grab active:cursor-grabbing hover:border-brand-500/50 transition-colors w-full max-w-md mx-auto shadow-2xl"
            >
                <h3 className="text-2xl font-bold text-white mb-1">{item.role}</h3>
                <p className="text-brand-400 font-mono text-sm mb-4">{item.company} | {item.period}</p>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
            </motion.div>
        </motion.div>
    );
};

export default function Experience() {
    return (
        <section id="experience" className="min-h-screen py-20 px-6 relative z-10 flex flex-col items-center justify-center">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-display font-bold mb-16 text-center"
            >
                Experience
            </motion.h2>
            <motion.div
                className="flex flex-col md:flex-row gap-8 w-full max-w-5xl justify-center items-center"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {experiences.map((exp, i) => (
                    <Card key={exp.id} item={exp} index={i} />
                ))}
            </motion.div>
        </section>
    );
}
