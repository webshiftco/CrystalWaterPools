import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Request received! 🌞", {
        description: "Thanks! We'll be in touch shortly to schedule your free estimate.",
      });
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute -left-20 bottom-10 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="container relative grid gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground">
            Request an Estimate
          </span>
          <h2 className="mt-5 font-display text-4xl tracking-tight md:text-6xl">
            Free, professional,{" "}
            <span className="text-gradient-sunset">and fair.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-md">
            Most estimates require an in-person site visit. Share a few
            details about your project and our team will be in touch.
          </p>

          <ul className="mt-10 space-y-5">
            <li className="flex items-start gap-4">
              <span className="mt-1 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-mint text-foreground">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-foreground">Visit Us</p>
                <p className="text-muted-foreground">
                  1255 Peachtree Pkwy STE 4203, Cumming, GA 30041
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-1 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/40 text-foreground">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-foreground">Call Us</p>
                <a href="tel:4702815693" className="text-muted-foreground hover:text-primary text-lg font-medium">
                  470.281.5693
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-1 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-coral/30 text-foreground">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-foreground">Email Us</p>
                <a
                  href="mailto:crystalwaterpoolsinga@gmail.com"
                  className="text-muted-foreground hover:text-primary break-all"
                >
                  crystalwaterpoolsinga@gmail.com
                </a>
              </div>
            </li>
          </ul>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-3xl bg-card p-8 md:p-10 shadow-pool border border-border"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Your name *</Label>
              <Input id="name" required className="mt-2 rounded-xl h-11" placeholder="Sunny Smith" />
            </div>
            <div>
              <Label htmlFor="zip">Zip code *</Label>
              <Input id="zip" required className="mt-2 rounded-xl h-11" placeholder="30041" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="address">Address *</Label>
              <Input id="address" required className="mt-2 rounded-xl h-11" placeholder="123 Backyard Lane" />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" required className="mt-2 rounded-xl h-11" placeholder="you@summer.com" />
            </div>
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" type="tel" required className="mt-2 rounded-xl h-11" placeholder="(470) 555-0123" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="message">Tell us about your dream pool *</Label>
              <Textarea id="message" rows={4} required className="mt-2 rounded-xl" placeholder="I'm imagining a tropical oasis with..." />
            </div>
          </div>
          <Button
            type="submit"
            size="lg"
            className="mt-7 w-full rounded-full gradient-sunset text-accent-foreground hover:opacity-90 shadow-glow font-semibold h-12 text-base"
            disabled={submitting}
          >
            {submitting ? (
              "Sending sunshine..."
            ) : (
              <>
                <Sun className="mr-2 h-5 w-5" />
                Send My Request
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};
