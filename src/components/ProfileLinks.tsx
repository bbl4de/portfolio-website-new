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
    platform: "@bbl4de",
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
    <section id="profiles" className="relative py-20 px-4 overflow-hidden bg-transparent">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 cyber-glow">
            Platform Profiles
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Learn more about bbl4de
          </p>
        </div>

        {/* Four symmetrical cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {profiles.map((profile, index) => (
            <a 
              key={index}
              href={profile.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <Card 
                className="bg-card/50 backdrop-blur cyber-border hover:cyber-glow-box transition-all duration-300 group cursor-pointer h-full"
              >
                <CardHeader className="space-y-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-background/50 p-2 md:p-3 flex items-center justify-center border border-primary/20 mx-auto">
                    <img src={profile.logo} alt={profile.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="text-center">
                    <CardTitle className="text-lg md:text-xl group-hover:text-primary transition-colors">
                      {profile.name}
                    </CardTitle>
                    {profile.stats && (
                      <CardDescription className="text-xs md:text-sm mt-2 text-primary font-medium">
                        {profile.stats}
                      </CardDescription>
                    )}
                    {profile.platform && !profile.stats && (
                      <CardDescription className="text-xs md:text-sm mt-2">
                        {profile.platform}
                      </CardDescription>
                    )}
                  </div>
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileLinks;
