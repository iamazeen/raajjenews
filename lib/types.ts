export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  featured_image_url: string | null;
  status: "draft" | "published";
  language: "dv" | "en";
  is_rtl: boolean;
  author_name: string | null;
  published_at: string | null;
  created_at: string;
  category: Category | null;
};
