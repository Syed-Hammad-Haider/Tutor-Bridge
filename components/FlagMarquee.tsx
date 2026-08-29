// Emoji flags render inconsistently across platforms — notably, Windows
// shows plain two-letter text instead of the flag graphic for most of these
// (a long-standing Windows limitation, not a bug in this code). Using real
// flag images from flagcdn.com (free, no API key, widely used) guarantees
// the flag actually renders everywhere.

const countries = [
  { code: "pk", name: "Pakistan" },
  { code: "gb", name: "United Kingdom" },
  { code: "us", name: "United States" },
  { code: "ca", name: "Canada" },
  { code: "ae", name: "UAE" },
  { code: "sa", name: "Saudi Arabia" },
  { code: "qa", name: "Qatar" },
  { code: "au", name: "Australia" },
  { code: "de", name: "Germany" },
  { code: "ch", name: "Switzerland" },
  { code: "cn", name: "China" },
  { code: "es", name: "Spain" },
  { code: "eg", name: "Egypt" },
  { code: "cz", name: "Czech Republic" },
  { code: "om", name: "Oman" },
  { code: "bh", name: "Bahrain" },
];

function Track() {
  return (
    <div className="flex shrink-0 items-center gap-3 pr-3">
      {countries.map((c) => (
        <span
          key={c.name}
          className="flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-[13.5px] font-medium text-ink/75 transition-colors hover:border-bridge/40 hover:text-ink"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://flagcdn.com/24x18/${c.code}.png`}
            srcSet={`https://flagcdn.com/48x36/${c.code}.png 2x`}
            width={20}
            height={15}
            alt=""
            className="rounded-[2px] shadow-sm"
            loading="lazy"
          />
          {c.name}
        </span>
      ))}
    </div>
  );
}

export default function FlagMarquee() {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-[marquee_38s_linear_infinite] hover:[animation-play-state:paused]">
        <Track />
        <Track />
      </div>
    </div>
  );
}
