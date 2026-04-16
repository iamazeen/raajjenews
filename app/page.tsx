import { ArticleCard, ArticleCardWithVariant } from "@/components/ArticleCard";
import { CategoryNav } from "@/components/CategoryNav";
import { hasSupabaseConfig } from "@/lib/supabase";
import { listCategoriesWithPublishedArticles, listPublishedArticles } from "@/lib/news";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const configured = hasSupabaseConfig();
  const [categories, articles] = await Promise.all([listCategoriesWithPublishedArticles(), listPublishedArticles()]);
  const [featuredArticle, ...remainingArticles] = articles;
  const secondaryArticles = remainingArticles.slice(0, 4);
  const latestArticles = remainingArticles.slice(4, 12);
  const hasLatestSection = latestArticles.length > 0;
  const headlineArticles = articles.slice(0, 8);

  if (!configured) {
    return (
      <div className="card">
        Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local`.
      </div>
    );
  }

  return (
    <div className="page-stack">
      <CategoryNav categories={categories} />

      {featuredArticle ? (
        <section className="hero-panel hero-panel--suruhee">
          <div className="hero-panel__topline">
            <p className="section-label">މުހިންމު ހަބަރު</p>
          </div>
          <ArticleCardWithVariant article={featuredArticle} variant="feature" />
        </section>
      ) : null}

      {headlineArticles.length ? (
        <section className="section-block section-block--boxed">
          <div className="section-heading">
            <div>
              <p className="section-label">އެންމެފަސް</p>
            </div>
          </div>
          <div className="article-grid article-grid--compact">
            {headlineArticles.map((article) => (
              <ArticleCardWithVariant key={article.id} article={article} variant="compact" />
            ))}
          </div>
        </section>
      ) : null}

      {secondaryArticles.length ? (
        <section className="section-block">
          <div className="section-heading">
            <div>
              <p className="section-label">ފަހުގެ ހަބަރު</p>
            </div>
          </div>
          <div className="article-grid article-grid--compact">
            {secondaryArticles.map((article) => (
              <ArticleCardWithVariant key={article.id} article={article} variant="compact" />
            ))}
          </div>
        </section>
      ) : null}

      {hasLatestSection ? (
        <section className="section-block">
          <div className="section-heading">
            <div>
              <p className="section-label">އިތުރު ހަބަރު</p>
            </div>
          </div>
          <div className="article-grid">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      ) : !articles.length ? (
        <div className="card">No published articles yet.</div>
      ) : null}
    </div>
  );
}
