import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import slide1 from "@/assets/cwp/slide1.jpg";
import slide2 from "@/assets/cwp/slide2.jpg";
import slide3 from "@/assets/cwp/slide3.jpg";

const slides = [
  {
    image: slide1,
    eyebrow: "Atlanta Locals Since 2001",
    title: "Custom backyard pools,\ncrafted with precision.",
  },
  {
    image: slide2,
    eyebrow: "Atlanta Locals Since 2001",
    title: "Two decades of\ndistinguished craftsmanship.",
  },
  {
    image: slide3,
    eyebrow: "Atlanta Locals Since 2001",
    title: "Refined design.\nLasting quality.",
  },
];

export const Hero = () => {
  const [i, setI] = useState(0);

  // Preload all hero images so transitions don't decode mid-flight
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Slideshow — all images layered, only opacity transitions */}
      <div className="absolute inset-0">
        {slides.map((s, idx) => (
          <div
            key={s.image}
            className="absolute inset-0 transition-opacity duration-1000 ease-out"
            style={{ opacity: idx === i ? 1 : 0, willChange: "opacity" }}
            aria-hidden={idx !== i}
          >
            <img
              src={s.image}
              alt="Custom backyard pool by Crystal Water Pools"
              className="h-full w-full object-cover"
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={idx === 0 ? "high" : "low"}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-[image:var(--gradient-hero-overlay)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container flex min-h-[100svh] flex-col justify-end pb-32 pt-24 md:justify-center md:pb-0 md:pt-28">
        <motion.div
          key={`text-${i}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl text-white"
        >
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-md">
            {slides[i].eyebrow}
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight md:text-7xl whitespace-pre-line drop-shadow-lg">
            {slides[i].title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/90 drop-shadow">
            Crystal Water Pools designs and builds custom inground pools across
            the greater Atlanta area, managing every stage from initial concept
            through final inspection.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full gradient-sunset text-accent-foreground hover:opacity-90 shadow-glow font-semibold text-base h-12 px-7"
            >
              <a href="#contact">
                Request a Free Estimate
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full bg-white/15 border-white/40 text-white hover:bg-white/25 hover:text-white backdrop-blur-md font-semibold text-base h-12 px-7"
            >
              <a href="#services">View Our Services</a>
            </Button>
          </div>

          {/* Trust strip */}
          <div className="mt-10 flex flex-wrap items-center gap-6 text-white/90">
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((s) => (
                <Star key={s} className="h-4 w-4 fill-accent text-accent" />
              ))}
              <span className="ml-2 text-sm font-medium">
                5.0 from local homeowners
              </span>
            </div>
            <div className="text-sm">
              <span className="font-display text-2xl font-semibold text-accent">
                20+
              </span>{" "}
              years serving the Atlanta area
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

      {/* Decorative animated waves */}
      <div className="pointer-events-none absolute -bottom-[2px] left-0 z-10 w-full overflow-hidden text-accent" aria-hidden>
        {/* Back wave — slower, slightly transparent for depth */}
        <svg
          viewBox="0 0 4320 60"
          className="block h-[40px] md:h-[60px] w-[600%] sm:w-[400%] md:w-[300%] opacity-60 animate-wave-slower"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 L0,32 Q90,2 180,32 T360,32 T540,32 T720,32 T900,32 T1080,32 T1260,32 T1440,32 T1620,32 T1800,32 T1980,32 T2160,32 T2340,32 T2520,32 T2700,32 T2880,32 T3060,32 T3240,32 T3420,32 T3600,32 T3780,32 T3960,32 T4140,32 T4320,32 L4320,60 Z"
            fill="currentColor"
          />
        </svg>
        {/* Front wave */}
        <svg
          viewBox="0 0 4320 60"
          className="-mt-[40px] md:-mt-[60px] block h-[40px] md:h-[60px] w-[600%] sm:w-[400%] md:w-[300%] animate-wave-slow"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 L0,30 Q60,0 120,30 T240,30 T360,30 T480,30 T600,30 T720,30 T840,30 T960,30 T1080,30 T1200,30 T1320,30 T1440,30 T1560,30 T1680,30 T1800,30 T1920,30 T2040,30 T2160,30 T2280,30 T2400,30 T2520,30 T2640,30 T2760,30 T2880,30 T3000,30 T3120,30 T3240,30 T3360,30 T3480,30 T3600,30 T3720,30 T3840,30 T3960,30 T4080,30 T4200,30 T4320,30 L4320,60 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};
