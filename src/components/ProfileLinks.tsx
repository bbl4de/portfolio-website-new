import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    platform: "Public Audit Competitions",
    description: "",
    url: "https://cantina.xyz/u/bbl4de",
    stats: "Resident & Judge",
    rank: "#89th All time • 100 reputation",
    logo: cantinaLogo,
    isPrimary: true
  },
  {
    name: "Sherlock",
    platform: "Public Audit Competitions",
    description: "",
    url: "https://audits.sherlock.xyz/watson/bbl4de",
    stats: "",
    rank: undefined,
    logo: sherlockLogo,
    isPrimary: true
  },
  {
    name: "GitHub",
    platform: "",
    description: "",
    url: "https://github.com/bbl4de",
    stats: "",
    rank: undefined,
    logo: githubLogo
  },
  {
    name: "Twitter/X",
    platform: "@bbl4de_xyz",
    description: "",
    url: "https://x.com/bbl4de_xyz",
    stats: "",
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

        {/* New Layout: Cantina on top, three boxes below */}
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Cantina - Large Centered Featured Card */}
          <a 
            href={profiles[0].url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <Card 
              className="bg-card/50 backdrop-blur cyber-border hover:cyber-glow-box transition-all duration-300 group relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-6 right-6 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity">
                <img src={profiles[0].logo} alt={profiles[0].name} className="w-full h-full object-contain" />
              </div>
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 rounded-lg bg-background/50 p-4 flex items-center justify-center border border-primary/20">
                    <img src={profiles[0].logo} alt={profiles[0].name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl group-hover:text-primary transition-colors">
                      {profiles[0].name}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {profiles[0].platform}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <p className="text-lg text-primary font-semibold">
                    {profiles[0].stats}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {profiles[0].rank}
                  </p>
                  <div className="pt-2 space-y-1 text-sm text-muted-foreground">
                    <p>Gamma Strategies - Uniswap V4 limit & scale orders | 100+ submissions</p>
                    <p>Kuru-DEX on Monad (CLOB) | 1100+ submissions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>

          {/* Sherlock, GitHub, X - Three Equal Cards in a Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sherlock */}
            <a 
              href={profiles[1].url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <Card 
                className="bg-card/50 backdrop-blur cyber-border hover:cyber-glow-box transition-all duration-300 group cursor-pointer h-full"
              >
                <CardHeader className="space-y-4">
                  <div className="w-16 h-16 rounded-lg bg-background/50 p-3 flex items-center justify-center border border-primary/20 mx-auto">
                    <img src={profiles[1].logo} alt={profiles[1].name} className="w-full h-full object-contain" />
                  </div>
                  <div className="text-center">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {profiles[1].name}
                    </CardTitle>
                    <CardDescription className="text-sm mt-2">
                      {profiles[1].platform}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </a>

            {/* GitHub */}
            <a 
              href={profiles[2].url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <Card 
                className="bg-card/50 backdrop-blur cyber-border hover:cyber-glow-box transition-all duration-300 group cursor-pointer h-full"
              >
                <CardHeader className="space-y-4">
                  <div className="w-16 h-16 rounded-lg bg-background/50 p-3 flex items-center justify-center border border-primary/20 mx-auto">
                    <img src={profiles[2].logo} alt={profiles[2].name} className="w-full h-full object-contain" />
                  </div>
                  <div className="text-center">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {profiles[2].name}
                    </CardTitle>
                  </div>
                </CardHeader>
              </Card>
            </a>

            {/* Twitter/X */}
            <a 
              href={profiles[3].url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <Card 
                className="bg-card/50 backdrop-blur cyber-border hover:cyber-glow-box transition-all duration-300 group cursor-pointer h-full"
              >
                <CardHeader className="space-y-4">
                  <div className="w-16 h-16 rounded-lg bg-background/50 p-3 flex items-center justify-center border border-primary/20 mx-auto">
                    <img src={profiles[3].logo} alt={profiles[3].name} className="w-full h-full object-contain" />
                  </div>
                  <div className="text-center">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {profiles[3].name}
                    </CardTitle>
                    <CardDescription className="text-sm mt-2">
                      {profiles[3].platform}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileLinks;
