import { Play } from "lucide-react";

interface HeroProps {
  onPlay: () => void;
}

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 5) return "Good night";
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export default function Hero({ onPlay }: HeroProps) {
  return (
    <>
      <section className="welcome-row">
        <div>
          <p className="eyebrow">{dateFormatter.format(new Date())}</p>
          <h1>
            {greeting()}
            <span className="green-dot">.</span>
          </h1>
        </div>
        <div className="mood-pill">
          <span className="pulse-dot" /> Every track is free to stream
        </div>
      </section>

      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow light">Curated for you</p>
          <h2>
            Find your
            <br />
            <em>frequency.</em>
          </h2>
          <p>
            A handpicked library of freely licensed music for late nights,
            long drives, and everything in between.
          </p>
          <button type="button" className="green-button" onClick={onPlay}>
            <Play size={16} fill="currentColor" /> Shuffle play
          </button>
        </div>
        <div className="hero-art" />
      </section>
    </>
  );
}
