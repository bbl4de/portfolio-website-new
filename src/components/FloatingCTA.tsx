import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isAtContact, setIsAtContact] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Observer for contact section
    const contactSection = document.getElementById("contact");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsAtContact(entry.isIntersecting);
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
      }
    );

    if (contactSection) {
      observer.observe(contactSection);
    }

    return () => {
      if (contactSection) {
        observer.unobserve(contactSection);
      }
    };
  }, []);

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

  // Hide button if at contact section
  const shouldShow = isVisible && !isAtContact;

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        shouldShow ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95 pointer-events-none"
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
