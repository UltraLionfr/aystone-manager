import Link from "next/link";
export default function Header() {
  return (
    <header className="w-full bg-white shadow mb-4">
      <nav className="max-w-4xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="font-bold text-lg">MC Projects</Link>
        <div className="flex gap-4">
          <Link href="/">Explorer</Link>
          <Link href="/ajouter">Ajouter/mes projets</Link>
        </div>
      </nav>
    </header>
  );
}
