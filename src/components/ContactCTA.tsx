import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Mail, Twitter } from "lucide-react";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import WarpSpeedBackground from "./WarpSpeedBackground";


const ContactCTA = () => {
  const [searchParams] = useSearchParams();

  const bookingHref = useMemo(() => {
    const preseed = searchParams.get("preseed");
    const campaign = searchParams.get("utm_campaign");

    const normalized = preseed?.toLowerCase();
    const normalizedCampaign = campaign?.toLowerCase();

    const isPreseed =
      normalized === "1" ||
      normalized === "true" ||
      normalized === "yes" ||
      normalized === "preseed" ||
      normalizedCampaign === "preseed";

    return isPreseed ? "/book-telegram-preseed" : "/book-telegram";
  }, [searchParams]);

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
                  className="bg-primary text-primary-foreground hover:bg-primary/90 cyber-glow-box h-12 md:h-16 px-5 md:px-10 text-base md:text-2xl font-bold rounded-xl w-3/4 md:w-auto"
                  asChild
                >
                  <a href={bookingHref} className="flex items-center justify-center gap-3">
                    <MessageSquare
                      className="!h-6 !w-6 md:!h-7 md:!w-7 flex-shrink-0"
                      strokeWidth={2}
                    />
                    <span className="leading-tight">Book via Telegram</span>
                  </a>
                </Button>
              </div>

              <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-6 items-center">
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
