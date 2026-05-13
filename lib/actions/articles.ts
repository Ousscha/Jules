"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function createArticle(formData: any) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const { title, content, excerpt, categoryId, featuredImage, published, metaTitle, metaDescription } = formData;

  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const article = await prisma.article.create({
    data: {
      title,
      slug,
      content,
      excerpt,
      categoryId,
      featuredImage,
      published,
      metaTitle,
      metaDescription,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/articles");
  return article;
}

export async function updateArticle(id: string, formData: any) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const article = await prisma.article.update({
    where: { id },
    data: formData,
  });

  revalidatePath("/");
  revalidatePath(`/article/${article.slug}`);
  revalidatePath("/admin/articles");
  return article;
}

export async function deleteArticle(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.article.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/admin/articles");
}

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}
