import React from 'react';
import { motion } from 'framer-motion';
import { SiReact, SiTailwindcss, SiAndroid, SiKotlin, SiFlutter, SiPython, SiLaravel } from 'react-icons/si';

const techs = [
    { Icon: SiReact, color: "#61DAFB", name: "React" },
    { Icon: SiTailwindcss, color: "#38B2AC", name: "Tailwind" },
    { Icon: SiLaravel, color: "#FF2D20", name: "Laravel" },
    { Icon: SiAndroid, color: "#3DDC84", name: "Android" },
    { Icon: SiKotlin, color: "#7F52FF", name: "Kotlin" },
    { Icon: SiFlutter, color: "#02569B", name: "Flutter" },
    { Icon: SiPython, color: "#3776AB", name: "Python" },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const entranceVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: (i) => ({
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            damping: 18,
            stiffness: 100,
            delay: i * 0.15
        }
    })
};

const floatVariants = {
    animate: (i) => ({
        y: [0, -15, 0, 15, 0],
        transition: {
            repeat: Infinity,
            duration: 3.5,
            ease: "easeInOut",
            delay: -i * 0.5
        }
    })
};

export default function TechStack() {
    return (
        <section id="tech" className="min-h-[50vh] py-20 relative z-10 flex flex-col items-center justify-center overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">Tech Stack</h2>

            <motion.div
                className="flex flex-wrap justify-center gap-12 max-w-4xl px-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {techs.map((tech, i) => (
                    <motion.div
                        key={`wrapper-${i}`}
                        custom={i}
                        variants={entranceVariants}
                    >
                        <motion.div
                            custom={i}
                            variants={floatVariants}
                            animate="animate"
                        >
                            <motion.div
                                drag
                                dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
                                className="flex flex-col items-center gap-2 cursor-grab active:cursor-grabbing group"
                            >
                                <div className="text-5xl md:text-6xl text-white/50 transition-colors group-hover:text-white" style={{ filter: `drop-shadow(0 0 10px ${tech.color}40)` }}>
                                    <tech.Icon className="group-hover:text-[color:var(--icon-color)]" style={{ '--icon-color': tech.color }} />
                                </div>
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm font-mono text-brand-400">
                                    {tech.name}
                                </span>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
