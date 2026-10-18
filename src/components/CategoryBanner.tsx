"use client";

import type { CSSProperties, ReactNode } from "react";
import FallbackImage from "@/components/FallbackImage";

type CategoryBannerProps = {
  id: string;
  title: string;
  lead: string;
  coverSrc: string;
  isOpen: boolean;
  onToggle: () => void;
  layout: CSSProperties;
  children: ReactNode;
};

// Collapsible category banner: cover photo + title + mini text; the panel content
// is rendered only while the banner is open.
export default function CategoryBanner({
  id,
  title,
  lead,
  coverSrc,
  isOpen,
  onToggle,
  layout,
  children,
}: CategoryBannerProps) {
  return (
    <div className="inv-cat" id={id} style={layout}>
      <button
        type="button"
        className={`inv-cat-cover${isOpen ? " is-open" : ""}`}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
      >
        <FallbackImage src={coverSrc} alt="" className="inv-cat-img" />
        <span className="inv-cat-shade" aria-hidden="true" />
        <span className="inv-cat-body">
          <span className="inv-cat-title">{title}</span>
          <span className="inv-cat-lead">{lead}</span>
        </span>
        <span className="inv-cat-toggle" aria-hidden="true" />
      </button>
      <div className="inv-cat-panel" id={`${id}-panel`} hidden={!isOpen}>
        {isOpen ? children : null}
      </div>
    </div>
  );
}
