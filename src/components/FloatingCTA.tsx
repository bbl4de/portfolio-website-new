import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const FloatingCTA = () => {
  const [isAtContact, setIsAtContact] = useState(false);
  const [pastHero, setPastHero] = useState(false);

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
    const pastInitialView = () => window.scrollY > window.innerHeight * 0.25;

    const handleScroll = () => {
      setPastHero(pastInitialView());
    };

    // Set initial visibility based on initial scroll position
    setPastHero(pastInitialView());

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.location.href = "/book-an-audit";
  };

  // Hide button if at contact section or before scrolling past hero
  const shouldShow = pastHero && !isAtContact;

  return (
    <div
      className={`fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        shouldShow ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95 pointer-events-none"
      }`}
    >
      <Button
        size="lg"
        onClick={handleClick}
        className="bg-primary text-primary-foreground hover:bg-primary/90 cyber-glow-box shadow-lg animate-pulse-glow text-base sm:text-[1.2rem] px-4 sm:px-6"
        style={{ animationDuration: "2s" }}
      >
        Book an audit
      </Button>
    </div>
  );
};

export default FloatingCTA;
