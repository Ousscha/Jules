"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <div className="bg-pink-600 p-8 md:p-12 text-white">
      <div className="max-w-xl">
        <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-4">Rejoignez la Pulse</h2>
        <p className="text-pink-100 font-bold uppercase tracking-widest text-[10px] mb-8">Recevez le meilleur de la tech directement dans votre boîte mail.</p>

        {status === "success" ? (
          <p className="font-black uppercase tracking-tighter text-xl">Bienvenue à bord ! ⚡️</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-pink-200 focus-visible:ring-white h-12"
            />
            <Button variant="secondary" type="submit" disabled={status === "loading"} className="h-12 px-8">
              S'inscrire
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
