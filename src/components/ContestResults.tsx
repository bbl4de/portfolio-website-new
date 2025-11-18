import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface Contest {
  platform: string;
  contest: string;
  rank: string;
  findings: string;
  url: string;
  tech: string;
}

const contests: Contest[] = [
  {
    platform: "Sherlock",
    contest: "Mach Finance",
    rank: "1st Place 🥇",
    findings: "1 Medium",
    url: "https://audits.sherlock.xyz/contests/727/leaderboard",
    tech: "Solidity • Lending on SONIC"
  },
  {
    platform: "Cantina",
    contest: "Infinifi Protocol",
    rank: "3rd Place 🥉",
    findings: "1 High, 4 Medium",
    url: "https://cantina.xyz/competitions/2ac7f906-1661-47eb-bfd6-519f5db0d36b/leaderboard",
    tech: "Solidity • Yield farming"
  },
  {
    platform: "Cantina",
    contest: "Story Network",
    rank: "11th Place",
    findings: "1 High, 1 Medium",
    url: "https://cantina.xyz/competitions/0561defa-eeb2-4a74-8884-5d7a873afa58/leaderboard",
    tech: "Go + Solidity • L1 for IP"
  },
  {
    platform: "Cantina",
    contest: "Collar Core (Votre)",
    rank: "5th Place",
    findings: "1 Medium",
    url: "https://cantina.xyz/competitions/050711ca-a6d1-4fdd-9f94-3816233c1bd5/leaderboard",
    tech: "Solidity • Liquidation-free lending"
  },
  {
    platform: "Sherlock",
    contest: "Beraborrow",
    rank: "7th Place",
    findings: "Private",
    url: "https://audits.sherlock.xyz/contests/741/leaderboard",
    tech: "Solidity • Lending on Berachain"
  },
  {
    platform: "Sherlock",
    contest: "Allora v0.8.0",
    rank: "11th Place",
    findings: "Private",
    url: "https://audits.sherlock.xyz/contests/728/leaderboard",
    tech: "Go • CosmosSDK L1"
  },
  {
    platform: "Sherlock",
    contest: "Debita Finance V3",
    rank: "6th Place",
    findings: "2 High, 7 Medium",
    url: "https://audits.sherlock.xyz/contests/627/leaderboard",
    tech: "Solidity • Lending + NFT marketplace"
  },
  {
    platform: "Cantina",
    contest: "Citrea",
    rank: "20th Place",
    findings: "2 Low",
    url: "https://cantina.xyz/competitions/49b9e08d-4f8f-4103-b6e5-f5f43cf9faa1/leaderboard",
    tech: "Rust + Solidity • Bitcoin L2"
  }
];

const ContestResults = () => {
  return (
    <section id="results" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-glow">
            Contest Results
          </h2>
          <p className="text-muted-foreground text-lg">
            Public audit competitions
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="cyber-border text-primary">15 High</Badge>
              <span className="text-muted-foreground">severity findings</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="cyber-border text-secondary">23 Medium</Badge>
              <span className="text-muted-foreground">severity findings</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {contests.map((contest, index) => (
            <Card 
              key={index} 
              className="bg-card/50 backdrop-blur cyber-border hover:cyber-glow-box transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
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
    </section>
  );
};

export default ContestResults;
