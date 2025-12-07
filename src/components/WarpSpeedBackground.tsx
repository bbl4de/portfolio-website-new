import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WarpSpeedBackgroundProps {
  onReady?: () => void;
}

const WarpStreaks = ({ onReady }: { onReady?: () => void }) => {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const particleMaterialRef = useRef<THREE.ShaderMaterial>(null);
  
  const STREAK_COUNT = 400;
  const HERO_STREAK_COUNT = 60;
  const PARTICLE_COUNT = 100;
  const SPEED = 0.003; // Much slower speed

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  // Main streaks
  const streakData = useMemo(() => {
    const positions = new Float32Array((STREAK_COUNT + HERO_STREAK_COUNT) * 3);
    const velocities = new Float32Array(STREAK_COUNT + HERO_STREAK_COUNT);
    const sizes = new Float32Array(STREAK_COUNT + HERO_STREAK_COUNT);
    const isHero = new Float32Array(STREAK_COUNT + HERO_STREAK_COUNT);

    // Regular thin streaks
    for (let i = 0; i < STREAK_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = Math.random() * 20 + 1;
      
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(theta) * radius;
      positions[i * 3 + 2] = Math.random() * 100 - 50;
      
      velocities[i] = Math.random() * 0.4 + 0.6;
      sizes[i] = Math.random() * 1.5 + 0.5;
      isHero[i] = 0.0;
    }

    // Hero streaks (thicker, brighter)
    for (let i = STREAK_COUNT; i < STREAK_COUNT + HERO_STREAK_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = Math.random() * 18 + 3;
      
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(theta) * radius;
      positions[i * 3 + 2] = Math.random() * 100 - 50;
      
      velocities[i] = Math.random() * 0.3 + 0.7;
      sizes[i] = Math.random() * 3 + 2;
      isHero[i] = 1.0;
    }

    return { positions, velocities, sizes, isHero };
  }, []);

  // Particle stars
  const particleData = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT);
    const sizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = Math.random() * 25 + 2;
      
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(theta) * radius;
      positions[i * 3 + 2] = Math.random() * 100 - 50;
      
      velocities[i] = Math.random() * 0.3 + 0.5;
      sizes[i] = Math.random() * 0.8 + 0.3;
    }

    return { positions, velocities, sizes };
  }, []);

  const streakGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(streakData.positions, 3));
    geo.setAttribute('velocity', new THREE.BufferAttribute(streakData.velocities, 1));
    geo.setAttribute('size', new THREE.BufferAttribute(streakData.sizes, 1));
    geo.setAttribute('isHero', new THREE.BufferAttribute(streakData.isHero, 1));
    return geo;
  }, [streakData]);

  const particleGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particleData.positions, 3));
    geo.setAttribute('velocity', new THREE.BufferAttribute(particleData.velocities, 1));
    geo.setAttribute('size', new THREE.BufferAttribute(particleData.sizes, 1));
    return geo;
  }, [particleData]);

  const streakMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        attribute float velocity;
        attribute float size;
        attribute float isHero;
        varying float vZ;
        varying float vVelocity;
        varying float vIsHero;
        
        void main() {
          vZ = position.z;
          vVelocity = velocity;
          vIsHero = isHero;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (60.0 / -mvPosition.z) * (isHero > 0.5 ? 1.5 : 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vZ;
        varying float vVelocity;
        varying float vIsHero;
        
        void main() {
          float depth = smoothstep(-50.0, 50.0, vZ);
          
          // Pure orange color gradient - no white
          vec3 coreColor = vec3(1.0, 0.6, 0.1);   // Bright orange core
          vec3 midColor = vec3(0.95, 0.45, 0.05); // Saturated orange
          vec3 outerColor = vec3(0.85, 0.35, 0.0); // Deep orange
          vec3 emberColor = vec3(0.5, 0.2, 0.05);  // Ember fade
          
          vec3 color;
          if (depth < 0.3) {
            color = mix(emberColor, outerColor, depth / 0.3);
          } else if (depth < 0.6) {
            color = mix(outerColor, midColor, (depth - 0.3) / 0.3);
          } else {
            color = mix(midColor, coreColor, (depth - 0.6) / 0.4);
          }
          
          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center);
          
          // Elongated line shape - much more stretched horizontally
          float lineWidth = 0.08; // Thin line
          float streak = 1.0 - smoothstep(0.0, lineWidth, abs(center.y));
          streak *= 1.0 - smoothstep(0.3, 0.5, abs(center.x));
          
          // Add subtle glow around the line
          float glow = exp(-abs(center.y) * 8.0) * 0.4;
          streak += glow * (vIsHero > 0.5 ? 1.0 : 0.6);
          
          float alpha = streak * (0.5 + depth * 0.5);
          alpha *= vIsHero > 0.5 ? 1.0 : 0.8;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  const particleMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        attribute float velocity;
        attribute float size;
        varying float vZ;
        
        void main() {
          vZ = position.z;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (30.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vZ;
        
        void main() {
          float depth = smoothstep(-50.0, 50.0, vZ);
          // Orange particles instead of white
          vec3 color = mix(vec3(0.7, 0.3, 0.05), vec3(1.0, 0.5, 0.1), depth);
          
          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center);
          
          // Small line shape
          float lineWidth = 0.1;
          float line = 1.0 - smoothstep(0.0, lineWidth, abs(center.y));
          line *= 1.0 - smoothstep(0.2, 0.4, abs(center.x));
          
          float alpha = line * (0.3 + depth * 0.4);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !particlesRef.current) return;
    
    const streakPositions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const particlePositions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    // Animate streaks
    for (let i = 0; i < STREAK_COUNT + HERO_STREAK_COUNT; i++) {
      streakPositions[i * 3 + 2] += SPEED * 100 * streakData.velocities[i];
      
      if (streakPositions[i * 3 + 2] > 50) {
        const theta = Math.random() * Math.PI * 2;
        const radius = Math.random() * 20 + 1;
        streakPositions[i * 3] = Math.cos(theta) * radius;
        streakPositions[i * 3 + 1] = Math.sin(theta) * radius;
        streakPositions[i * 3 + 2] = -50;
      }
    }
    
    // Animate particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlePositions[i * 3 + 2] += SPEED * 80 * particleData.velocities[i];
      
      if (particlePositions[i * 3 + 2] > 50) {
        const theta = Math.random() * Math.PI * 2;
        const radius = Math.random() * 25 + 2;
        particlePositions[i * 3] = Math.cos(theta) * radius;
        particlePositions[i * 3 + 1] = Math.sin(theta) * radius;
        particlePositions[i * 3 + 2] = -50;
      }
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
    if (particleMaterialRef.current) {
      particleMaterialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <>
      <points ref={meshRef} geometry={streakGeometry} material={streakMaterial}>
        <primitive object={streakMaterial} ref={materialRef} attach="material" />
      </points>
      <points ref={particlesRef} geometry={particleGeometry} material={particleMaterial}>
        <primitive object={particleMaterial} ref={particleMaterialRef} attach="material" />
      </points>
    </>
  );
};

const WarpSpeedBackground = ({ onReady }: WarpSpeedBackgroundProps) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75, near: 0.1, far: 1000 }}
        style={{ background: 'radial-gradient(ellipse at center, #1a120a 0%, #0a0806 50%, #050403 100%)' }}
        gl={{ alpha: false, antialias: true }}
      >
        <WarpStreaks onReady={onReady} />
      </Canvas>
      
      {/* Vignette overlay - darkest at center for text readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.2) 100%)',
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
