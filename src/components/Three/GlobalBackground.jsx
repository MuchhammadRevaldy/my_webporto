import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Generate a procedural circle texture for soft glow
function getCircleTexture() {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    const center = size / 2;
    const radius = size / 2;

    context.beginPath();
    context.arc(center, center, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();

    // Add a soft blur for glow effect
    // We can simulate this with a gradient
    const gradient = context.createRadialGradient(center, center, 0, center, center, radius);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

// Generate a linear gradient texture for meteor tail
function getGradientTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');

    const gradient = context.createLinearGradient(0, 0, 32, 0);
    gradient.addColorStop(0, 'rgba(255,255,255,0)'); // Tail end (transparent)
    gradient.addColorStop(1, 'rgba(255,255,255,1)'); // Head (solid)

    context.fillStyle = gradient;
    context.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

function ShootingStar() {
    const { viewport } = useThree();
    const ref = useRef();
    const [active, setActive] = React.useState(false);
    const texture = useMemo(() => getGradientTexture(), []);

    useFrame(() => {
        if (active && ref.current) {
            ref.current.position.x += ref.current.userData.vx;
            ref.current.position.y += ref.current.userData.vy;

            // Check if out of bounds (far enough to be gone)
            const boundX = viewport.width / 2 + 10;
            const boundY = viewport.height / 2 + 10;

            if (ref.current.position.x > boundX || ref.current.position.x < -boundX ||
                ref.current.position.y > boundY || ref.current.position.y < -boundY) {
                setActive(false);
            }
        } else if (!active) {
            // Random chance to spawn
            if (Math.random() < 0.005) {
                setActive(true);

                // Spawn from Corners OR Sides Logic
                // 0: Top-Left, 1: Top-Right, 2: Bottom-Left, 3: Bottom-Right
                // 4: Left Side, 5: Right Side
                const spawnType = Math.floor(Math.random() * 6);

                let startX, startY, vx, vy, angle;

                const offset = 2; // spawn just outside

                // Aim towards center-ish with some randomness
                const targetX = (Math.random() - 0.5) * (viewport.width * 0.5);
                const targetY = (Math.random() - 0.5) * (viewport.height * 0.5);

                if (spawnType === 0) { // Top-Left
                    startX = -viewport.width / 2 - offset;
                    startY = viewport.height / 2 + offset;
                } else if (spawnType === 1) { // Top-Right
                    startX = viewport.width / 2 + offset;
                    startY = viewport.height / 2 + offset;
                } else if (spawnType === 2) { // Bottom-Left
                    startX = -viewport.width / 2 - offset;
                    startY = -viewport.height / 2 - offset;
                } else if (spawnType === 3) { // Bottom-Right
                    startX = viewport.width / 2 + offset;
                    startY = -viewport.height / 2 - offset;
                } else if (spawnType === 4) { // Left Side (Random Y)
                    startX = -viewport.width / 2 - offset;
                    startY = (Math.random() - 0.5) * viewport.height;
                } else { // Right Side (Random Y)
                    startX = viewport.width / 2 + offset;
                    startY = (Math.random() - 0.5) * viewport.height;
                }

                const dx = targetX - startX;
                const dy = targetY - startY;
                const len = Math.sqrt(dx * dx + dy * dy);
                const speed = 0.4 + Math.random() * 0.2; // Speed

                vx = (dx / len) * speed;
                vy = (dy / len) * speed;
                angle = Math.atan2(dy, dx);

                ref.current.position.set(startX, startY, -5 - Math.random() * 10);
                ref.current.rotation.z = angle;
                ref.current.userData = { vx, vy };
            }
        }
    });

    return (
        <mesh ref={ref} visible={active}>
            <planeGeometry args={[4, 0.1]} />
            <meshBasicMaterial
                map={texture}
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </mesh>
    );
}

function Meteors() {
    return (
        <group>
            <ShootingStar />
            <ShootingStar />
            <ShootingStar />
        </group>
    );
}


function Particles({ count = 1500 }) {
    const mesh = useRef();
    const { viewport, mouse } = useThree();

    const circleTexture = useMemo(() => getCircleTexture(), []);

    // Generate initial positions
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            // Deep Starfield: Spread wide and deep
            const x = (Math.random() - 0.5) * viewport.width * 4;
            const y = (Math.random() - 0.5) * viewport.height * 4;
            // Z depth from -30 (far) to 0 (near camera plane)
            const z = (Math.random() - 0.5) * 30;

            temp.push({
                x, y, z,
                ox: x, oy: y, oz: z,
                vx: 0, vy: 0, vz: 0
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
            pos[i * 3] = particles[i].x;
            pos[i * 3 + 1] = particles[i].y;
            pos[i * 3 + 2] = particles[i].z; // Use deep Z

            // Brighter/Dimmer stars based on mixing
            if (Math.random() > 0.8) {
                color.set('#ffffff');
            } else {
                color.set('#64ffda');
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
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state) => {
        const mx = (mouseRef.current.x * viewport.width) / 2;
        const my = (mouseRef.current.y * viewport.height) / 2;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const p = particles[i];

            // 1. Ambient Drift (Oscillation around home)
            const time = state.clock.getElapsedTime();
            const zFactor = 1 + (p.z / 30);

            const driftX = Math.sin(time * 0.5 + p.ox * 0.5) * 0.5 * zFactor;
            const driftY = Math.cos(time * 0.3 + p.oy * 0.5) * 0.5 * zFactor;

            const targetX = p.ox + driftX;
            const targetY = p.oy + driftY;

            // 2. Spring Force (Pull back to target)
            // SMOOTHER: Lower stiffness (0.05) to reduce "snap", creating a gentler return
            const springStrength = 0.05;

            const returnForceX = (targetX - p.x) * springStrength;
            const returnForceY = (targetY - p.y) * springStrength;

            p.vx += returnForceX;
            p.vy += returnForceY;

            // 3. Mouse Interaction (Repulsion Force Field)
            const dx = mx - p.x;
            const dy = my - p.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            const radius = 5.0;
            const force = 5.0;

            if (dist < radius) {
                const angle = Math.atan2(dy, dx);
                const repulseForce = (1 - dist / radius) * force;
                p.vx -= Math.cos(angle) * repulseForce * 0.05;
                p.vy -= Math.sin(angle) * repulseForce * 0.05;
            }

            // 4. Physics Update
            // HEAVIER DAMPING: 0.80 kills oscillation/bounce faster
            const friction = 0.80;
            p.vx *= friction;
            p.vy *= friction;

            p.x += p.vx;
            p.y += p.vy;

            positions[i3] = p.x;
            positions[i3 + 1] = p.y;
        }

        mesh.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <>
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
                    size={0.15}
                    map={circleTexture}
                    vertexColors
                    transparent
                    opacity={0.8}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
            <Meteors />
        </>
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
