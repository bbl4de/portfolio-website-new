import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface Profile {
  name: string;
  platform: string;
  description: string;
  url: string;
  stats?: string;
}

const profiles: Profile[] = [
  {
    name: "Code4rena",
    platform: "Audit Platform",
    description: "Smart contract security competitions",
    url: "https://code4rena.com/@bbl4de",
    stats: "15+ contests participated"
  },
  {
    name: "Sherlock",
    platform: "Audit Platform",
    description: "DeFi security audits and contests",
    url: "https://audits.sherlock.xyz/watson/bbl4de",
    stats: "Top 50 auditor"
  },
  {
    name: "Immunefi",
    platform: "Bug Bounty",
    description: "Web3 bug bounty platform",
    url: "https://immunefi.com/profile/bbl4de",
    stats: "Multiple critical findings"
  },
  {
    name: "GitHub",
    platform: "Code Repository",
    description: "Security tools and research",
    url: "https://github.com/bbl4de",
    stats: "Open source contributions"
  }
];

const ProfileLinks = () => {
  return (
    <section id="profiles" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-glow">
            Platform Profiles
          </h2>
          <p className="text-muted-foreground text-lg">
            Connect with me across various security platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {profiles.map((profile, index) => (
            <Card 
              key={index}
              className="bg-card/50 backdrop-blur cyber-border hover:cyber-glow-box transition-all duration-300 group"
            >
              <CardHeader>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {profile.name}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  {profile.platform}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {profile.description}
                </p>
                {profile.stats && (
                  <p className="text-xs text-primary font-semibold">
                    {profile.stats}
                  </p>
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full cyber-border group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                  asChild
                >
                  <a href={profile.url} target="_blank" rel="noopener noreferrer">
                    Visit Profile <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileLinks;
