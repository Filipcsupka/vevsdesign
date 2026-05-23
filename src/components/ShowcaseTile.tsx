import type { MouseEventHandler } from "react";
import FallbackImage from "@/components/FallbackImage";
import type { ImageAsset } from "@/data/imageAssets";

type ShowcaseVariant = "sky" | "sand" | "pearl" | "mist";

type ShowcaseTileProps = {
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
  variant: ShowcaseVariant;
  onClick: MouseEventHandler<HTMLButtonElement>;
  image?: ImageAsset;
  featured?: boolean;
};

export default function ShowcaseTile({
  eyebrow,
  title,
  description,
  meta,
  variant,
  onClick,
  image,
  featured = false,
}: ShowcaseTileProps) {
  return (
    <button
      type="button"
      className={`showcase-tile showcase-tile-${variant}${featured ? " showcase-tile-featured" : ""}`}
      onClick={onClick}
    >
      <span className="showcase-tile-media" aria-hidden="true">
        <span className="showcase-tile-media-surface">
          {image ? (
            <FallbackImage
              src={image.src}
              alt={image.alt}
              className="showcase-tile-img"
            />
          ) : null}
        </span>
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
