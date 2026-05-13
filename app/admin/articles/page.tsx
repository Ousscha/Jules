import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function ArticlesListPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter">Articles</h1>
        <Link href="/admin/articles/new">
          <Button>+ Nouvel Article</Button>
        </Link>
      </div>

      <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
            <tr>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest">Titre</th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest">Catégorie</th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest">Statut</th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest">Date</th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-colors">
                <td className="px-6 py-4 font-bold text-sm">{article.title}</td>
                <td className="px-6 py-4 text-xs uppercase tracking-widest text-zinc-500">{article.category.name}</td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 ${article.published ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-700"}`}>
                    {article.published ? "Publié" : "Brouillon"}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-zinc-500">{new Date(article.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/articles/${article.id}`} className="text-xs font-bold uppercase tracking-widest text-pink-600 hover:underline">
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {articles.length === 0 && (
          <div className="p-12 text-center text-zinc-500">Aucun article trouvé.</div>
        )}
      </div>
    </div>
  );
}
