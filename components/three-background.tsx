"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const count = 650;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 9;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x52d6ff,
      size: 0.032,
      transparent: true,
      opacity: 0.72
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const torus = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.2, 0.18, 140, 16),
      new THREE.MeshBasicMaterial({ color: 0x70f0bb, wireframe: true, transparent: true, opacity: 0.22 })
    );
    torus.position.set(2.8, 0.4, -1.2);
    scene.add(torus);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.00035;
      torus.rotation.x += 0.004;
      torus.rotation.y += 0.006;
      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className="absolute inset-0 -z-10 opacity-80" />;
}
