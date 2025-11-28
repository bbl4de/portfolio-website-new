import { ReactNode } from 'react';
import WarpSpeedBackground from './WarpSpeedBackground';

interface LightspeedSectionProps {
  children: ReactNode;
}

const LightspeedSection = ({ children }: LightspeedSectionProps) => {
  return (
    <div className="relative bg-[#0a0806]">
      {/* Continuous warp speed background spanning both sections */}
      <div className="absolute inset-0">
        <WarpSpeedBackground />
      </div>
      
      {/* Top fade-in gradient */}
      <div 
        className="absolute inset-x-0 top-0 pointer-events-none z-20"
        style={{
          height: '25%',
          background: 'linear-gradient(to bottom, rgba(10, 8, 6, 1) 0%, rgba(10, 8, 6, 0.7) 40%, transparent 100%)'
        }}
      />
      
      {/* Bottom fade-out gradient */}
      <div 
        className="absolute inset-x-0 bottom-0 pointer-events-none z-20"
        style={{
          height: '25%',
          background: 'linear-gradient(to top, rgba(10, 8, 6, 1) 0%, rgba(10, 8, 6, 0.7) 40%, transparent 100%)'
        }}
      />
      
      {/* Content with relative positioning */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default LightspeedSection;
