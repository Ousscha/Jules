export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="text-6xl font-black uppercase tracking-tighter border-b-8 border-black dark:border-white pb-4 mb-12">À Propos</h1>
      <div className="prose prose-zinc dark:prose-invert max-w-none prose-p:text-xl prose-p:leading-relaxed">
        <p>
          TechPulse est votre destination de référence pour comprendre comment la technologie façonne notre avenir.
          Inspirés par l'excellence éditoriale et le design moderne, nous couvrons les sujets qui comptent : de l'intelligence artificielle révolutionnaire aux derniers gadgets, en passant par la transition vers l'énergie durable et les véhicules électriques.
        </p>
        <p>
          Notre mission est de fournir des analyses claires, des critiques honnêtes et des actualités fraîches pour les passionnés de tech et les curieux du futur.
        </p>
        <h2 className="text-3xl font-black uppercase tracking-tighter mt-16 mb-6">Notre Éthique</h2>
        <p>
          Nous croyons en une technologie qui sert l'humanité. Nos articles sont rédigés avec rigueur et indépendance, sans influence des constructeurs ou des géants du secteur.
        </p>
      </div>
    </div>
  );
}
