import { SiX, SiGithub } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <SiX className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold">X Video Downloader</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Fast, free, and secure video downloads from X (Twitter). No registration required.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#downloader" className="hover:text-foreground transition-colors">
                  Download Video
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-foreground transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  DMCA
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md bg-muted flex items-center justify-center hover-elevate active-elevate-2 transition-all"
                data-testid="link-twitter"
              >
                <SiX className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md bg-muted flex items-center justify-center hover-elevate active-elevate-2 transition-all"
                data-testid="link-github"
              >
                <SiGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} X Video Downloader. All rights reserved.</p>
          <p className="mt-2">
            This tool is not affiliated with X Corp or Twitter, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
