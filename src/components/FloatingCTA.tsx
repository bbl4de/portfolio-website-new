import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Hide when scrolling
      setIsScrolling(true);
      setIsVisible(false);

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Show again after scrolling stops
      const timeout = setTimeout(() => {
        setIsScrolling(false);
        setIsVisible(true);
      }, 150);

      setScrollTimeout(timeout);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  const handleClick = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <Button
        size="lg"
        onClick={handleClick}
        className="bg-primary text-primary-foreground hover:bg-primary/90 cyber-glow-box shadow-lg animate-pulse-glow"
      >
        Get a Security Audit
        <ArrowDown className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};

export default FloatingCTA;
