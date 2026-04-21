import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/cwp/Navbar";
import { Footer } from "@/components/cwp/Footer";

const galleryImages = Object.entries(
  import.meta.glob("../assets/cwp/gallery/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
    query: "?url",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src], index) => ({
    src: src as string,
    alt: `Crystal Water Pools gallery project photo ${index + 1}`,
  }));

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
      { property: "og:image", content: galleryImages[0]?.src },
      { name: "twitter:image", content: galleryImages[0]?.src },
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