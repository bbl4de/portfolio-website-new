import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import cantinaLogo from "@/assets/logos/cantina-logo.png";
import sherlockLogo from "@/assets/logos/sherlock-logo.png";
import githubLogo from "@/assets/logos/github-logo.png";
import xLogo from "@/assets/logos/x-logo.png";

interface Profile {
  name: string;
  platform: string;
  description: string;
  url: string;
  stats: string;
  rank?: string;
  logo: string;
  isPrimary?: boolean;
}

const profiles: Profile[] = [
  {
    name: "Cantina",
    platform: "Audit Platform",
    description: "Smart contract security competitions",
    url: "https://cantina.xyz/u/bbl4de",
    stats: "Fellowship 2024",
    rank: "#89 • 97 reputation",
    logo: cantinaLogo,
    isPrimary: true
  },
  {
    name: "Sherlock",
    platform: "Audit Platform",
    description: "DeFi security audits and contests",
    url: "https://audits.sherlock.xyz/watson/bbl4de",
    stats: "Multiple top 10 finishes",
    rank: "#241 All Time",
    logo: sherlockLogo,
    isPrimary: true
  },
  {
    name: "GitHub",
    platform: "Code Repository",
    description: "Security tools and research",
    url: "https://github.com/bbl4de",
    stats: "Open source contributions",
    rank: undefined,
    logo: githubLogo
  },
  {
    name: "Twitter/X",
    platform: "Social Media",
    description: "Security updates and research",
    url: "https://x.com/bbl4de_xyz",
    stats: "@bbl4de_xyz",
    rank: undefined,
    logo: xLogo
  }
];

const ProfileLinks = () => {
  return (
    <section id="profiles" className="relative py-20 px-4 overflow-hidden bg-gradient-to-t from-background via-secondary/8 to-primary/5">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-glow">
            Platform Profiles
          </h2>
          <p className="text-muted-foreground text-lg">
            Connect with me across various security platforms
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto auto-rows-fr">
          {/* Cantina - Large Featured Card */}
          <Card 
            className="md:col-span-2 md:row-span-2 bg-card/50 backdrop-blur cyber-border hover:cyber-glow-box transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute top-6 right-6 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity">
              <img src={profiles[0].logo} alt={profiles[0].name} className="w-full h-full object-contain" />
            </div>
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg bg-background/50 p-3 flex items-center justify-center border border-primary/20">
                  <img src={profiles[0].logo} alt={profiles[0].name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {profiles[0].name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {profiles[0].platform}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base text-muted-foreground">
                {profiles[0].description}
              </p>
              <div className="space-y-2">
                <p className="text-sm text-primary font-semibold">
                  {profiles[0].stats}
                </p>
                <p className="text-sm text-muted-foreground">
                  {profiles[0].rank}
                </p>
              </div>
              <Button 
                variant="outline" 
                className="w-full cyber-border group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                asChild
              >
                <a href={profiles[0].url} target="_blank" rel="noopener noreferrer">
                  Visit Profile <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Sherlock - Large Featured Card */}
          <Card 
            className="md:col-span-2 md:row-span-2 bg-card/50 backdrop-blur cyber-border hover:cyber-glow-box transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute top-6 right-6 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity">
              <img src={profiles[1].logo} alt={profiles[1].name} className="w-full h-full object-contain" />
            </div>
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg bg-background/50 p-3 flex items-center justify-center border border-primary/20">
                  <img src={profiles[1].logo} alt={profiles[1].name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {profiles[1].name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {profiles[1].platform}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base text-muted-foreground">
                {profiles[1].description}
              </p>
              <div className="space-y-2">
                <p className="text-sm text-primary font-semibold">
                  {profiles[1].stats}
                </p>
                <p className="text-sm text-muted-foreground">
                  {profiles[1].rank}
                </p>
              </div>
              <Button 
                variant="outline" 
                className="w-full cyber-border group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                asChild
              >
                <a href={profiles[1].url} target="_blank" rel="noopener noreferrer">
                  Visit Profile <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* GitHub - Compact Card */}
          <Card 
            className="md:col-span-2 bg-card/50 backdrop-blur cyber-border hover:cyber-glow-box transition-all duration-300 group relative overflow-hidden"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-background/50 p-2.5 flex items-center justify-center border border-primary/20">
                  <img src={profiles[2].logo} alt={profiles[2].name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {profiles[2].name}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {profiles[2].platform}
                  </CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-primary/10"
                  asChild
                >
                  <a href={profiles[2].url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {profiles[2].description}
              </p>
              <p className="text-xs text-primary font-semibold">
                {profiles[2].stats}
              </p>
            </CardContent>
          </Card>

          {/* Twitter/X - Compact Card */}
          <Card 
            className="md:col-span-2 bg-card/50 backdrop-blur cyber-border hover:cyber-glow-box transition-all duration-300 group relative overflow-hidden"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-background/50 p-2.5 flex items-center justify-center border border-primary/20">
                  <img src={profiles[3].logo} alt={profiles[3].name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {profiles[3].name}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {profiles[3].platform}
                  </CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-primary/10"
                  asChild
                >
                  <a href={profiles[3].url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {profiles[3].description}
              </p>
              <p className="text-xs text-primary font-semibold">
                {profiles[3].stats}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProfileLinks;
