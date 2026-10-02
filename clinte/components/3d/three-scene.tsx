"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import EarthGlobe from "./earth-globe";
import FloatingElements from "./floating-elements";

export default function ThreeScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#030014]/50">
        <div className="text-slate-500 font-mono text-xs">Initializing WebGL Engine...</div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[5, 3, 5]} intensity={1.8} />
        <pointLight position={[-5, -3, -5]} intensity={1.0} color="#a855f7" />
        
        {/* Outer starry space dust background */}
        <Stars 
          radius={120} 
          depth={40} 
          count={2000} 
          factor={4} 
          saturation={0.6} 
          fade 
          speed={1.2} 
        />
        
        {/* Futuristic Grid Earth */}
        <EarthGlobe />
        
        {/* Floating 3D text snippets */}
        <FloatingElements />
      </Canvas>
    </div>
  );
}
