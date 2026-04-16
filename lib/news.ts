import { getSupabase } from "./supabase";
import type { Article, Category } from "./types";

type RawArticle = Omit<Article, "category"> & {
  category: Category | Category[] | null;
};

function baseArticleQuery() {
  const supabase = getSupabase();
  if (!supabase) {
    return null;
  }
  return supabase
    .from("articles")
    .select("id,title,slug,summary,content,featured_image_url,status,language,is_rtl,author_name,published_at,created_at,category:categories(id,name,slug)");
}

function normalizeArticle(raw: RawArticle): Article {
  const category = Array.isArray(raw.category) ? (raw.category[0] ?? null) : (raw.category ?? null);
  return { ...raw, category };
}

export async function listPublishedArticles(): Promise<Article[]> {
  const query = baseArticleQuery();
  if (!query) {
    return [];
  }
  const { data, error } = await query
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return ((data ?? []) as RawArticle[]).map(normalizeArticle);
}

export async function getPublishedArticleBySlug(slug: string): Promise<Article | null> {
  const query = baseArticleQuery();
  if (!query) {
    return null;
  }
  const { data, error } = await query
    .eq("slug", slug)
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .maybeSingle();
  if (error) {
    throw new Error(error.message);
  }
  return data ? normalizeArticle(data as RawArticle) : null;
}

export async function listCategoriesWithPublishedArticles(): Promise<Category[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return [];
  }
  const { data, error } = await supabase.from("categories").select("id,name,slug").order("name", { ascending: true });
  if (error) {
    throw new Error(error.message);
  }
  return (data ?? []) as Category[];
}

export async function listPublishedArticlesByCategoryId(categoryId: string): Promise<Article[]> {
  const query = baseArticleQuery();
  if (!query) {
    return [];
  }
  const { data, error } = await query
    .eq("category_id", categoryId)
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return ((data ?? []) as RawArticle[]).map(normalizeArticle);
}

export async function searchPublishedArticles(searchTerm: string): Promise<Article[]> {
  const query = baseArticleQuery();
  const trimmedSearchTerm = searchTerm.trim();

  if (!query || !trimmedSearchTerm) {
    return [];
  }

  const { data, error } = await query
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .or(`title.ilike.%${trimmedSearchTerm}%,summary.ilike.%${trimmedSearchTerm}%,content.ilike.%${trimmedSearchTerm}%`)
    .order("published_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as RawArticle[]).map(normalizeArticle);
}
