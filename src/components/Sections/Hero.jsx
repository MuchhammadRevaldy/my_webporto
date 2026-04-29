import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import Magnetic from '../UI/Magnetic';
import BubbleText from '../UI/BubbleText';

import gltfPath from '../../assets/cloner_cube_simple_copy.gltf';

function HeroObject() {
    const meshRef = useRef();
    const { scene } = useGLTF(gltfPath);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = Math.sin(time / 4);
        meshRef.current.rotation.y = Math.sin(time / 2);
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <primitive
                object={scene}
                ref={meshRef}
                scale={2}
            />
        </Float>
    );
}

export default function Hero() {
    return (
        <section id="hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            <div className="z-10 flex flex-col items-center text-center p-4">
                <Magnetic>
                    <motion.h1
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-display font-bold mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-400 cursor-default"
                    >
                        Revaldy Sandy Aji
                    </motion.h1>
                </Magnetic>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <BubbleText text="Junior Frontend Developer & ML Enthusiast" />
                </motion.div>
            </div>

            <div className="absolute inset-0 z-0 opacity-30">
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Suspense fallback={null}>
                        <HeroObject />
                    </Suspense>
                </Canvas>
            </div>
        </section >
    );
}
