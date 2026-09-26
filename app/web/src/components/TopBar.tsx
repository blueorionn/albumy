import { ArrowLeft, ArrowRight } from "lucide-react";

const SPONSOR_URL = "https://github.com/sponsors/blueorionn";

export default function TopBar() {
  return (
    <header className="topbar">
      <div className="history-buttons">
        <button
          type="button"
          className="circle-button"
          aria-label="Go back"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={17} />
        </button>
        <button
          type="button"
          className="circle-button"
          aria-label="Go forward"
          onClick={() => window.history.forward()}
        >
          <ArrowRight size={17} />
        </button>
      </div>
      <a
        className="sponsor-button"
        href={SPONSOR_URL}
        target="_blank"
        rel="noreferrer"
      >
        Sponsor
      </a>
    </header>
  );
}
