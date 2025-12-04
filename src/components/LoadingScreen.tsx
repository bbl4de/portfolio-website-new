import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadComplete: () => void;
  minLoadTime?: number;
}

const LoadingScreen = ({ onLoadComplete, minLoadTime = 2000 }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / minLoadTime) * 100, 100);
      setProgress(newProgress);
      
      if (elapsed >= minLoadTime) {
        clearInterval(interval);
        onLoadComplete();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [minLoadTime, onLoadComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
      {/* Logo/Name */}
      <div className="mb-12">
        <h1 className="text-6xl md:text-8xl font-bold cyber-glow animate-pulse">
          bbl4de
        </h1>
      </div>

      {/* Loading bar */}
      <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Animated dots */}
      <div className="mt-8 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
};

export default LoadingScreen;
