import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) return {};

  return {
    title: article.metaTitle || `${article.title} | TechPulse`,
    description: article.metaDescription || article.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!article || (!article.published && process.env.NODE_ENV === "production")) {
    notFound();
  }

  return (
    <article className="pb-24">
      {/* Header */}
      <header className="mx-auto max-w-4xl px-4 pt-16 pb-8 text-center sm:px-6 lg:px-8">
        <Link href={`/category/${article.category.slug}`} className="text-xs font-black uppercase tracking-widest text-pink-600 hover:underline">
          {article.category.name}
        </Link>
        <h1 className="mt-4 text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
          {article.title}
        </h1>
        <div className="mt-8 flex items-center justify-center space-x-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
          <span>Par Rédaction TechPulse</span>
          <span>•</span>
          <span>{format(new Date(article.createdAt), "dd MMMM yyyy", { locale: fr })}</span>
        </div>
      </header>

      {/* Hero Image */}
      {article.featuredImage && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="aspect-[21/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="prose prose-zinc dark:prose-invert max-w-none prose-h2:text-2xl prose-h2:font-black prose-h2:uppercase prose-h2:tracking-tighter prose-p:text-lg prose-p:leading-relaxed">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
