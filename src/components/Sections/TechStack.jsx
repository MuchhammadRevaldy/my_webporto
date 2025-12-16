import React from 'react';
import { motion } from 'framer-motion';
import { SiReact, SiTailwindcss, SiFramer, SiAndroid, SiKotlin, SiFlutter, SiFirebase, SiPython } from 'react-icons/si';

const techs = [
    { Icon: SiReact, color: "#61DAFB", name: "React" },
    { Icon: SiTailwindcss, color: "#38B2AC", name: "Tailwind" },
    { Icon: SiFramer, color: "#0055FF", name: "Framer" },
    { Icon: SiAndroid, color: "#3DDC84", name: "Android" },
    { Icon: SiKotlin, color: "#7F52FF", name: "Kotlin" },
    { Icon: SiFlutter, color: "#02569B", name: "Flutter" },
    { Icon: SiFirebase, color: "#FFCA28", name: "Firebase" },
    { Icon: SiPython, color: "#3776AB", name: "Python" },
];

export default function TechStack() {
    return (
        <section className="min-h-[50vh] py-20 relative z-10 flex flex-col items-center justify-center overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">Tech Stack</h2>

            <div className="flex flex-wrap justify-center gap-12 max-w-4xl px-4">
                {techs.map((tech, i) => (
                    <motion.div
                        key={i}
                        drag
                        dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
                        animate={{
                            y: [0, -15, 0],
                            x: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                        className="flex flex-col items-center gap-2 cursor-grab active:cursor-grabbing group"
                    >
                        <div className="text-5xl md:text-6xl text-white/50 transition-colors group-hover:text-white" style={{ filter: `drop-shadow(0 0 10px ${tech.color}40)` }}>
                            <tech.Icon className="group-hover:text-[color:var(--icon-color)]" style={{ '--icon-color': tech.color }} />
                        </div>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm font-mono text-brand-400">
                            {tech.name}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
