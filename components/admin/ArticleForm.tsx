"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createArticle, updateArticle } from "@/lib/actions/articles";
import { ImagePlus, Loader2 } from "lucide-react";

interface ArticleFormProps {
  initialData?: any;
  categories: any[];
}

export function ArticleForm({ initialData, categories }: ArticleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(initialData?.featuredImage || "");

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    excerpt: initialData?.excerpt || "",
    categoryId: initialData?.categoryId || (categories[0]?.id || ""),
    featuredImage: initialData?.featuredImage || "",
    published: initialData?.published || false,
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.url) {
        setFormData({ ...formData, featuredImage: result.url });
        setPreview(result.url);
      }
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (initialData?.id) {
        await updateArticle(initialData.id, formData);
      } else {
        await createArticle(formData);
      }
      router.push("/admin/articles");
      router.refresh();
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-1">Titre</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Ex: Le futur de l'intelligence artificielle..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-1">Contenu (Markdown)</label>
            <textarea
              className="w-full min-h-[400px] border border-zinc-200 bg-white p-4 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-800 dark:bg-black dark:focus:ring-white"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-1">Extrait (Optionnel)</label>
            <textarea
              className="w-full min-h-[100px] border border-zinc-200 bg-white p-4 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:border-zinc-800 dark:bg-black dark:focus:ring-white"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Publication</h3>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="h-4 w-4"
              />
              <label htmlFor="published" className="text-sm">Publier immédiatement</label>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData?.id ? "Mettre à jour" : "Créer l'article"}
            </Button>
          </div>

          <div className="border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Image principale</h3>
            <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center mb-4 overflow-hidden">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <ImagePlus className="h-8 w-8 text-zinc-400" />
              )}
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageUpload}
                accept="image/*"
              />
            </div>
            <p className="text-[10px] text-zinc-500 text-center uppercase tracking-tighter">Cliquez pour uploader une image</p>
          </div>

          <div className="border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Catégorie</h3>
            <select
              className="w-full border border-zinc-200 bg-white p-2 text-sm focus:outline-none dark:border-zinc-800 dark:bg-black"
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              required
            >
              <option value="" disabled>Choisir une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">SEO</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 text-zinc-500">Meta Title</label>
                <Input
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  placeholder="Titre pour les moteurs de recherche"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 text-zinc-500">Meta Description</label>
                <textarea
                  className="w-full min-h-[80px] border border-zinc-200 bg-white p-2 text-xs focus:outline-none dark:border-zinc-800 dark:bg-black"
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="Description pour les moteurs de recherche"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
