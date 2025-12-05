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
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationRef.current = requestAnimationFrame(scroll);
    };

    const handleMouseEnter = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };

    const handleMouseLeave = () => {
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(scroll);
      }
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    
    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Duplicate contests for infinite scroll effect
  const duplicatedContests = [...contests, ...contests];

  const judgingCards = [
    {
      name: "Gamma Strategies",
      description: "UniV4 limit & scale orders",
      tech: "Solidity",
      submissions: "100+",
      url: "https://cantina.xyz/competitions/aaf79192-6ea7-4b1e-aed7-3d23212dd0f1"
    },
    {
      name: "Kuru Exchange",
      description: "DEX on Monad (CLOB)",
      tech: "Solidity",
      submissions: "1100+",
      url: "https://cantina.xyz/code/cdce21ba-b787-4df4-9c56-b31d085388e7/overview"
    }
  ];

  return (
    <section id="results" className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background flex flex-col justify-center">
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 cyber-glow">
            Contest Results
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-base">
            <div className="flex items-center gap-2">
              <Badge variant="destructive" className="text-base px-3 py-1">17 High</Badge>
              <span className="text-muted-foreground">severity findings</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-base px-3 py-1">25 Medium</Badge>
              <span className="text-muted-foreground">severity findings</span>
            </div>
          </div>
        </div>

        {/* Auto-scrolling carousel */}
        <div className="relative overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            {duplicatedContests.map((contest, index) => (
              <Card 
                key={index} 
                className="flex-shrink-0 w-[480px] bg-card/50 backdrop-blur cyber-border hover:cyber-glow-box transition-all duration-300 group"
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <img 
                      src={contest.logo} 
                      alt={`${contest.contest} logo`}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <Badge variant="outline" className="cyber-border text-primary text-base px-4 py-1">
                      {contest.platform}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {contest.contest}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground font-semibold text-lg">
                    {contest.rank}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    {contest.tech}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-base">
                      <span className="text-muted-foreground">Findings:</span>
                      <span className="font-semibold">{contest.findings}</span>
                    </div>
                  </div>
                  <a 
                    href={contest.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mt-4"
                  >
                    View Details <ExternalLink className="h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Judging Section */}
        <div className="text-center mt-24 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 cyber-glow">
            Judging
          </h2>
        </div>

        <div className="flex justify-center gap-8">
          {judgingCards.map((judging, index) => (
            <Card 
              key={index} 
              className="w-[480px] bg-card/50 backdrop-blur cyber-border hover:cyber-glow-box transition-all duration-300 group"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" className="cyber-border text-primary text-base px-4 py-1">
                    Cantina
                  </Badge>
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  {judging.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground font-semibold text-lg">
                  {judging.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  {judging.tech}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Submissions:</span>
                    <span className="font-semibold">{judging.submissions}</span>
                  </div>
                </div>
                <a 
                  href={judging.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mt-4"
                >
                  View Details <ExternalLink className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContestResultsCarousel;
