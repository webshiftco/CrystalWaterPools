const items = [
  { text: "Custom Pool Design", emoji: "🏊" },
  { text: "Permit Management", emoji: "📋" },
  { text: "Excavation & Site Prep", emoji: "🚜" },
  { text: "Steel & Plumbing", emoji: "🔧" },
  { text: "Shotcrete & Tile", emoji: "🧱" },
  { text: "Decking & Hardscape", emoji: "🪵" },
  { text: "Salt Systems Included", emoji: "🧂" },
  { text: "20+ Years in Atlanta", emoji: "🌟" },
];

export const Marquee = () => {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border bg-accent py-4">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-xl font-semibold text-accent-foreground">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="flex items-center gap-3">
              <span aria-hidden>{t.emoji}</span>
              {t.text}
            </span>
            <span className="text-accent-foreground/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
