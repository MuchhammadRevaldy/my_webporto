import React from 'react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const navItems = [
        { name: 'Home', id: 'hero' },
        { name: 'Experience', id: 'experience' },
        { name: 'Achievements', id: 'achievements' },
        { name: 'Portfolio', id: 'portfolio' },
        { name: 'Tech', id: 'tech' },
        { name: 'Contact', id: 'contact' },
    ];

    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const sections = navItems.map(item => document.getElementById(item.id));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, {
            threshold: 0.3, // Trigger when 30% visible
            rootMargin: "-10% 0px -10% 0px" // Adjust viewport trigger zone
        });

        sections.forEach(section => {
            if (section) observer.observe(section);
        });

        return () => sections.forEach(section => {
            if (section) observer.unobserve(section);
        });
    }, []);

    const scrollToSection = (id) => {
        setActiveSection(id); // Instant visual update
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10, duration: 0.8 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
        >
            <div className="px-6 py-3 rounded-full bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-[2px] border border-white/10 shadow-lg flex items-center gap-6">
                {navItems.map((item) => (
                    <Magnetic key={item.name}>
                        <button
                            onClick={() => scrollToSection(item.id)}
                            className={`text-sm font-medium transition-colors relative group duration-300 ${activeSection === item.id ? 'text-brand-300' : 'text-gray-400 hover:text-white'}`}
                        >
                            {item.name}

                            {/* Animated Underline for Active State */}
                            {activeSection === item.id && (
                                <motion.span
                                    layoutId="navbar-underline"
                                    layout
                                    className="absolute -bottom-1 left-0 w-full h-[1px] bg-brand-400 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30
                                    }}
                                />
                            )}

                            {/* Hover underline (optional, subtle opacity) */}
                            {activeSection !== item.id && (
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white/50 transition-all group-hover:w-full" />
                            )}
                        </button>
                    </Magnetic>
                ))}
            </div>
        </motion.nav>
    );
}
