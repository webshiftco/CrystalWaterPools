import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/cwp/logo.png";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-soft"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-3">
          <div className="rounded-full bg-primary px-4 py-2 shadow-soft ring-1 ring-white/30">
            <img src={logo} alt="Crystal Water Pools logo" className="h-9 w-auto brightness-0 invert" />
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                scrolled
                  ? "text-foreground/80 hover:text-primary hover:bg-secondary"
                  : "text-white/90 hover:text-white hover:bg-white/15 backdrop-blur"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:4702815693"
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
              scrolled ? "text-primary" : "text-white drop-shadow"
            }`}
          >
            <Phone className="h-4 w-4" />
            470.281.5693
          </a>
          <Button
            asChild
            size="sm"
            className="rounded-full gradient-sunset text-accent-foreground hover:opacity-90 shadow-glow font-semibold"
          >
            <a href="#contact">Free Estimate</a>
          </Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden p-2 rounded-full ${scrolled ? "text-foreground bg-secondary" : "text-white bg-white/15 backdrop-blur"}`}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="container py-4 flex flex-col gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-lg text-foreground/80 hover:text-primary hover:bg-secondary font-medium"
              >
                {l.label}
              </a>
            ))}
            <Button asChild className="rounded-full gradient-sunset text-accent-foreground mt-2">
              <a href="#contact" onClick={() => setOpen(false)}>Free Estimate</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
