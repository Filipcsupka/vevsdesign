import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <p className="sec-label">Vevsdesign</p>
      <h1>Táto stránka sa <em>stratila</em></h1>
      <p>Odkaz, ktorý ste otvorili, už neexistuje alebo bol zadaný nesprávne.</p>
      <Link href="/" className="btn-p">Späť na hlavnú stránku</Link>
    </main>
  );
}
