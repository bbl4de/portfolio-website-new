import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Mail, Twitter } from "lucide-react";
import WarpSpeedBackground from "./WarpSpeedBackground";


const ContactCTA = () => {
  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-[#0a0806]">
      <WarpSpeedBackground />
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-4xl md:text-5xl font-bold mb-4 cyber-glow">
                Need a Security Audit?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-muted-foreground text-lg">
                  Available for private audits, PR reviews and mid-term collaborations
                </p>
              </div>
              
              <div className="flex justify-center items-center py-16">
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 cyber-glow-box h-20 px-12 text-2xl font-bold rounded-xl"
                  asChild
                >
                  <a href="https://t.me/bbl4de" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="mr-3 h-8 w-8" />
                    Book via Telegram
                  </a>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-primary mb-2">24-48h</div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-primary mb-2">NDA</div>
                  <div className="text-sm text-muted-foreground">Confidentiality Assured</div>
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
