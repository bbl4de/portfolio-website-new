import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface ProcessStep {
  title: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  {
    title: "Determining the Scope / Entry Call",
    description: "Initial consultation to understand your protocol, define audit scope, and establish timelines"
  },
  {
    title: "Manual Review with Real-Time Comms",
    description: "Deep dive security analysis with continuous communication channels for questions and updates"
  },
  {
    title: "Draft Report",
    description: "Comprehensive findings document with severity classifications and detailed vulnerability analysis"
  },
  {
    title: "Fix Review",
    description: "Verification of implemented fixes and validation that vulnerabilities are properly addressed"
  },
  {
    title: "Final Report & Future Engagements",
    description: "Delivery of final audit report and discussion of ongoing security partnership opportunities"
  }
];

const AuditProcess = () => {
  return (
    <section id="process" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 cyber-glow">
            Audit Process
          </h2>
          <p className="text-muted-foreground text-lg">
            A streamlined security audit cycle designed for efficiency and thoroughness
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary opacity-30" />
            
            {/* Process steps */}
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <Card 
                  key={index}
                  className="relative ml-20 bg-card/50 backdrop-blur cyber-border hover:cyber-glow-box transition-all duration-300 group"
                >
                  {/* Step number circle */}
                  <div className="absolute -left-[4.5rem] top-6 w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center cyber-glow-box">
                    <span className="text-2xl font-bold text-primary">{index + 1}</span>
                  </div>
                  
                  {/* Check icon */}
                  <div className="absolute -left-20 top-8 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>

                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block p-6 rounded-lg bg-card/50 backdrop-blur cyber-border">
              <p className="text-lg text-muted-foreground">
                <span className="text-primary font-bold cyber-glow">Average Timeline:</span> 2-4 weeks depending on scope complexity
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuditProcess;
