import { Button } from "@/components/ui/button";
import { SiX } from "react-icons/si";
import { Download, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollToDownloader = () => {
    const element = document.getElementById("downloader");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <SiX className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">X Video Downloader</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={scrollToDownloader}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-features"
          >
            Features
          </button>
          <button
            onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-how-it-works"
          >
            How It Works
          </button>
          <button
            onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-faq"
          >
            FAQ
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            data-testid="button-theme-toggle"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button onClick={scrollToDownloader} className="hidden sm:flex" data-testid="button-download-now">
            <Download className="w-4 h-4 mr-2" />
            Download Now
          </Button>
        </div>
      </div>
    </header>
  );
}
