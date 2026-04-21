import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/cwp/Navbar";
import { Footer } from "@/components/cwp/Footer";
import s1 from "@/assets/cwp/s1.jpg";
import s5 from "@/assets/cwp/s5.jpg";
import s11 from "@/assets/cwp/s11.jpg";
import s12 from "@/assets/cwp/s12.jpg";
import s13 from "@/assets/cwp/s13.jpg";
import s14 from "@/assets/cwp/s14.jpg";
import src6 from "@/assets/cwp/src6.jpg";
import src7 from "@/assets/cwp/src7.jpg";
import src8 from "@/assets/cwp/src8.jpg";
import src9 from "@/assets/cwp/src9.jpg";
import src10 from "@/assets/cwp/src10.jpg";
import src12 from "@/assets/cwp/src12.jpg";
import src13 from "@/assets/cwp/src13.jpg";
import src14 from "@/assets/cwp/src14.jpg";

const galleryImages = [
  { src: s1, alt: "Custom backyard pool with bright blue water" },
  { src: s5, alt: "Residential swimming pool with stone patio" },
  { src: s11, alt: "Luxury backyard pool installation" },
  { src: s12, alt: "Poolside lounge area beside a custom pool" },
  { src: s13, alt: "Clear blue swimming pool with backyard landscaping" },
  { src: s14, alt: "Finished backyard pool by Crystal Water Pools" },
  { src: src6, alt: "Pool construction progress view" },
  { src: src7, alt: "Custom pool project with fresh water finish" },
  { src: src8, alt: "Backyard pool project detail" },
  { src: src9, alt: "Pool renovation and patio project" },
  { src: src10, alt: "Custom pool with surrounding deck" },
  { src: src12, alt: "Completed residential pool project" },
  { src: src13, alt: "Crystal Water Pools backyard installation" },
  { src: src14, alt: "Clean custom pool design for a family backyard" },
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Pool Gallery — Crystal Water Pools" },
      {
        name: "description",
        content: "Browse Crystal Water Pools project photos, custom backyard pools, renovations, patios, and finished pool designs.",
      },
      { property: "og:title", content: "Pool Gallery — Crystal Water Pools" },
      {
        property: "og:description",
        content: "See custom pool projects and backyard transformations from Crystal Water Pools.",
      },
      { property: "og:image", content: s1 },
      { name: "twitter:image", content: s1 },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="gradient-sky pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="container">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">Project Gallery</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Real pools, patios, and backyard escapes.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/75 md:text-lg">
            A closer look at Crystal Water Pools projects across Georgia, from new builds to refreshing outdoor upgrades.
          </p>
        </div>
      </section>
      <section className="py-10 md:py-16">
        <div className="container grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {galleryImages.map((image, index) => (
            <figure
              key={image.src}
              className={`overflow-hidden rounded-xl bg-card shadow-soft ${index % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading={index < 4 ? "eager" : "lazy"}
                className="h-full min-h-40 w-full object-cover transition-transform duration-500 hover:scale-105 md:min-h-64"
              />
            </figure>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}