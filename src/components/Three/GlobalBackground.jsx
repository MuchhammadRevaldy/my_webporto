import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

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

    const gradient = context.createRadialGradient(center, center, 0, center, center, radius);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

function getGradientTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');

    const gradient = context.createLinearGradient(0, 0, 32, 0);
    gradient.addColorStop(0, 'rgba(255,255,255,0)');
    gradient.addColorStop(1, 'rgba(255,255,255,1)');

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


            const boundX = viewport.width / 2 + 10;
            const boundY = viewport.height / 2 + 10;

            if (ref.current.position.x > boundX || ref.current.position.x < -boundX ||
                ref.current.position.y > boundY || ref.current.position.y < -boundY) {
                setActive(false);
            }
        } else if (!active) {
            if (Math.random() < 0.005) {
                setActive(true);

                const spawnType = Math.floor(Math.random() * 6);

                let startX, startY, vx, vy, angle;

                const offset = 2;
                const targetX = (Math.random() - 0.5) * (viewport.width * 0.5);
                const targetY = (Math.random() - 0.5) * (viewport.height * 0.5);

                if (spawnType === 0) {
                    startX = -viewport.width / 2 - offset;
                    startY = viewport.height / 2 + offset;
                } else if (spawnType === 1) {
                    startX = viewport.width / 2 + offset;
                    startY = viewport.height / 2 + offset;
                } else if (spawnType === 2) {
                    startX = -viewport.width / 2 - offset;
                    startY = -viewport.height / 2 - offset;
                } else if (spawnType === 3) {
                    startX = viewport.width / 2 + offset;
                    startY = -viewport.height / 2 - offset;
                } else if (spawnType === 4) {
                    startX = -viewport.width / 2 - offset;
                    startY = (Math.random() - 0.5) * viewport.height;
                } else {
                    startX = viewport.width / 2 + offset;
                    startY = (Math.random() - 0.5) * viewport.height;
                }

                const dx = targetX - startX;
                const dy = targetY - startY;
                const len = Math.sqrt(dx * dx + dy * dy);
                const speed = 0.4 + Math.random() * 0.2;

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
    const { viewport } = useThree();

    const circleTexture = useMemo(() => getCircleTexture(), []);

    const [positions, initialPositions, velocities] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const initial = new Float32Array(count * 3);
        const vels = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * viewport.width * 4;
            const y = (Math.random() - 0.5) * viewport.height * 4;
            const z = (Math.random() - 0.5) * 30;

            const i3 = i * 3;
            pos[i3] = x;
            pos[i3 + 1] = y;
            pos[i3 + 2] = z;

            initial[i3] = x;
            initial[i3 + 1] = y;
            initial[i3 + 2] = z;

            vels[i3] = 0;
            vels[i3 + 1] = 0;
            vels[i3 + 2] = 0;
        }
        return [pos, initial, vels];
    }, [viewport, count]);

    const colors = useMemo(() => {
        const col = new Float32Array(count * 3);
        const color = new THREE.Color();

        for (let i = 0; i < count; i++) {
            if (Math.random() > 0.8) {
                color.set('#ffffff');
            } else {
                color.set('#64ffda');
            }
            col[i * 3] = color.r;
            col[i * 3 + 1] = color.g;
            col[i * 3 + 2] = color.b;
        }
        return col;
    }, [count]);

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
        const time = state.clock.getElapsedTime();

        const currentPositions = mesh.current.geometry.attributes.position.array;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            const px = currentPositions[i3];
            const py = currentPositions[i3 + 1];
            const pz = currentPositions[i3 + 2];

            const ox = initialPositions[i3];
            const oy = initialPositions[i3 + 1];

            // 1. Natural Drift
            const zFactor = 1 + (pz / 30);
            const driftX = Math.sin(time * 0.5 + ox * 0.5) * 0.5 * zFactor;
            const driftY = Math.cos(time * 0.3 + oy * 0.5) * 0.5 * zFactor;

            const targetX = ox + driftX;
            const targetY = oy + driftY;

            const springStrength = 0.05;
            const returnForceX = (targetX - px) * springStrength;
            const returnForceY = (targetY - py) * springStrength;

            velocities[i3] += returnForceX;
            velocities[i3 + 1] += returnForceY;

            const dx = mx - px;
            const dy = my - py;
            const distSq = dx * dx + dy * dy;

            const radius = 5.0;
            const radiusSq = radius * radius;

            if (distSq < radiusSq) {
                const dist = Math.sqrt(distSq);
                const force = 5.0;
                const angle = Math.atan2(dy, dx);
                const repulseForce = (1 - dist / radius) * force;

                velocities[i3] -= Math.cos(angle) * repulseForce * 0.05;
                velocities[i3 + 1] -= Math.sin(angle) * repulseForce * 0.05;
            }

            const friction = 0.80;
            velocities[i3] *= friction;
            velocities[i3 + 1] *= friction;

            currentPositions[i3] += velocities[i3];
            currentPositions[i3 + 1] += velocities[i3 + 1];
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

export function WarpStars({ isWarping }) {
    const { viewport } = useThree();
    const count = 1500;
    const mesh = useRef();

    const texture = useMemo(() => getCircleTexture(), []);


    const [positions, initialZ] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const zArr = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * viewport.width * 4;
            pos[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 4;
            const z = (Math.random() - 0.5) * 100 - 50;
            pos[i * 3 + 2] = z;
            zArr[i] = z;
        }
        return [pos, zArr];
    }, [viewport]);

    useFrame((state, delta) => {
        const targetSpeed = isWarping ? 50.0 : 2.0;

        const acceleration = isWarping ? 0.05 : 0.1;

        if (!mesh.current.userData.speed) mesh.current.userData.speed = 2.0;

        mesh.current.userData.speed = THREE.MathUtils.lerp(
            mesh.current.userData.speed,
            targetSpeed,
            acceleration
        );

        const currentSpeed = mesh.current.userData.speed;
        const positions = mesh.current.geometry.attributes.position.array;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            positions[i3 + 2] += currentSpeed * delta;

            if (positions[i3 + 2] > 10) {
                positions[i3 + 2] = -100;
                positions[i3] = (Math.random() - 0.5) * viewport.width * 4;
                positions[i3 + 1] = (Math.random() - 0.5) * viewport.height * 4;
            }
        }

        mesh.current.geometry.attributes.position.needsUpdate = true;

        if (isWarping) {
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                map={texture}
                color="white"
                transparent
                opacity={0.8}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function GlobalBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-space-900">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{
                    antialias: false,
                    powerPreference: "high-performance",
                    preserveDrawingBuffer: false,
                    failIfMajorPerformanceCaveat: true
                }}
                dpr={[1, 1.5]} // Limit pixel ratio for performance
                onCreated={({ gl }) => {
                    gl.domElement.addEventListener('webglcontextlost', (event) => {
                        event.preventDefault();
                        console.warn('WebGL Context Lost: Attempting to restore...');
                    }, false);
                    gl.domElement.addEventListener('webglcontextrestored', () => {
                        console.log('WebGL Context Restored');
                    }, false);
                }}
            >
                <Particles />
            </Canvas>
        </div>
    );
}
