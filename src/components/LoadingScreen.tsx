const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
      {/* Logo/Name */}
      <div className="mb-12">
        <h1 className="text-6xl md:text-8xl font-bold cyber-glow animate-pulse">
          bbl4de
        </h1>
      </div>

      {/* Animated loading bar */}
      <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary animate-loading-bar"
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
