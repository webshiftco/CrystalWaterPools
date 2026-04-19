const items = [
  "🌞 Sunny days",
  "🏊 Cannonballs welcome",
  "🌴 Backyard vacations",
  "🍹 Poolside cocktails",
  "🐠 Crystal-clear water",
  "✨ Custom designs",
  "🦩 Flamingo floaties",
  "🎉 Endless summers",
];

export const Marquee = () => {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border bg-accent py-4">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-xl font-semibold text-accent-foreground">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            {t}
            <span className="text-accent-foreground/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
