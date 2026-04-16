import { ArticleCard } from "@/components/ArticleCard";
import { CategoryNav } from "@/components/CategoryNav";
import { listCategoriesWithPublishedArticles, listPublishedArticlesByCategoryId } from "@/lib/news";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const categories = await listCategoriesWithPublishedArticles();
  const activeCategory = categories.find((category) => category.id === slug || category.slug === slug);

  if (!activeCategory) {
    notFound();
  }

  const articles = await listPublishedArticlesByCategoryId(activeCategory.id);

  return (
    <div className="page-stack">
      <section className="hero-panel hero-panel--compact">
        <div>
          <p className="section-label">ބައި</p>
          <h2 className="hero-panel__title">{activeCategory.name}</h2>
          <p className="hero-panel__copy">މި ބައިގައި ހިމެނޭ ހުރިހާ ހަބަރުތައް</p>
        </div>
      </section>

      <CategoryNav categories={categories} activeSlug={activeCategory.id} />

      {articles.length ? (
        <section className="section-block">
          <div className="section-heading">
            <div>
              <p className="section-label">ހުރިހާ ހަބަރު</p>
            </div>
          </div>
          <div className="article-grid">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      ) : (
        <div className="card">No published articles in this category yet.</div>
      )}
    </div>
  );
}
