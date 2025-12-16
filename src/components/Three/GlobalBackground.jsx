import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 4000 }) {
    const mesh = useRef();
    const { viewport, mouse } = useThree();

    const dummy = useMemo(() => new THREE.Vector3(), []);

    // Generate initial positions
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * viewport.width * 1.5; // Spread wider than viewport
            const y = (Math.random() - 0.5) * viewport.height * 1.5;
            const z = (Math.random() - 0.5) * 2; // Slight depth variation
            temp.push({
                x, y, z,
                ox: x, oy: y, oz: z, // Original positions
                vx: 0, vy: 0, vz: 0 // Velocity
            });
        }
        return temp;
    }, [viewport]);

    // Create geometry buffers
    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const color = new THREE.Color();

        for (let i = 0; i < count; i++) {
            // Init positions
            pos[i * 3] = particles[i].x;
            pos[i * 3 + 1] = particles[i].y;
            pos[i * 3 + 2] = particles[i].z;

            // Init colors (Cyan/White mix)
            if (Math.random() > 0.8) {
                color.set('#ffffff');
            } else {
                color.set('#64ffda'); // Brand color
            }
            col[i * 3] = color.r;
            col[i * 3 + 1] = color.g;
            col[i * 3 + 2] = color.b;
        }

        return [pos, col];
    }, [particles, count]);

    // Track mouse manually because overlaying HTML elements block Canvas events
    const mouseRef = useRef({ x: 0, y: 0 });

    React.useEffect(() => {
        const handleMouseMove = (event) => {
            // Normalize mouse coordinates (-1 to +1)
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state) => {
        // Current mouse position in world space
        // Mouse is normalized (-1 to 1), map to viewport
        const mx = (mouseRef.current.x * viewport.width) / 2;
        const my = (mouseRef.current.y * viewport.height) / 2;

        const time = state.clock.getElapsedTime();

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const p = particles[i];

            // 1. Ambient Flying Motion (Constant Drift)
            const driftSpeed = 0.002; // Restored Slower drift 
            const driftX = (Math.sin(p.ox * 100) * driftSpeed);
            const driftY = (Math.cos(p.oy * 100) * driftSpeed);

            p.x += driftX;
            p.y += driftY;

            // 2. Screen Wrapping (Infinite Fly)
            const bondX = viewport.width * 0.75;
            const bondY = viewport.height * 0.75;

            if (p.x > bondX) p.x = -bondX;
            if (p.x < -bondX) p.x = bondX;
            if (p.y > bondY) p.y = -bondY;
            if (p.y < -bondY) p.y = bondY;

            // 3. Mouse Interaction (Repulsion)
            const dx = mx - p.x;
            const dy = my - p.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            const radius = 2.5;
            const force = 8.0;  // Restored Strong Force

            if (dist < radius) {
                const angle = Math.atan2(dy, dx);
                const tx = mx - Math.cos(angle) * radius;
                const ty = my - Math.sin(angle) * radius;

                p.vx += (tx - p.x) * force * 0.15; // Restored Fast Multiplier
                p.vy += (ty - p.y) * force * 0.15;
            }

            // 4. Physics Update
            // Restored Friction
            p.vx *= 0.80;
            p.vy *= 0.80;

            p.x += p.vx * 0.01;
            p.y += p.vy * 0.01;

            // Update buffer
            positions[i3] = p.x;
            positions[i3 + 1] = p.y;
        }

        mesh.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colors.length / 3}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </points>
    );
}

export default function GlobalBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-space-900">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: false, powerPreference: "high-performance" }}>
                <Particles />
            </Canvas>
        </div>
    );
}
