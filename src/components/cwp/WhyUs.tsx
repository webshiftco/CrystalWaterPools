import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Droplets, Sparkles, Clock, ShieldCheck } from "lucide-react";

const items = [
  { icon: Droplets, title: "Variety of Designs", desc: "An extensive portfolio of elegant pool styles to choose from.", color: "bg-mint" },
  { icon: Sparkles, title: "Hassle-Free Service", desc: "We manage every detail, from permits to final walkthrough.", color: "bg-sand" },
  { icon: Clock, title: "On Schedule", desc: "We honor our timelines and deliver on what we promise.", color: "bg-accent/40" },
  { icon: ShieldCheck, title: "Trusted Reputation", desc: "Built on satisfied customers and consistent five-star reviews.", color: "bg-coral/30" },
];

export const WhyUs = () => {
  const isMobile = useIsMobile();
  return (
    <section id="why" className="relative overflow-hidden py-24 md:py-32 gradient-cream">
      {/* Floating pool toys */}
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-60">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl animate-float-slow" />
        <div className="absolute -right-10 bottom-20 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-coral/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
            Why Crystal Water Pools
          </span>
          <h2 className="mt-5 font-display text-4xl tracking-tight md:text-6xl">
            Crafted with care.{" "}
            <span className="text-gradient-lagoon">Built to last.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            For more than two decades, we have served Atlanta-area
            homeowners with quality construction and dependable service.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative rounded-3xl bg-card p-7 shadow-soft border border-border hover:-translate-y-2 hover:shadow-pool transition-all duration-500"
            >
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${it.color} text-foreground`}>
                <it.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{it.title}</h3>
              <p className="mt-2 text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
