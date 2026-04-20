import logo from "@/assets/cwp/logo.png";
import { MapPin, Phone, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      <div className="container relative py-16 grid gap-10 md:grid-cols-3">
        <div>
          <div className="inline-block rounded-full bg-primary px-4 py-2 shadow-soft ring-1 ring-white/30">
            <img src={logo} alt="Crystal Water Pools" className="h-9 w-auto brightness-0 invert" />
          </div>
          <p className="mt-5 text-background/70 max-w-xs">
            Designing and building custom backyard pools across the
            greater Atlanta area since 2001.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-display text-lg text-accent">Visit</h4>
          <p className="flex items-start gap-3 text-background/80">
            <MapPin className="h-4 w-4 mt-1 shrink-0" />
            1255 Peachtree Pkwy STE 4203,<br />Cumming, GA 30041
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-display text-lg text-accent">Get in touch</h4>
          <a href="tel:4702815693" className="flex items-center gap-3 text-background/80 hover:text-accent transition">
            <Phone className="h-4 w-4" /> 470.281.5693
          </a>
          <a
            href="mailto:crystalwaterpoolsinga@gmail.com"
            className="flex items-center gap-3 text-background/80 hover:text-accent transition break-all"
          >
            <Mail className="h-4 w-4" />
            <span>crystalwaterpoolsinga@gmail.com</span>
          </a>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container py-6 text-sm text-background/60 flex flex-col sm:flex-row sm:justify-between gap-2 items-center">
          <p>© {new Date().getFullYear()} Crystal Water Pools. All Rights Reserved.</p>
          <p>Serving the greater Atlanta area since 2001.</p>
        </div>
      </div>
    </footer>
  );
};
