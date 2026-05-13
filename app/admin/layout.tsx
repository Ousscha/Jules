import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, FolderTree, LogOut } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black hidden md:block">
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Menu</h3>
            <nav className="mt-4 space-y-2">
              <Link
                href="/admin"
                className="flex items-center space-x-3 text-sm font-bold uppercase tracking-tight hover:text-pink-600 transition-colors"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/admin/articles"
                className="flex items-center space-x-3 text-sm font-bold uppercase tracking-tight hover:text-pink-600 transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>Articles</span>
              </Link>
              <Link
                href="/admin/categories"
                className="flex items-center space-x-3 text-sm font-bold uppercase tracking-tight hover:text-pink-600 transition-colors"
              >
                <FolderTree className="h-4 w-4" />
                <span>Catégories</span>
              </Link>
            </nav>
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
