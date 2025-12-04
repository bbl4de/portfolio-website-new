import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { InstancedMesh, Object3D, Vector3, Color } from 'three';

const STREAK_COUNT = 800;
const PARTICLE_COUNT = 200;

interface Streak {
  position: Vector3;
  velocity: number;
  thickness: number;
  brightness: number;
  angle: number;
  distance: number;
}

const Starfield = () => {
  const streaksRef = useRef<InstancedMesh>(null!);
  const particlesRef = useRef<InstancedMesh>(null!);
  
  const streaks = useMemo<Streak[]>(() => {
    return Array.from({ length: STREAK_COUNT }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 15 + 5;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const z = Math.random() * 50 - 25;
      
      return {
        position: new Vector3(x, y, z),
        velocity: Math.random() * 0.35 + 0.2,
        thickness: Math.random() > 0.9 ? Math.random() * 0.15 + 0.1 : Math.random() * 0.05 + 0.02,
        brightness: Math.random() > 0.85 ? Math.random() * 0.5 + 0.8 : Math.random() * 0.4 + 0.3,
        angle,
        distance
      };
    });
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 20 + 3;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const z = Math.random() * 50 - 25;
      
      return {
        position: new Vector3(x, y, z),
        velocity: Math.random() * 0.3 + 0.15,
        angle,
        distance
      };
    });
  }, []);

  useFrame((state, delta) => {
    const dummy = new Object3D();
    
    // Update streaks
    streaks.forEach((streak, i) => {
      // Move streak outward from center
      const newDistance = streak.distance + streak.velocity * delta * 60;
      
      // Reset if too far
      if (newDistance > 30) {
        streak.distance = 5 + Math.random() * 3;
      } else {
        streak.distance = newDistance;
      }
      
      const x = Math.cos(streak.angle) * streak.distance;
      const y = Math.sin(streak.angle) * streak.distance;
      
      streak.position.set(x, y, streak.position.z);
      
      // Position and scale the streak
      dummy.position.copy(streak.position);
      dummy.lookAt(0, 0, streak.position.z);
      dummy.rotateZ(Math.PI / 2);
      
      // Length based on velocity and distance for motion blur effect
      const length = streak.velocity * 3 * (1 + streak.distance / 10);
      dummy.scale.set(streak.thickness, length, 1);
      
      dummy.updateMatrix();
      streaksRef.current.setMatrixAt(i, dummy.matrix);
      
      // Color based on brightness and distance (fade to orange at edges)
      const distanceFactor = Math.min(streak.distance / 25, 1);
      const color = new Color();
      
      if (streak.brightness > 0.7) {
        // Hero streaks: white to darker orange
        color.setRGB(
          0.95,
          0.5 - distanceFactor * 0.25,
          0.15 - distanceFactor * 0.12
        );
      } else {
        // Regular streaks: darker amber to deep orange
        color.setRGB(
          0.85,
          0.4 - distanceFactor * 0.2,
          0.08 - distanceFactor * 0.06
        );
      }
      
      color.multiplyScalar(streak.brightness * (1.2 - distanceFactor * 0.4));
      streaksRef.current.setColorAt(i, color);
    });
    
    streaksRef.current.instanceMatrix.needsUpdate = true;
    if (streaksRef.current.instanceColor) {
      streaksRef.current.instanceColor.needsUpdate = true;
    }
    
    // Update particles
    particles.forEach((particle, i) => {
      const newDistance = particle.distance + particle.velocity * delta * 60;
      
      if (newDistance > 25) {
        particle.distance = 3 + Math.random() * 2;
      } else {
        particle.distance = newDistance;
      }
      
      const x = Math.cos(particle.angle) * particle.distance;
      const y = Math.sin(particle.angle) * particle.distance;
      
      particle.position.set(x, y, particle.position.z);
      
      dummy.position.copy(particle.position);
      dummy.lookAt(0, 0, particle.position.z);
      
      // Stretch particles slightly as they move
      const stretch = 1 + particle.velocity * 0.5;
      dummy.scale.set(0.05, stretch * 0.3, 1);
      
      dummy.updateMatrix();
      particlesRef.current.setMatrixAt(i, dummy.matrix);
      
      // Particles are darker orange
      const distanceFactor = Math.min(particle.distance / 20, 1);
      const color = new Color(0.9, 0.55 - distanceFactor * 0.25, 0.2 - distanceFactor * 0.15);
      particlesRef.current.setColorAt(i, color);
    });
    
    particlesRef.current.instanceMatrix.needsUpdate = true;
    if (particlesRef.current.instanceColor) {
      particlesRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <>
      <instancedMesh ref={streaksRef} args={[undefined, undefined, STREAK_COUNT]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial toneMapped={false} transparent opacity={0.9} />
      </instancedMesh>
      
      <instancedMesh ref={particlesRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial toneMapped={false} transparent opacity={0.95} />
      </instancedMesh>
    </>
  );
};

interface WarpSpeedBackgroundProps {
  onReady?: () => void;
}

const WarpSpeedBackground = ({ onReady }: WarpSpeedBackgroundProps) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        onCreated={() => {
          // Give a small delay for the first frame to render
          setTimeout(() => {
            onReady?.();
          }, 100);
        }}
      >
        <color attach="background" args={['#0a0806']} />
        <fog attach="fog" args={['#0a0806', 10, 35]} />
        <Starfield />
      </Canvas>
      
      {/* Center vignette overlay for text readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(10, 8, 6, 0.7) 0%, rgba(10, 8, 6, 0.3) 40%, transparent 70%)'
        }}
      />
      
      {/* Subtle film grain texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default WarpSpeedBackground;
