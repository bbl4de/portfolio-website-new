import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Contest {
  platform: string;
  contest: string;
  rank: string;
  findings: string;
  earnings: string;
  severity: "Critical" | "High" | "Medium";
}

const contests: Contest[] = [
  {
    platform: "Code4rena",
    contest: "DeFi Protocol Audit",
    rank: "1st Place",
    findings: "3 High, 5 Medium",
    earnings: "$12,500",
    severity: "Critical"
  },
  {
    platform: "Sherlock",
    contest: "NFT Marketplace Security",
    rank: "2nd Place",
    findings: "2 Critical, 4 High",
    earnings: "$8,300",
    severity: "Critical"
  },
  {
    platform: "Immunefi",
    contest: "Bridge Protocol",
    rank: "Top 5",
    findings: "1 Critical, 3 High",
    earnings: "$15,000",
    severity: "Critical"
  },
  {
    platform: "Code4rena",
    contest: "Lending Protocol",
    rank: "3rd Place",
    findings: "4 High, 2 Medium",
    earnings: "$6,200",
    severity: "High"
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
            Public audit competitions and bug bounty achievements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
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
                  <Badge 
                    variant={contest.severity === "Critical" ? "destructive" : "secondary"}
                    className="group-hover:cyber-glow transition-all"
                  >
                    {contest.severity}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{contest.contest}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {contest.rank}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Findings:</span>
                    <span className="font-semibold">{contest.findings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Earnings:</span>
                    <span className="font-bold text-primary cyber-glow">{contest.earnings}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContestResults;
