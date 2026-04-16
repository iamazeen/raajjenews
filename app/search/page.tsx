import { ArticleCard } from "@/components/ArticleCard";
import { CategoryNav } from "@/components/CategoryNav";
import { listCategoriesWithPublishedArticles, searchPublishedArticles } from "@/lib/news";

type Props = {
  searchParams: {
    q?: string;
  };
};

export default async function SearchPage({ searchParams }: Props) {
  const searchQuery = searchParams.q?.trim() ?? "";
  const [categories, articles] = await Promise.all([
    listCategoriesWithPublishedArticles(),
    searchPublishedArticles(searchQuery)
  ]);

  return (
    <div className="page-stack">
      <CategoryNav categories={categories} searchQuery={searchQuery} />
      <section className="hero-panel hero-panel--compact">
        <div>
          <p className="section-label">ސާޗް</p>
          <h2 className="hero-panel__title">{searchQuery || "Search"}</h2>
          <p className="hero-panel__copy">
            {searchQuery ? `Found ${articles.length} articles for "${searchQuery}".` : "Search for articles by title, summary, or content."}
          </p>
        </div>
      </section>
      {articles.length ? (
        <div className="article-grid">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="card">{searchQuery ? "No articles matched your search." : "Enter a search term to find articles."}</div>
      )}
    </div>
  );
}
