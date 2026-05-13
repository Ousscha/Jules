"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="text-6xl font-black uppercase tracking-tighter border-b-8 border-black dark:border-white pb-4 mb-12">Contact</h1>

      {submitted ? (
        <div className="bg-green-100 border border-green-200 p-8 text-center dark:bg-green-900/20 dark:border-green-800">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-green-800 dark:text-green-400">Message Envoyé !</h2>
          <p className="mt-2 text-green-700 dark:text-green-500 font-bold uppercase tracking-widest text-xs">Nous vous répondrons dans les plus brefs délais.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">Nom Complet</label>
              <Input required placeholder="Jean Dupont" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">Email</label>
              <Input type="email" required placeholder="jean@example.com" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Sujet</label>
            <Input required placeholder="Demande de partenariat / Suggestion" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Message</label>
            <textarea
              required
              className="w-full min-h-[200px] border border-zinc-200 bg-white p-4 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-800 dark:bg-black dark:focus:ring-white"
              placeholder="Comment pouvons-nous vous aider ?"
            />
          </div>
          <Button type="submit" className="w-full h-16 text-xl">Envoyer le message</Button>
        </form>
      )}
    </div>
  );
}
