import React from 'react';
import Magnetic from '../UI/Magnetic';

export default function Contact() {
    return (
        <section className="min-h-[60vh] py-20 px-6 relative z-10 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-[2px] border border-white/10 p-12 rounded-3xl text-center shadow-2xl">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Ready to Collaborate?</h2>
                <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
                    Currently open for new opportunities in mobile and web development. Let's create something extraordinary.
                </p>

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
                </div>
            </div>

            <footer className="absolute bottom-4 text-white/20 text-sm font-mono">
                © {new Date().getFullYear()} Revaldy Sandy Aji. Antigravity Design.
            </footer>
        </section>
    );
}
