import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WarpSpeedBackgroundProps {
  onReady?: () => void;
}

const WarpStreaks = ({ onReady }: { onReady?: () => void }) => {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const STAR_COUNT = 800;
  const SPEED = 0.012;

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  const { positions, velocities, sizes } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const velocities = new Float32Array(STAR_COUNT);
    const sizes = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = Math.random() * 15 + 2;
      
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(theta) * radius;
      positions[i * 3 + 2] = Math.random() * 100 - 50;
      
      velocities[i] = Math.random() * 0.5 + 0.5;
      sizes[i] = Math.random() * 2 + 1;
    }

    return { positions, velocities, sizes };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, velocities, sizes]);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#ea580c') },
        color2: { value: new THREE.Color('#ffb464') },
      },
      vertexShader: `
        attribute float velocity;
        attribute float size;
        varying float vZ;
        varying float vVelocity;
        
        void main() {
          vZ = position.z;
          vVelocity = velocity;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (50.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        varying float vZ;
        varying float vVelocity;
        
        void main() {
          float depth = smoothstep(-50.0, 50.0, vZ);
          vec3 color = mix(color1, color2, depth);
          
          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center);
          
          // Create elongated streak shape
          float streak = 1.0 - smoothstep(0.0, 0.5, dist);
          streak *= smoothstep(0.5, 0.0, abs(center.y) * 2.0);
          
          float alpha = streak * (0.3 + depth * 0.7);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < STAR_COUNT; i++) {
      positions[i * 3 + 2] += SPEED * 100 * velocities[i];
      
      if (positions[i * 3 + 2] > 50) {
        const theta = Math.random() * Math.PI * 2;
        const radius = Math.random() * 15 + 2;
        positions[i * 3] = Math.cos(theta) * radius;
        positions[i * 3 + 1] = Math.sin(theta) * radius;
        positions[i * 3 + 2] = -50;
      }
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={meshRef} geometry={geometry} material={shaderMaterial}>
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </points>
  );
};

const WarpSpeedBackground = ({ onReady }: WarpSpeedBackgroundProps) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75, near: 0.1, far: 1000 }}
        style={{ background: '#0a0806' }}
        gl={{ alpha: false, antialias: true }}
      >
        <WarpStreaks onReady={onReady} />
      </Canvas>
      
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
