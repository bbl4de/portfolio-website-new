import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Gavel, Shield, Trophy } from "lucide-react";

interface Credential {
  title: string;
  issuer: string;
  date: string;
  type: "achievement" | "judging" | "certification";
  description: string;
  icon?: "award" | "gavel" | "shield" | "trophy";
}

const credentials: Credential[] = [
  {
    title: "Cantina Fellowship 2024",
    issuer: "Cantina",
    date: "2024",
    type: "achievement",
    description: "Selected for elite fellowship program recognizing top security researchers in the Web3 ecosystem",
    icon: "trophy"
  },
  {
    title: "100% Reputation Score",
    issuer: "Cantina",
    date: "Current",
    type: "achievement",
    description: "Perfect reputation score on Cantina demonstrating consistent quality and reliability in security research",
    icon: "award"
  },
  {
    title: "Cantina Resident",
    issuer: "Cantina",
    date: "Current",
    type: "achievement",
    description: "Recognized resident status for outstanding contributions to the platform and security community",
    icon: "shield"
  },
  {
    title: "Judge - Gamma Strategies",
    issuer: "Cantina",
    date: "2024",
    type: "judging",
    description: "Selected to judge Uniswap V4 limit & scale orders audit competition, evaluating security findings and their validity",
    icon: "gavel"
  },
  {
    title: "Judge - Kuru DEX",
    issuer: "Cantina",
    date: "2024",
    type: "judging",
    description: "Judging role for DEX on Monad (CLOB) audit, responsible for validating and triaging security submissions",
    icon: "gavel"
  },
  {
    title: "Expertise: Solidity & EVM",
    issuer: "Self-certified",
    date: "2+ years",
    type: "certification",
    description: "Significant DeFi experience with dozens of audits covering lending, bridges, staking, DEXes, and yield farming protocols",
    icon: "shield"
  },
  {
    title: "Expertise: Rust & Go",
    issuer: "Self-certified",
    date: "2+ years",
    type: "certification",
    description: "Infrastructure audits including L1s, L2 components (Optimism), and Ethereum Pectra hardfork implementations",
    icon: "shield"
  }
];

const getIcon = (icon?: string) => {
  switch (icon) {
    case "trophy":
      return <Trophy className="h-6 w-6 text-primary" />;
    case "gavel":
      return <Gavel className="h-6 w-6 text-secondary" />;
    case "shield":
      return <Shield className="h-6 w-6 text-primary" />;
    case "award":
    default:
      return <Award className="h-6 w-6 text-secondary" />;
  }
};

const Credentials = () => {
  return (
    <section id="credentials" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-glow">
            Achievements & Expertise
          </h2>
          <p className="text-muted-foreground text-lg">
            Recognized credentials, judging roles, and specialized expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {credentials.map((credential, index) => (
            <Card 
              key={index}
              className="bg-card/50 backdrop-blur cyber-border hover:cyber-glow-box transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getIcon(credential.icon)}
                    <Badge variant="outline" className="cyber-border text-xs">
                      {credential.type}
                    </Badge>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {credential.date}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {credential.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  {credential.issuer}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {credential.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Credentials;
