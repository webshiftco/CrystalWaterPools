import { useState } from "react";
import { Helmet } from "react-helmet-async";
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

export default function Gallery() {
  const [expandedImage, setExpandedImage] = useState<(typeof galleryImages)[number] | null>(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Pool Gallery — Crystal Water Pools</title>
        <meta
          name="description"
          content="Browse Crystal Water Pools project photos, custom backyard pools, renovations, patios, and finished pool designs."
        />
        <meta property="og:title" content="Pool Gallery — Crystal Water Pools" />
        <meta
          property="og:description"
          content="See custom pool projects and backyard transformations from Crystal Water Pools."
        />
        {galleryImages[0]?.src ? <meta property="og:image" content={galleryImages[0].src} /> : null}
      </Helmet>
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
              className={`group relative overflow-hidden rounded-xl bg-card shadow-soft ${index % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <button
                type="button"
                onClick={() => setExpandedImage(image)}
                className="block h-full w-full cursor-zoom-in text-left"
                aria-label={`Expand ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={index < 4 ? "eager" : "lazy"}
                  className="h-full min-h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:min-h-64"
                />
              </button>
              <button
                type="button"
                onClick={() => setExpandedImage(image)}
                className="absolute bottom-3 right-3 rounded-full bg-background/85 px-3 py-2 text-xs font-bold uppercase tracking-wide text-foreground shadow-soft backdrop-blur transition-opacity md:opacity-0 md:group-hover:opacity-100"
                aria-label={`Zoom ${image.alt}`}
              >
                Zoom
              </button>
            </figure>
          ))}
        </div>
      </section>
      {expandedImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded gallery image"
          onClick={() => setExpandedImage(null)}
        >
          <button
            type="button"
            onClick={() => setExpandedImage(null)}
            className="absolute right-4 top-4 rounded-full bg-card px-4 py-2 text-sm font-bold text-card-foreground shadow-soft"
            aria-label="Close expanded image"
          >
            Close
          </button>
          <img
            src={expandedImage.src}
            alt={expandedImage.alt}
            className="max-h-[86vh] max-w-full rounded-xl object-contain shadow-soft"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
      <Footer />
    </main>
  );
}
