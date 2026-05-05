import type { MouseEventHandler } from "react";

type ShowcaseVariant = "sky" | "sand" | "pearl" | "mist";

type ShowcaseTileProps = {
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
  variant: ShowcaseVariant;
  onClick: MouseEventHandler<HTMLButtonElement>;
  featured?: boolean;
};

export default function ShowcaseTile({
  eyebrow,
  title,
  description,
  meta,
  variant,
  onClick,
  featured = false,
}: ShowcaseTileProps) {
  return (
    <button
      type="button"
      className={`showcase-tile showcase-tile-${variant}${featured ? " showcase-tile-featured" : ""}`}
      onClick={onClick}
    >
      <span className="showcase-tile-media" aria-hidden="true">
        <span className="showcase-tile-media-surface" />
        <span className="showcase-tile-media-label">Náhľad fotky</span>
      </span>

      <span className="showcase-tile-body">
        <span className="showcase-tile-eyebrow">{eyebrow}</span>
        <span className="showcase-tile-title">{title}</span>
        <span className="showcase-tile-copy">{description}</span>
        <span className="showcase-tile-meta">{meta}</span>
      </span>
    </button>
  );
}
