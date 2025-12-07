import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';

// Extend Three.js elements for R3F
extend({ Line_: THREE.Line });

interface WarpSpeedBackgroundProps {
  onReady?: () => void;
}

interface StreakData {
  startRadius: number;
  angle: number;
  z: number;
  speed: number;
  length: number;
  brightness: number;
}

// Star Wars hyperspace-style streaks
const HyperspaceStreaks = ({ onReady }: { onReady?: () => void }) => {
  const STREAK_COUNT = 300;
  const SPEED = 0.4;

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  const streaksRef = useRef<StreakData[]>([]);
  const linesRef = useRef<(THREE.Line | null)[]>([]);

  // Initialize streak data
  const initialStreaks = useMemo(() => {
    const arr: StreakData[] = [];
    for (let i = 0; i < STREAK_COUNT; i++) {
      arr.push({
        angle: Math.random() * Math.PI * 2,
        startRadius: Math.random() * 15 + 2,
        z: Math.random() * 200 - 100,
        speed: Math.random() * 0.5 + 0.5,
        length: Math.random() * 10 + 5,
        brightness: Math.random() * 0.5 + 0.5,
      });
    }
    streaksRef.current = arr;
    return arr;
  }, []);

  // Create geometries and materials
  const lineData = useMemo(() => {
    return initialStreaks.map((streak) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(6);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const intensity = streak.brightness;
      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color(1.0 * intensity, 0.5 * intensity, 0.1 * intensity),
        transparent: true,
        opacity: 0.7,
      });
      
      const line = new THREE.Line(geometry, material);
      return line;
    });
  }, [initialStreaks]);

  useFrame(() => {
    streaksRef.current.forEach((streak, i) => {
      streak.z += SPEED * streak.speed;
      
      if (streak.z > 50) {
        streak.z = -150;
        streak.angle = Math.random() * Math.PI * 2;
        streak.startRadius = Math.random() * 15 + 2;
      }

      const line = lineData[i];
      if (line) {
        const positions = line.geometry.attributes.position.array as Float32Array;
        
        const perspectiveNear = Math.max(0.1, (streak.z + 100) / 150);
        const perspectiveFar = Math.max(0.1, (streak.z + 100 - streak.length) / 150);
        
        const x1 = Math.cos(streak.angle) * streak.startRadius * perspectiveNear;
        const y1 = Math.sin(streak.angle) * streak.startRadius * perspectiveNear;
        const z1 = streak.z;
        
        const x2 = Math.cos(streak.angle) * streak.startRadius * perspectiveFar;
        const y2 = Math.sin(streak.angle) * streak.startRadius * perspectiveFar;
        const z2 = streak.z - streak.length;
        
        positions[0] = x1;
        positions[1] = y1;
        positions[2] = z1;
        positions[3] = x2;
        positions[4] = y2;
        positions[5] = z2;
        
        line.geometry.attributes.position.needsUpdate = true;
        
        const material = line.material as THREE.LineBasicMaterial;
        const fadeIn = Math.min(1, (streak.z + 100) / 50);
        const fadeOut = Math.min(1, (50 - streak.z) / 30);
        material.opacity = streak.brightness * fadeIn * fadeOut * 0.8;
      }
    });
  });

  return (
    <group>
      {lineData.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
};

const WarpSpeedBackground = ({ onReady }: WarpSpeedBackgroundProps) => {
  return (
    <div 
      className="absolute inset-0 w-full h-full"
      style={{ backgroundColor: 'hsl(0, 0%, 6%)' }}
    >
      <Canvas
        camera={{ position: [0, 0, 30], fov: 60, near: 0.1, far: 500 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <HyperspaceStreaks onReady={onReady} />
      </Canvas>
      
      {/* Subtle film grain texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default WarpSpeedBackground;