import { ArticleForm } from "@/components/admin/ArticleForm";
import { getCategories } from "@/lib/actions/articles";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await prisma.article.findUnique({
    where: { id },
  });

  if (!article) notFound();

  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-black uppercase tracking-tighter">Modifier l'article</h1>
      <ArticleForm initialData={article} categories={categories} />
    </div>
  );
}
