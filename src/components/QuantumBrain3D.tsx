import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Zap, Activity, Cpu } from 'lucide-react';

export const QuantumBrain3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [synapseCount, setSynapseCount] = useState(14800);
  const [quantumSpeed, setQuantumSpeed] = useState('0.14s');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create 3D Brain shape with mathematical point clusters
    const brainGroup = new THREE.Group();
    const count = 350;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const goldColor = new THREE.Color('#F59E0B');
    const amberColor = new THREE.Color('#FBBF24');
    const cyanColor = new THREE.Color('#00E5FF');

    // Brain dual-hemisphere point generation
    for (let i = 0; i < count; i++) {
      const isLeft = i % 2 === 0;
      const u = Math.random() * Math.PI;
      const v = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 1.2;

      // Hemisphere offset
      const x = (radius * Math.sin(u) * Math.cos(v)) + (isLeft ? -0.8 : 0.8);
      const y = radius * Math.sin(u) * Math.sin(v) * 0.8;
      const z = radius * Math.cos(u) * 0.9;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const col = Math.random() > 0.3 ? (Math.random() > 0.5 ? goldColor : amberColor) : cyanColor;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    const brainPoints = new THREE.Points(geometry, pMaterial);
    brainGroup.add(brainPoints);

    // Wireframe Neural Connections (Lines between nearby nodes)
    const linePositions: number[] = [];
    const lineColors: number[] = [];

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 2.2) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );

          lineColors.push(
            0.96, 0.62, 0.04,
            0.98, 0.75, 0.14
          );
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
    });

    const brainLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    brainGroup.add(brainLines);

    // Outer Orbit Ring
    const ringGeo = new THREE.TorusGeometry(7.5, 0.06, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xF59E0B,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.5;
    brainGroup.add(ring);

    scene.add(brainGroup);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      brainGroup.rotation.y = elapsedTime * 0.25;
      brainGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15;
      ring.rotation.z = elapsedTime * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      pMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] rounded-xl glass-quantum-panel p-4 overflow-hidden border border-amber-400/30 flex flex-col justify-between">
      {/* HUD Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#0A1628] border border-amber-400/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>QUANTUM NEURAL ENGINE v4.2</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-amber-300/80 font-mono">
          <Activity className="w-3.5 h-3.5 text-amber-400" />
          <span>3D REALTIME MESH</span>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="absolute inset-0 z-0" />

      {/* Bottom HUD Stats */}
      <div className="relative z-10 grid grid-cols-2 gap-2 pt-2 border-t border-amber-400/20 text-xs font-mono">
        <div className="bg-[#0A1628]/80 p-2 rounded border border-amber-400/20 flex items-center justify-between">
          <span className="text-zinc-400">ACTIVE SYNAPSES</span>
          <span className="text-amber-400 font-extrabold">{synapseCount.toLocaleString()}</span>
        </div>
        <div className="bg-[#0A1628]/80 p-2 rounded border border-amber-400/20 flex items-center justify-between">
          <span className="text-zinc-400">INFERENCE LATENCY</span>
          <span className="text-amber-300 font-extrabold">{quantumSpeed}</span>
        </div>
      </div>
    </div>
  );
};
