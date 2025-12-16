import React from 'react';
import Magnetic from './Magnetic';

export default function Navbar() {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            // Use Lenis for smooth scroll if available globally, or native smooth scroll
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navItems = [
        { name: 'Home', id: 'hero' },
        { name: 'Experience', id: 'experience' },
        { name: 'Achievements', id: 'achievements' },
        { name: 'Tech', id: 'tech' },
        { name: 'Contact', id: 'contact' },
    ];

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <div className="px-6 py-3 rounded-full bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-[2px] border border-white/10 shadow-lg flex items-center gap-6">
                {navItems.map((item) => (
                    <Magnetic key={item.name}>
                        <button
                            onClick={() => scrollToSection(item.id)}
                            className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-400 transition-all group-hover:w-full" />
                        </button>
                    </Magnetic>
                ))}
            </div>
        </nav>
    );
}
