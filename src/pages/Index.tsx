import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { Navbar } from "@/components/cwp/Navbar";
import { Hero } from "@/components/cwp/Hero";
import { Marquee } from "@/components/cwp/Marquee";
import { Services } from "@/components/cwp/Services";
import { WhyUs } from "@/components/cwp/WhyUs";
import { Process } from "@/components/cwp/Process";
import { Testimonials } from "@/components/cwp/Testimonials";
import { Contact } from "@/components/cwp/Contact";
import { Footer } from "@/components/cwp/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function Index() {
  const { hash } = useLocation();

  useDocumentMeta({
    title: "Crystal Water Pools — Sunny Backyard Paradise in Atlanta",
    description:
      "Custom-built backyard pools in Atlanta since 2001. Bright designs, hassle-free service, and 20+ years of happy summers.",
    ogTitle: "Crystal Water Pools — Sunny Backyard Paradise",
    ogDescription: "Bright, custom backyard pools across Atlanta. Free estimates, zero pressure.",
  });

  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <WhyUs />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
      <Toaster richColors position="top-center" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Crystal Water Pools",
            telephone: "+1-470-281-5693",
            email: "crystalwaterpoolsinga@gmail.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "1255 Peachtree Pkwy STE 4203",
              addressLocality: "Cumming",
              addressRegion: "GA",
              postalCode: "30041",
              addressCountry: "US",
            },
            url: "https://crystalwaterpoolsinga.com/",
            description:
              "Crystal Water Pools designs and builds custom backyard pools across the Atlanta area. Serving Georgia since 2001.",
          }),
        }}
      />
    </main>
  );
}
