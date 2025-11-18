import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/50 to-background" />
      
      <div className="container mx-auto px-4 z-10 text-center">
        <Badge variant="outline" className="mb-6 cyber-border text-primary animate-pulse-glow">
          Web3 Security Researcher
        </Badge>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-6 cyber-glow">
          bbl4de
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Security. Mastery. Trust. • Quick 48-hour turnaround • Seamless process with no unnecessary overhead
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 cyber-glow-box transition-all duration-300"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get a Quote
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="cyber-border hover:bg-card"
            onClick={() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Results
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6 rounded-lg bg-card/50 backdrop-blur cyber-border">
            <div className="text-4xl font-bold cyber-glow mb-2">38</div>
            <div className="text-muted-foreground">Total Findings</div>
          </div>
          <div className="p-6 rounded-lg bg-card/50 backdrop-blur cyber-border">
            <div className="text-4xl font-bold text-secondary mb-2">20+</div>
            <div className="text-muted-foreground">Contests & Audits</div>
          </div>
          <div className="p-6 rounded-lg bg-card/50 backdrop-blur cyber-border">
            <div className="text-4xl font-bold text-secondary mb-2">8</div>
            <div className="text-muted-foreground">Top 10 Finishes</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
