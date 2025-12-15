import { Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t cyber-border">
      <div className="container mx-auto">
        {/* Mobile layout */}
        <div className="flex flex-col gap-3 md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start gap-1">
              <h3 className="text-lg font-bold cyber-glow leading-tight">bbl4de</h3>
              <p className="text-muted-foreground text-[11px]">Web3 Security Researcher</p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <a 
                href="https://x.com/bbl4de_xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="https://github.com/bbl4de" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground text-[11px]">
              © 2024 bbl4de. All rights reserved.
            </p>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col items-start gap-1">
            <h3 className="text-2xl font-bold cyber-glow leading-tight">bbl4de</h3>
            <p className="text-muted-foreground text-sm">Web3 Security Researcher</p>
          </div>

          <div className="flex items-center justify-center gap-6">
            <a 
              href="https://x.com/bbl4de_xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="https://github.com/bbl4de" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>

          <div className="text-right">
            <p className="text-muted-foreground text-sm">
              © 2024 bbl4de. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
