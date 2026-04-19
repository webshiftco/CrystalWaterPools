import { motion } from "framer-motion";
import { Droplets, Sparkles, Clock, ShieldCheck } from "lucide-react";

const items = [
  { icon: Droplets, title: "Designs you'll love", desc: "A bright gallery of styles to make your own.", color: "bg-mint" },
  { icon: Sparkles, title: "Hassle-free", desc: "We handle every detail. You handle the floaties.", color: "bg-sand" },
  { icon: Clock, title: "On time, every time", desc: "We honor our schedule and your summer.", color: "bg-accent/40" },
  { icon: ShieldCheck, title: "Trusted by neighbors", desc: "Hundreds of happy backyards across Atlanta.", color: "bg-coral/30" },
];

export const WhyUs = () => {
  return (
    <section id="why" className="relative overflow-hidden py-24 md:py-32 gradient-cream">
      {/* Floating pool toys */}
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-60">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl animate-float-slow" />
        <div className="absolute -right-10 bottom-20 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-[15%] top-10 text-7xl animate-wiggle opacity-60">🦩</div>
        <div className="absolute left-[10%] bottom-20 text-6xl animate-float-slow opacity-50">🌴</div>
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-coral/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
            ✨ Why Crystal Water
          </span>
          <h2 className="mt-5 font-display text-4xl tracking-tight md:text-6xl">
            Built with{" "}
            <span className="text-gradient-lagoon">sunshine</span>{" "}
            and care.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            We've spent two decades making summers a little more fun for Atlanta families.
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
