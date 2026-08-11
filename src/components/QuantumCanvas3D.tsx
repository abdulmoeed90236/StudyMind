import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface QuantumCanvas3DProps {
  interactive?: boolean;
}

// Generate a soft round glow texture on-the-fly to prevent square box particles
function createGlowParticleTexture(): THREE.CanvasTexture | null {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.25, 'rgba(245, 158, 11, 0.95)');
  gradient.addColorStop(0.65, 'rgba(217, 119, 6, 0.3)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(32, 32, 32, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const QuantumCanvas3D: React.FC<QuantumCanvas3DProps> = ({ interactive = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Detect mobile viewport to optimize 3D particle performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // 1. SOFT ROUND GLOWING PARTICLES (No square boxes)
    const particleCount = isMobile ? 50 : 140;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const goldColors = [
      new THREE.Color('#F59E0B'), // Gold
      new THREE.Color('#FBBF24'), // Amber
      new THREE.Color('#FF8C00'), // Warm Orange
      new THREE.Color('#38BDF8'), // Quantum Sky Blue
      new THREE.Color('#FCD34D'), // Soft Yellow
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 110;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 75;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const randomColor = goldColors[Math.floor(Math.random() * goldColors.length)];
      colors[i * 3] = randomColor.r;
      colors[i * 3 + 1] = randomColor.g;
      colors[i * 3 + 2] = randomColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const glowTexture = createGlowParticleTexture();

    const pMaterial = new THREE.PointsMaterial({
      size: isMobile ? 2.8 : 2.2,
      map: glowTexture || undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, pMaterial);
    scene.add(particles);

    // 2. QUANTUM NEURAL CONSTELLATION LINES
    const maxConnections = isMobile ? 30 : 80;
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xF59E0B,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // 3. FLOATING 3D QUANTUM ICOSAHEDRONS & RINGS
    const quantumGroup = new THREE.Group();

    // Outer Geodesic Icosahedron Core
    const icoGeo = new THREE.IcosahedronGeometry(12, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xF59E0B,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    quantumGroup.add(icoMesh);

    // Rotating Torus Ring 1
    const ringGeo1 = new THREE.TorusGeometry(18, 0.08, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xFBBF24,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    quantumGroup.add(ring1);

    // Rotating Torus Ring 2
    const ringGeo2 = new THREE.TorusGeometry(26, 0.05, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x38BDF8,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    quantumGroup.add(ring2);

    scene.add(quantumGroup);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive) return;
      mouseX = (event.clientX / window.innerWidth - 0.5) * 0.4;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate Particles
      particles.rotation.y = elapsedTime * 0.025;
      particles.rotation.x = elapsedTime * 0.01;

      // Rotate Quantum Mesh & Rings
      icoMesh.rotation.y = elapsedTime * 0.08;
      icoMesh.rotation.x = elapsedTime * 0.05;

      ring1.rotation.z = elapsedTime * 0.1;
      ring2.rotation.y = elapsedTime * 0.07 + Math.PI / 4;

      // Dynamically connect close particles with constellation lines
      let vertexIdx = 0;
      const posArr = particleGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount && vertexIdx < maxConnections * 6; i += 2) {
        for (let j = i + 1; j < particleCount && vertexIdx < maxConnections * 6; j += 3) {
          const dx = posArr[i * 3] - posArr[j * 3];
          const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
          const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 250) {
            linePositions[vertexIdx++] = posArr[i * 3];
            linePositions[vertexIdx++] = posArr[i * 3 + 1];
            linePositions[vertexIdx++] = posArr[i * 3 + 2];

            linePositions[vertexIdx++] = posArr[j * 3];
            linePositions[vertexIdx++] = posArr[j * 3 + 1];
            linePositions[vertexIdx++] = posArr[j * 3 + 2];
          }
        }
      }

      lineGeometry.attributes.position.needsUpdate = true;

      // Smooth Mouse Lerp Camera Movement
      camera.position.x += (mouseX * 12 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 12 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      particleGeometry.dispose();
      pMaterial.dispose();
      if (glowTexture) glowTexture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
    };
  }, [interactive]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.85 }}
    />
  );
};

