import { motion } from "framer-motion";
import s1 from "@/assets/cwp/s1.jpg";
import s5 from "@/assets/cwp/s5.jpg";
import s11 from "@/assets/cwp/s11.jpg";
import s12 from "@/assets/cwp/s12.jpg";
import s13 from "@/assets/cwp/s13.jpg";
import s14 from "@/assets/cwp/s14.jpg";

const services = [
  { img: s1, title: "Permits, sorted", desc: "Boring paperwork? Ours. Backyard fun? Yours.", emoji: "📋" },
  { img: s5, title: "Pool Layout", desc: "We map the perfect spot for your splash zone.", emoji: "📐" },
  { img: s11, title: "Excavation", desc: "Carefully dug, dirt-free attitude included.", emoji: "🚜" },
  { img: s12, title: "Steel Reinforcing", desc: "Built rock-solid for decades of cannonballs.", emoji: "🧱" },
  { img: s13, title: "Pool Plumbing", desc: "Schedule 40 PVC for crystal-clear flow.", emoji: "🔧" },
  { img: s14, title: "Shotcrete & Tile", desc: "Pick from glossy ceramics, glass, natural stone.", emoji: "🎨" },
];

export const Services = () => {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="inline-block rounded-full bg-mint px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
            🌊 What we do
          </span>
          <h2 className="mt-5 font-display text-4xl tracking-tight md:text-6xl">
            From permit to{" "}
            <span className="text-gradient-sunset">first splash</span>{" "}
            — we've got it.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Every step handled with the kind of care that turns a backyard
            into your favorite vacation spot.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl bg-card shadow-soft border border-border hover:-translate-y-2 hover:shadow-pool transition-all duration-500"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-white text-2xl shadow-soft">
                    {s.emoji}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div className="p-7">
                <h3 className="font-display text-2xl font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
