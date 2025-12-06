import { useEffect, useRef } from 'react';

interface WarpSpeedBackgroundProps {
  onReady?: () => void;
}

const WarpSpeedBackground = ({ onReady }: WarpSpeedBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Call onReady immediately since this is lightweight
    onReady?.();

    let animationId: number;
    let stars: Array<{
      x: number;
      y: number;
      z: number;
      px: number;
      py: number;
    }> = [];

    const STAR_COUNT = 500;
    const SPEED = 0.5;
    const MAX_DEPTH = 1000;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * MAX_DEPTH,
          px: 0,
          py: 0,
        });
      }
    };

    const animate = () => {
      // Clear with solid color for smooth continuous motion
      ctx.fillStyle = '#0a0806';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (const star of stars) {
        // Store previous z for trail calculation
        const prevZ = star.z;
        
        // Continuous linear movement
        star.z -= SPEED;

        if (star.z <= 1) {
          star.x = (Math.random() - 0.5) * canvas.width;
          star.y = (Math.random() - 0.5) * canvas.height;
          star.z = MAX_DEPTH;
          star.px = star.x;
          star.py = star.y;
          continue;
        }

        const scale = 128 / star.z;
        const x = star.x * scale + cx;
        const y = star.y * scale + cy;

        // Calculate previous position for streak
        const prevScale = 128 / prevZ;
        const px = star.px * prevScale + cx;
        const py = star.py * prevScale + cy;

        // Skip if outside canvas
        if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) continue;

        const depth = 1 - star.z / MAX_DEPTH;
        const alpha = Math.min(1, depth * 1.2 + 0.1);
        const lineWidth = depth * 2.5 + 0.3;

        // Orange/amber gradient based on depth
        const r = Math.floor(234 + depth * 21);
        const g = Math.floor(88 + depth * 50);
        const b = Math.floor(12 + depth * 10);

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Add glow for closer stars
        if (depth > 0.6) {
          ctx.beginPath();
          ctx.arc(x, y, lineWidth * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 180, 100, ${(depth - 0.6) * 0.4})`;
          ctx.fill();
        }

        star.px = star.x;
        star.py = star.y;
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [onReady]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: '#0a0806' }}
      />
      
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
