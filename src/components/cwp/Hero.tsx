import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import slide1 from "@/assets/cwp/slide1.jpg";
import slide2 from "@/assets/cwp/slide2.jpg";
import slide3 from "@/assets/cwp/slide3.jpg";

const slides = [
  {
    image: slide1,
    eyebrow: "Atlanta Locals Since 2001",
    title: "Your backyard.\nYour beach club.",
  },
  {
    image: slide2,
    eyebrow: "Atlanta Locals Since 2001",
    title: "Two decades of\nsplashy good times.",
  },
  {
    image: slide3,
    eyebrow: "Atlanta Locals Since 2001",
    title: "Pools as bright\nas your weekends.",
  },
];

export const Hero = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Slideshow */}
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slides[i].image}
            alt="Custom backyard pool by Crystal Water Pools"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[image:var(--gradient-hero-overlay)]" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container flex min-h-[100svh] flex-col justify-end pb-32 md:justify-center md:pb-0 md:pt-28">
        <motion.div
          key={`text-${i}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="max-w-3xl text-white"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-accent" />
            {slides[i].eyebrow}
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1] tracking-tight md:text-8xl whitespace-pre-line drop-shadow-lg">
            {slides[i].title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/90 drop-shadow">
            We design and build joyfully custom pools across the Atlanta area —
            from the first sketch to the first cannonball. 🌴
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full gradient-sunset text-accent-foreground hover:opacity-90 shadow-glow font-semibold text-base h-12 px-7"
            >
              <a href="#contact">
                Get Your Free Estimate
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full bg-white/15 border-white/40 text-white hover:bg-white/25 hover:text-white backdrop-blur-md font-semibold text-base h-12 px-7"
            >
              <a href="#services">See the magic</a>
            </Button>
          </div>

          {/* Mini trust strip */}
          <div className="mt-10 flex flex-wrap items-center gap-6 text-white/90">
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((s) => (
                <Star key={s} className="h-4 w-4 fill-accent text-accent" />
              ))}
              <span className="ml-2 text-sm font-medium">5.0 from happy neighbors</span>
            </div>
            <div className="text-sm">
              <span className="font-display text-2xl font-semibold text-accent">20+</span>{" "}
              years splashin' in Atlanta
            </div>
          </div>
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:left-auto md:right-12 md:translate-x-0">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                idx === i ? "w-12 bg-accent" : "w-5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scalloped bottom — beach umbrella vibe */}
      <svg
        viewBox="0 0 1440 60"
        className="absolute -bottom-[1px] left-0 z-10 w-full text-background"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 L0,30 Q60,0 120,30 T240,30 T360,30 T480,30 T600,30 T720,30 T840,30 T960,30 T1080,30 T1200,30 T1320,30 T1440,30 L1440,60 Z"
          fill="currentColor"
        />
      </svg>
    </section>
  );
};
