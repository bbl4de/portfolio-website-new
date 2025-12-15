import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageSquareText, FileText, Search, Handshake } from "lucide-react";

interface ProcessStep {
  title: string;
  icon: React.ElementType;
}

const processSteps: ProcessStep[] = [
  {
    title: "Determining the Scope / Entry Call",
    icon: Phone
  },
  {
    title: "Manual Review with Real-Time Communication",
    icon: MessageSquareText
  },
  {
    title: "Draft Report",
    icon: FileText
  },
  {
    title: "Fix Review",
    icon: Search
  },
  {
    title: "Final Report & Future Engagements",
    icon: Handshake
  }
];

const AuditProcess = () => {
  return (
    <section id="process" className="relative py-20 px-4 overflow-hidden bg-transparent">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 cyber-glow">
            Audit Process
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            A streamlined security audit cycle designed for efficiency and thoroughness
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 md:gap-6">
          {processSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card 
                key={index}
                className="relative bg-card/50 backdrop-blur cyber-border transition-all duration-300 group hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(234,88,12,0.4)] w-full max-w-xl"
              >
                <CardContent className="py-3 px-4 sm:px-6 flex items-center gap-3 sm:gap-4">
                  {/* Step number circle */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 aspect-square rounded-full bg-card border-2 border-primary flex-shrink-0 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(234,88,12,0.6)]">
                    <span className="text-lg sm:text-xl font-bold text-primary transition-colors duration-300 group-hover:text-white">{index + 1}</span>
                  </div>
                  
                  {/* Icon */}
                  <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
                  
                  {/* Title */}
                  <h3 className="text-sm sm:text-lg font-bold group-hover:text-primary transition-colors leading-snug">
                    {step.title}
                  </h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AuditProcess;
