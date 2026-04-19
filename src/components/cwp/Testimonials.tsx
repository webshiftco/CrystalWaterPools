import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "Gary S",
    text:
      "Wonderful experience with Crystal Water Pools from design and quoting all the way through completion. I would not hesitate to recommend them for your pool or rock project! Thank you guys for a job well done!!",
  },
  {
    name: "Jo Ann Hall",
    text:
      "They created a beautiful backyard escape for my entire family to enjoy. From the planning to permitting to final completion, they were on schedule, within budget, and helpful in decisions I wasn't aware I'd need to make. Little details like an umbrella holder in the tanning ledge and jets to create a fountain effect added so much atmosphere. An outdoor fireplace, rock landscape walls, and stone paver decking made it usable through our warm southern winters — truly a dream come true.",
  },
  {
    name: "Argelia Gonzalez",
    text:
      "Jonathan and the whole crew are amazing — they finished this beautiful pool in just a few months. The stone workers are true artists; they chisel every stone to perfection, and the tile workers are just as great. I enjoyed this project very much, from the tree removal and digging of the pool, to the last flower they planted.",
  },
];

export const Testimonials = () => {
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1) % reviews.length);
  const prev = () => setI((p) => (p - 1 + reviews.length) % reviews.length);

  return (
    <section id="reviews" className="relative overflow-hidden py-24 md:py-32 bg-background">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-accent/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
            Client Testimonials
          </span>
          <h2 className="mt-5 font-display text-4xl tracking-tight md:text-6xl">
            What our <span className="text-gradient-sunset">clients say.</span>
          </h2>
        </div>

        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="rounded-3xl bg-card border border-border shadow-pool p-8 md:p-12 relative">
            <Quote className="absolute -top-6 left-8 h-14 w-14 text-accent fill-accent" aria-hidden="true" />

            <div className="min-h-[240px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex gap-1 mb-4">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Star key={s} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="font-display text-xl md:text-2xl leading-relaxed text-foreground">
                    "{reviews[i].text}"
                  </p>
                  <footer className="mt-6 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full gradient-sunset flex items-center justify-center text-accent-foreground font-bold">
                      {reviews[i].name.charAt(0)}
                    </div>
                    <cite className="not-italic font-semibold text-foreground">
                      {reviews[i].name}
                    </cite>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Show review ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx === i ? "w-10 bg-accent" : "w-5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous"
                className="rounded-full border border-border p-3 transition hover:bg-secondary"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="rounded-full border border-border p-3 transition hover:bg-secondary"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
