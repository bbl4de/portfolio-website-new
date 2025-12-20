import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Send } from "lucide-react";

import WarpSpeedBackground from "@/components/WarpSpeedBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TELEGRAM_URL = "https://t.me/bbl4de";
const AUDIT_EMAIL = "bbl4de.xyz@gmail.com";

const AuditRequest = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    telegram: "",
    email: "",
    details: "",
  });

  const mailtoHref = useMemo(() => {
    const lines = [
      `Project Name: ${formData.projectName || "N/A"}`,
      `Telegram: ${formData.telegram || "N/A"}`,
      `Email: ${formData.email || "N/A"}`,
      "",
      `${formData.details || "Tell me a bit about your protocol, timelines, and scope."}`,
    ];

    const subject = "Audit Request";
    const body = lines.join("\n");

    return `mailto:${AUDIT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [formData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = mailtoHref;
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <WarpSpeedBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center text-lg md:text-xl text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          ← Home
        </Link>

        <Card className="max-w-3xl mx-auto bg-card/90 backdrop-blur border border-primary/20 shadow-2xl">
          <CardHeader className="text-center space-y-3">
            <CardTitle className="text-4xl md:text-5xl font-bold cyber-glow">Request an Audit</CardTitle>
          </CardHeader>

          <CardContent className="space-y-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="projectName">
                  Project Name <span className="text-muted-foreground text-sm">(Optional)</span>
                </Label>
                <Input
                  id="projectName"
                  placeholder="Your project name"
                  value={formData.projectName}
                  onChange={(event) => setFormData((prev) => ({ ...prev, projectName: event.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telegram">
                  Telegram <span className="text-muted-foreground text-sm">(Optional)</span>
                </Label>
                <Input
                  id="telegram"
                  placeholder="@yourusername"
                  value={formData.telegram}
                  onChange={(event) => setFormData((prev) => ({ ...prev, telegram: event.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-primary">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">
                  Project Details <span className="text-muted-foreground text-sm">(Optional)</span>
                </Label>
                <Textarea
                  id="details"
                  rows={4}
                  placeholder="Share scope, timelines, links, and anything else that helps me respond fast."
                  value={formData.details}
                  onChange={(event) => setFormData((prev) => ({ ...prev, details: event.target.value }))}
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 md:h-14 text-base md:text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 cyber-glow-box flex items-center justify-center gap-3"
              >
                <Send className="h-5 w-5" />
                Submit Audit Request
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground space-y-2">
              <p>Having trouble with the form?</p>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-primary hover:underline"
              >
                <MessageSquare className="h-4 w-4" />
                Contact me on Telegram
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuditRequest;
