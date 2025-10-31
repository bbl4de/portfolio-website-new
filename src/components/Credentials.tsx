import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, Shield } from "lucide-react";

interface Credential {
  title: string;
  issuer: string;
  date: string;
  type: "bootcamp" | "certification" | "achievement";
  description: string;
}

const credentials: Credential[] = [
  {
    title: "Smart Contract Security Bootcamp",
    issuer: "Secureum",
    date: "2023",
    type: "bootcamp",
    description: "Intensive 8-week program covering Solidity security, DeFi protocols, and audit methodologies"
  },
  {
    title: "Certified Blockchain Security Professional",
    issuer: "Blockchain Council",
    date: "2023",
    type: "certification",
    description: "Advanced certification in blockchain security and smart contract auditing"
  },
  {
    title: "OpenZeppelin Security Course",
    issuer: "OpenZeppelin",
    date: "2024",
    type: "bootcamp",
    description: "Comprehensive training in smart contract security patterns and best practices"
  },
  {
    title: "Web3 Security Expert",
    issuer: "Cyfrin Updraft",
    date: "2024",
    type: "certification",
    description: "Advanced security research and vulnerability assessment certification"
  }
];

const getIcon = (type: string) => {
  switch (type) {
    case "bootcamp":
      return <BookOpen className="h-6 w-6 text-primary" />;
    case "certification":
      return <Award className="h-6 w-6 text-secondary" />;
    default:
      return <Shield className="h-6 w-6 text-primary" />;
  }
};

const Credentials = () => {
  return (
    <section id="credentials" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-glow">
            Credentials & Training
          </h2>
          <p className="text-muted-foreground text-lg">
            Professional certifications and specialized bootcamps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {credentials.map((credential, index) => (
            <Card 
              key={index}
              className="bg-card/50 backdrop-blur cyber-border hover:cyber-glow-box transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getIcon(credential.type)}
                    <Badge variant="outline" className="cyber-border">
                      {credential.type}
                    </Badge>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {credential.date}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {credential.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
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
