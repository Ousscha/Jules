"use client";

import Link from "next/link";
import { Search, Menu, X, User } from "lucide-react";
import { useState } from "react";

const categories = [
  { name: "IA", slug: "ia" },
  { name: "Mobile", slug: "mobile" },
  { name: "Auto", slug: "auto" },
  { name: "Énergie", slug: "energie" },
  { name: "Gadgets", slug: "gadgets" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-black uppercase tracking-tighter text-black dark:text-white">
              Tech<span className="text-pink-600">Pulse</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="text-xs font-bold uppercase tracking-widest text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/admin">
              <User className="h-5 w-5 text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white" />
            </Link>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="block px-3 py-2 text-base font-bold uppercase tracking-widest text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
                onClick={() => setIsOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
