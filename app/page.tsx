import prisma from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default async function HomePage() {
  const featuredArticle = await prisma.article.findFirst({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  const trendingArticles = await prisma.article.findMany({
    where: { published: true },
    take: 4,
    skip: 1,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  const allArticles = await prisma.article.findMany({
    where: { published: true },
    take: 10,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      {featuredArticle ? (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-1">
          <div className="lg:col-span-2 relative aspect-video group overflow-hidden bg-black">
            {featuredArticle.featuredImage && (
              <img
                src={featuredArticle.featuredImage}
                alt={featuredArticle.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
              />
            )}
            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 to-transparent">
              <Link href={`/category/${featuredArticle.category.slug}`} className="text-xs font-black uppercase tracking-widest text-pink-500 mb-2 hover:underline">
                {featuredArticle.category.name}
              </Link>
              <Link href={`/article/${featuredArticle.slug}`}>
                <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none hover:text-pink-500 transition-colors">
                  {featuredArticle.title}
                </h1>
              </Link>
              <p className="mt-4 text-zinc-300 max-w-xl line-clamp-2">{featuredArticle.excerpt}</p>
            </div>
          </div>

          <div className="bg-zinc-100 dark:bg-zinc-900 p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-6 border-b border-zinc-300 dark:border-zinc-700 pb-2">En ce moment</h2>
              <div className="space-y-8">
                {trendingArticles.map((article) => (
                  <div key={article.id} className="group">
                    <Link href={`/category/${article.category.slug}`} className="text-[10px] font-black uppercase tracking-widest text-pink-600">
                      {article.category.name}
                    </Link>
                    <Link href={`/article/${article.slug}`}>
                      <h3 className="text-lg font-black uppercase tracking-tighter leading-tight group-hover:text-pink-600 transition-colors">
                        {article.title}
                      </h3>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <Link href="/articles" className="mt-8 text-xs font-black uppercase tracking-widest hover:underline">
              Voir tout le flux →
            </Link>
          </div>
        </section>
      ) : (
        <div className="py-24 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Bienvenue sur TechPulse</h2>
          <p className="mt-2 text-zinc-500">Le site est en cours de préparation. Revenez bientôt !</p>
        </div>
      )}

      {/* Main Grid */}
      <section className="mt-16">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-black dark:text-white mb-8 border-b-4 border-black dark:border-white pb-2 inline-block">Les dernières news</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {allArticles.map((article) => (
            <article key={article.id} className="group">
              <Link href={`/article/${article.slug}`}>
                <div className="aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-4">
                  {article.featuredImage && (
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
              </Link>
              <Link href={`/category/${article.category.slug}`} className="text-[10px] font-black uppercase tracking-widest text-pink-600">
                {article.category.name}
              </Link>
              <Link href={`/article/${article.slug}`}>
                <h3 className="mt-2 text-xl font-black uppercase tracking-tighter leading-tight group-hover:text-pink-600 transition-colors">
                  {article.title}
                </h3>
              </Link>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="mt-4 flex items-center text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                <span>{format(new Date(article.createdAt), "dd MMM yyyy", { locale: fr })}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
