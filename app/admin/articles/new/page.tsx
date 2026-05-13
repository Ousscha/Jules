import { ArticleForm } from "@/components/admin/ArticleForm";
import { getCategories } from "@/lib/actions/articles";

export default async function NewArticlePage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-black uppercase tracking-tighter">Nouvel Article</h1>
      <ArticleForm categories={categories} />
    </div>
  );
}
