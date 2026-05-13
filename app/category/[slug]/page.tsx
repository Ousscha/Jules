import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      articles: {
        where: { published: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!category) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="border-b-8 border-black dark:border-white pb-4 mb-12">
        <h1 className="text-6xl font-black uppercase tracking-tighter">{category.name}</h1>
        {category.description && (
          <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">{category.description}</p>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {category.articles.map((article) => (
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

      {category.articles.length === 0 && (
        <div className="py-24 text-center border border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-500 font-bold uppercase tracking-widest">Aucun article dans cette catégorie pour le moment.</p>
        </div>
      )}
    </div>
  );
}
