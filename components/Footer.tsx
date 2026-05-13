import Link from "next/link";
import { Newsletter } from "./Newsletter";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 mb-20">
        <Newsletter />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-black uppercase tracking-tighter text-black dark:text-white">
              Tech<span className="text-pink-600">Pulse</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-zinc-600 dark:text-zinc-400">
              Votre source quotidienne pour les dernières innovations technologiques, l'IA, les gadgets et le futur de la mobilité.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-black dark:text-white">Catégories</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/category/ia" className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
                  Intelligence Artificielle
                </Link>
              </li>
              <li>
                <Link href="/category/mobile" className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href="/category/auto" className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
                  Voitures Électriques
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-black dark:text-white">À Propos</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
                  Notre Équipe
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <p className="text-center text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} TechPulse. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
