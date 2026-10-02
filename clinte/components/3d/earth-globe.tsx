"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export default function EarthGlobe() {
  const outerSphereRef = useRef<THREE.Mesh>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.y = elapsedTime * 0.15;
      outerSphereRef.current.rotation.x = elapsedTime * 0.05;
    }

    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.y = -elapsedTime * 0.08;
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y = elapsedTime * 0.05;
    }
  });

  // Create coordinates for procedural particle field surrounding the globe
  const count = 300;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 2.4 + Math.random() * 0.8;
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.8}>
      <group scale={[1.1, 1.1, 1.1]}>
        {/* Core Glow Base */}
        <mesh ref={innerSphereRef}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial 
            color="#090526"
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Cyber Grid Wireframe Sphere */}
        <mesh ref={outerSphereRef}>
          <sphereGeometry args={[1.52, 24, 24]} />
          <meshBasicMaterial
            color="#00f0ff"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>

        {/* Second Rotating Lattice Layer */}
        <mesh 
          rotation={[0.5, 0.5, 0]}
        >
          <sphereGeometry args={[1.55, 16, 16]} />
          <meshBasicMaterial
            color="#a855f7"
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>

        {/* Orbiting Tech Particles */}
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.035}
            color="#06b6d4"
            transparent
            opacity={0.75}
            sizeAttenuation={true}
          />
        </points>
      </group>
    </Float>
  );
}
