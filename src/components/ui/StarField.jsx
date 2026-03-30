import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useLenis } from '../../hooks/useLenis.jsx';

/**
 * StarField — High Performance Three.js Particle System (r180)
 * Matches structure:
 *   .hero-video-wrapper > div > .main-particles-component-section > .main-particles-container > canvas
 */
const StarField = () => {
    const canvasRef = useRef(null);
    const lenis = useLenis();

    useEffect(() => {
        if (!canvasRef.current) return;

        // --- Init Scene ---
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        // --- Particle System ---
        const particleCount = 15000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const randoms = new Float32Array(particleCount);

        const colorPool = [
            new THREE.Color('#ffffff'),
            new THREE.Color('#e0e7ff'),
            new THREE.Color('#f5f3ff'),
            new THREE.Color('#ffffff'),
        ];

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3]     = (Math.random() - 0.5) * 60;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

            const color = colorPool[Math.floor(Math.random() * colorPool.length)];
            colors[i * 3]     = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            sizes[i]   = Math.random() * 2 + 0.5;
            randoms[i] = Math.random();
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color',    new THREE.BufferAttribute(colors,    3));
        geometry.setAttribute('size',     new THREE.BufferAttribute(sizes,     1));
        geometry.setAttribute('random',   new THREE.BufferAttribute(randoms,   1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime:       { value: 0 },
                uPixelRatio: { value: renderer.getPixelRatio() }
            },
            vertexShader: `
                uniform float uTime;
                uniform float uPixelRatio;
                attribute float size;
                attribute float random;
                attribute vec3 color;
                varying vec3 vColor;
                varying float vAlpha;

                void main() {
                    vColor = color;
                    vec3 pos = position;

                    float twinkle = sin(uTime * 2.0 + random * 6.28) * 0.5 + 0.5;
                    vAlpha = 0.3 + twinkle * 0.7;

                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_PointSize = size * uPixelRatio * (50.0 / -mvPosition.z);
                    gl_Position  = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vAlpha;
                void main() {
                    float dist     = distance(gl_PointCoord, vec2(0.5));
                    if (dist > 0.5) discard;
                    float strength = 1.0 - dist * 2.0;
                    gl_FragColor   = vec4(vColor, vAlpha * strength);
                }
            `,
            transparent: true,
            depthWrite:  false,
            blending:    THREE.AdditiveBlending
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
        };
        window.addEventListener('resize', handleResize);

        let frame;
        const animate = (time) => {
            const progress = lenis?.progress || 0;
            const targetZ  = THREE.MathUtils.lerp(15, 3, progress);
            camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);

            material.uniforms.uTime.value = time * 0.001;
            renderer.render(scene, camera);
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', handleResize);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [lenis]);

    return (
        <div className="hero-video-wrapper" style={{ opacity: 1 }}>
            <div style={{ opacity: 1 }}>
                <div className="main-particles-component-section">
                    <div className="main-particles-container">
                        <canvas
                            ref={canvasRef}
                            data-engine="three.js r180"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StarField;
