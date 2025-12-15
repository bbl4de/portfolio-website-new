import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Mail, Twitter } from "lucide-react";
import WarpSpeedBackground from "./WarpSpeedBackground";


const ContactCTA = () => {
  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-transparent">
      <WarpSpeedBackground />
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/80 backdrop-blur-md border border-primary/20 shadow-2xl rounded-2xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl md:text-5xl font-bold mb-4 cyber-glow">
                Need a Security Audit?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-muted-foreground text-base md:text-lg">
                  Available for private audits, PR reviews and long-term collaborations
                </p>
              </div>
              
              <div className="flex justify-center items-center py-12">
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 cyber-glow-box h-12 md:h-16 px-6 md:px-10 text-lg md:text-2xl font-bold rounded-xl w-3/4 md:w-auto"
                  asChild
                >
                  <a href="https://t.me/bbl4de" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="mr-3 h-8 w-8" />
                    Book via Telegram
                  </a>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-6 items-center">
                <div className="text-center space-y-1 md:space-y-2">
                  <div className="text-base md:text-2xl font-bold text-primary whitespace-nowrap">
                    Response within 24h
                  </div>
                  <div className="text-[11px] md:text-sm text-muted-foreground">
                    365 days/year
                  </div>
                </div>
                <div className="text-center space-y-1 md:space-y-2">
                  <div className="text-base md:text-2xl font-bold text-primary">
                    NDA
                  </div>
                  <div className="text-[11px] md:text-sm text-muted-foreground">
                    Confidentiality Assured
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
