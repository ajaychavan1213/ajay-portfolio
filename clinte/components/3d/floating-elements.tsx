"use client";

import { useRef } from "react";
import { Float, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SnippetProps {
  text: string;
  position: [number, number, number];
  color: string;
  speed: number;
  floatIntensity: number;
}

function FloatingCodeSnippet({ text, position, color, speed, floatIntensity }: SnippetProps) {
  return (
    <Float 
      speed={speed} 
      floatIntensity={floatIntensity} 
      rotationIntensity={0.3}
      position={position}
    >
      <Text
        font="https://cdn.jsdelivr.net/fontsource/fonts/space-mono@latest/latin-400-normal.woff2" // Stable jsDelivr Monospace CDN font
        fontSize={0.16}
        color={color}
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        fillOpacity={0.65}
      >
        {text}
      </Text>
    </Float>
  );
}

export default function FloatingElements() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  const snippets = [
    { text: "const developer = new Ajay();", position: [-2.2, 1.3, -1] as [number, number, number], color: "#00f0ff", speed: 1.4, floatIntensity: 0.6 },
    { text: "await developer.deployToVercel();", position: [2.5, -1.2, 0.5] as [number, number, number], color: "#a855f7", speed: 1.8, floatIntensity: 0.8 },
    { text: "import { React3Fiber } from 'three';", position: [-2.8, -1.0, 1] as [number, number, number], color: "#06b6d4", speed: 1.2, floatIntensity: 0.5 },
    { text: "npm i @next/three-portfolio", position: [2.2, 1.4, -0.8] as [number, number, number], color: "#00f0ff", speed: 1.6, floatIntensity: 0.7 },
    { text: "<div>CyberSphere 3D</div>", position: [-1.2, -1.9, -0.5] as [number, number, number], color: "#a855f7", speed: 1.5, floatIntensity: 0.6 },
  ];

  return (
    <group ref={groupRef}>
      {snippets.map((snip, index) => (
        <FloatingCodeSnippet 
          key={index}
          text={snip.text}
          position={snip.position}
          color={snip.color}
          speed={snip.speed}
          floatIntensity={snip.floatIntensity}
        />
      ))}
    </group>
  );
}
