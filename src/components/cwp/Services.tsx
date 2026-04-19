import { motion } from "framer-motion";
import s1 from "@/assets/cwp/s1.jpg";
import s5 from "@/assets/cwp/s5.jpg";
import s11 from "@/assets/cwp/s11.jpg";
import s12 from "@/assets/cwp/s12.jpg";
import s13 from "@/assets/cwp/s13.jpg";
import s14 from "@/assets/cwp/s14.jpg";
import src12 from "@/assets/cwp/src12.jpg";
import src13 from "@/assets/cwp/src13.jpg";
import src14 from "@/assets/cwp/src14.jpg";
import src6 from "@/assets/cwp/src6.jpg";
import src7 from "@/assets/cwp/src7.jpg";
import src8 from "@/assets/cwp/src8.jpg";

const services = [
  { img: s1, title: "Permit Management", desc: "We manage all paperwork and approvals on your behalf." },
  { img: s5, title: "Pool Layout & Design", desc: "We plan placement, elevation, and finish details with you." },
  { img: s11, title: "Excavation", desc: "Our experienced crews prepare each site with precision." },
  { img: s12, title: "Steel Reinforcement", desc: "Reinforced throughout for a structure built to last." },
  { img: s13, title: "Plumbing & Filtration", desc: "Constructed with durable schedule 40 PVC throughout." },
  { img: s14, title: "Shotcrete Application", desc: "A structural shell sprayed and shaped for long-term durability." },
  { img: src12, title: "Tile & Coping", desc: "Precision-set tile and coping create a refined, finished edge." },
  { img: src13, title: "Equipment Installation", desc: "Pumps, filters, and heaters configured for efficient operation." },
  { img: src14, title: "Electrical Installation", desc: "All electrical components installed to current safety standards." },
  { img: src6, title: "Drainage Installation", desc: "Proper drainage protects the pool deck and surrounding landscape." },
  { img: src7, title: "Decking Construction", desc: "Custom decking built to complement the pool and your property." },
  { img: src8, title: "Plaster or Pebble Finish", desc: "Premium interior finishes applied for a smooth, lasting surface." },
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
            Construction Services
          </span>
          <h2 className="mt-5 font-display text-4xl tracking-tight md:text-6xl">
            From permit to{" "}
            <span className="text-gradient-sunset">final inspection</span>
            — we handle every step.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            We design and build pools tailored to your specifications,
            managing every stage of the construction process.
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
                  <span className="inline-flex items-center justify-center h-10 px-3 rounded-full bg-white text-xs font-bold uppercase tracking-wider text-foreground shadow-soft">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">
                    {String(i + 1).padStart(2, "0")} of 06
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
