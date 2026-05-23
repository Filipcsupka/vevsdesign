import Link from "next/link";
import type { ReactNode } from "react";

type LegalPageProps = {
  title: string;
  intro: string;
  children: ReactNode;
};

export default function LegalPage({ title, intro, children }: LegalPageProps) {
  return (
    <main className="legal-shell">
      <div className="legal-card">
        <p className="legal-back">
          <Link href="/">← Späť na hlavnú stránku</Link>
        </p>
        <p className="sec-label legal-label">Informácie pre klientov</p>
        <h1 className="legal-title">{title}</h1>
        <p className="legal-intro">{intro}</p>
        <div className="legal-content">{children}</div>
      </div>
    </main>
  );
}
