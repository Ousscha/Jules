import prisma from "@/lib/prisma";
import { FileText, FolderTree, Users, Eye } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const articlesCount = await prisma.article.count();
  const categoriesCount = await prisma.category.count();
  const publishedArticles = await prisma.article.count({ where: { published: true } });

  const stats = [
    { label: "Articles", value: articlesCount, icon: FileText },
    { label: "Catégories", value: categoriesCount, icon: FolderTree },
    { label: "Publiés", value: publishedArticles, icon: Eye },
  ];

  const recentArticles = await prisma.article.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-black uppercase tracking-tighter">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">{stat.label}</p>
                <p className="text-3xl font-black mt-1">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-pink-600" />
            </div>
          </div>
        ))}
      </div>

      <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
        <div className="border-b border-zinc-200 p-4 dark:border-zinc-800 flex justify-between items-center">
          <h2 className="text-sm font-bold uppercase tracking-widest">Articles Récents</h2>
          <Link href="/admin/articles/new" className="text-xs font-bold uppercase tracking-widest text-pink-600 hover:underline">
            + Nouvel Article
          </Link>
        </div>
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {recentArticles.map((article) => (
            <div key={article.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-bold">{article.title}</p>
                <p className="text-xs text-zinc-500 uppercase tracking-widest">{article.category.name} • {article.published ? "Publié" : "Brouillon"}</p>
              </div>
              <Link href={`/admin/articles/${article.id}`} className="text-xs font-bold uppercase tracking-widest hover:text-pink-600">
                Modifier
              </Link>
            </div>
          ))}
          {recentArticles.length === 0 && (
            <div className="p-8 text-center text-zinc-500">Aucun article pour le moment.</div>
          )}
        </div>
      </div>
    </div>
  );
}
