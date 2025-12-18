import { useEffect } from "react";
import { MessageSquare, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const TELEGRAM_URL = "https://t.me/bbl4de";

const TelegramRedirect = () => {
  useEffect(() => {
    // Small delay lets analytics fire before leaving the site.
    const timer = setTimeout(() => {
      window.location.replace(TELEGRAM_URL);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">Redirecting to Telegram</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Taking you to bbl4de on Telegram. If nothing happens, tap the button below.
        </p>
        <div className="flex justify-center">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Open Telegram
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TelegramRedirect;
