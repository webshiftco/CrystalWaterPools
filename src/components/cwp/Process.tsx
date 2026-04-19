import { motion } from "framer-motion";
import { MessageSquare, HardHat, PartyPopper } from "lucide-react";

const steps = [
  { n: "01", icon: MessageSquare, title: "Tell us your dream", desc: "Share your idea — we'll send a free estimate." },
  { n: "02", icon: HardHat, title: "Plan it together", desc: "Our certified tech walks the site with you." },
  { n: "03", icon: PartyPopper, title: "Cannonball time!", desc: "Your backyard paradise comes to life." },
];

export const Process = () => {
  return (
    <section id="process" className="py-24 md:py-32 gradient-lagoon text-primary-foreground relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute right-1/4 top-10 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
            🌞 How it works
          </span>
          <h2 className="mt-5 font-display text-4xl tracking-tight md:text-6xl drop-shadow">
            Three steps to a happier summer.
          </h2>
          <p className="mt-5 text-lg text-white/85">
            Looking for builders who'll turn your backyard into a private paradise?
            You just found them.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-8 hover:bg-white/15 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl gradient-sunset text-accent-foreground shadow-glow">
                  <s.icon className="h-7 w-7" />
                </div>
                <span className="font-display text-6xl font-bold text-white/20">{s.n}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-white/85">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
