import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { useEffect, useRef } from "react";
import machFinanceLogo from "@/assets/logos/mach-finance.png";
import infinifiLogo from "@/assets/logos/infinifi.png";
import storyLogo from "@/assets/logos/story.png";
import collarLogo from "@/assets/logos/collar.png";
import beraborrowLogo from "@/assets/logos/beraborrow.png";
import alloraLogo from "@/assets/logos/allora.png";
import debitaLogo from "@/assets/logos/debita.png";
import citreaLogo from "@/assets/logos/citrea.png";
import heroBg from "@/assets/hero-bg.jpg";

interface Contest {
  platform: string;
  contest: string;
  rank: string;
  findings: string;
  url: string;
  tech: string;
  logo: string;
}

const contests: Contest[] = [
  {
    platform: "Sherlock",
    contest: "Mach Finance",
    rank: "1st Place 🥇",
    findings: "1 Medium",
    url: "https://audits.sherlock.xyz/contests/727/leaderboard",
    tech: "Solidity • Lending on SONIC",
    logo: machFinanceLogo
  },
  {
    platform: "Cantina",
    contest: "Infinifi Protocol",
    rank: "3rd Place 🥉",
    findings: "1 High, 4 Medium",
    url: "https://cantina.xyz/competitions/2ac7f906-1661-47eb-bfd6-519f5db0d36b/leaderboard",
    tech: "Solidity • Yield farming",
    logo: infinifiLogo
  },
  {
    platform: "Cantina",
    contest: "Story Network",
    rank: "11th Place",
    findings: "1 High, 1 Medium",
    url: "https://cantina.xyz/competitions/0561defa-eeb2-4a74-8884-5d7a873afa58/leaderboard",
    tech: "Go + Solidity • L1 for IP",
    logo: storyLogo
  },
  {
    platform: "Cantina",
    contest: "Collar Core (Votre)",
    rank: "5th Place",
    findings: "1 Medium",
    url: "https://cantina.xyz/competitions/050711ca-a6d1-4fdd-9f94-3816233c1bd5/leaderboard",
    tech: "Solidity • Liquidation-free lending",
    logo: collarLogo
  },
  {
    platform: "Sherlock",
    contest: "Beraborrow",
    rank: "7th Place",
    findings: "Private",
    url: "https://audits.sherlock.xyz/contests/741/leaderboard",
    tech: "Solidity • Lending on Berachain",
    logo: beraborrowLogo
  },
  {
    platform: "Sherlock",
    contest: "Allora v0.8.0",
    rank: "11th Place",
    findings: "Private",
    url: "https://audits.sherlock.xyz/contests/728/leaderboard",
    tech: "Go • CosmosSDK L1",
    logo: alloraLogo
  },
  {
    platform: "Sherlock",
    contest: "Debita Finance V3",
    rank: "6th Place",
    findings: "2 High, 7 Medium",
    url: "https://audits.sherlock.xyz/contests/627/leaderboard",
    tech: "Solidity • Lending + NFT marketplace",
    logo: debitaLogo
  },
  {
    platform: "Cantina",
    contest: "Citrea",
    rank: "20th Place",
    findings: "2 Low",
    url: "https://cantina.xyz/competitions/49b9e08d-4f8f-4103-b6e5-f5f43cf9faa1/leaderboard",
    tech: "Rust + Solidity • Bitcoin L2",
    logo: citreaLogo
  }
];

const ContestResultsCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset scroll when we've scrolled past half the content
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Duplicate contests for infinite scroll effect
  const duplicatedContests = [...contests, ...contests];

  return (
    <section id="results" className="relative py-20 px-4 overflow-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/80 to-background" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-glow">
            Contest Results
          </h2>
          <p className="text-muted-foreground text-lg">
            Public audit competitions
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-base">
            <div className="flex items-center gap-2">
              <Badge variant="destructive" className="text-base px-3 py-1">15 High</Badge>
              <span className="text-muted-foreground">severity findings</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="cyber-border text-primary text-base px-3 py-1">23 Medium</Badge>
              <span className="text-muted-foreground">severity findings</span>
            </div>
          </div>
        </div>

        {/* Auto-scrolling carousel */}
        <div className="relative overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            {duplicatedContests.map((contest, index) => (
              <Card 
                key={index} 
                className="flex-shrink-0 w-[380px] bg-card/50 backdrop-blur cyber-border hover:cyber-glow-box transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <img 
                      src={contest.logo} 
                      alt={`${contest.contest} logo`}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <Badge variant="outline" className="cyber-border text-primary">
                      {contest.platform}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {contest.contest}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground font-semibold">
                    {contest.rank}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-xs text-muted-foreground">
                    {contest.tech}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Findings:</span>
                      <span className="font-semibold">{contest.findings}</span>
                    </div>
                  </div>
                  <a 
                    href={contest.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors mt-2"
                  >
                    View Details <ExternalLink className="h-3 w-3" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Hover over cards to pause
        </p>
      </div>
    </section>
  );
};

export default ContestResultsCarousel;
