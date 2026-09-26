import { Ellipsis } from "lucide-react";
import { TOP_GENRES } from "../data/catalog";
import { slugify } from "../lib/format";

export default function TopGenre() {
  return (
    <div>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Explore your taste</p>
          <h2>Top genres</h2>
        </div>
        <button type="button" className="icon-button" aria-label="Genre options">
          <Ellipsis size={18} />
        </button>
      </div>

      <div className="genre-stack">
        {TOP_GENRES.map((genre) => {
          const [firstLine, secondLine] = genre.name;
          const name = genre.name.join(" ");

          return (
            <a
              className="genre-card"
              key={genre.number}
              href={`#/genres/${slugify(genre.name.join(" "))}`}
              aria-label={`Browse ${name}`}
            >
              <div className="genre-number">{genre.number}</div>
              <div>
                <span className="genre-kicker">{genre.kicker}</span>
                <h3>
                  {firstLine}
                  <br />
                  {secondLine}
                </h3>
                <p>{genre.meta}</p>
              </div>
              <div className="genre-bars" aria-hidden="true">
                {genre.bars.map((height, index) => (
                  <i key={index} style={{ height: `${height}px` }} />
                ))}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
