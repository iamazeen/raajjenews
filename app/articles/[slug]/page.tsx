import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCardWithVariant } from "@/components/ArticleCard";
import { CategoryNav } from "@/components/CategoryNav";
import { formatSiteDate } from "@/lib/dates";
import {
  getPublishedArticleBySlug,
  listCategoriesWithPublishedArticles,
  listPublishedArticles,
  listPublishedArticlesByCategoryId
} from "@/lib/news";

export const dynamic = "force-dynamic";

type Props = {
  params: { slug: string };
};

function formatPublished(value: string | null, language: "dv" | "en") {
  if (!value) {
    return "";
  }
  return formatSiteDate(value, language, true);
}

export default async function ArticleDetailPage({ params }: Props) {
  const [article, categories, latestArticles] = await Promise.all([
    getPublishedArticleBySlug(params.slug),
    listCategoriesWithPublishedArticles(),
    listPublishedArticles()
  ]);

  if (!article) {
    notFound();
  }
  const articleLanguage = article.language === "dv" ? "dv" : "en";
  const categoryArticles = article.category?.id ? await listPublishedArticlesByCategoryId(article.category.id) : [];
  const relatedArticles = [...categoryArticles, ...latestArticles]
    .filter((candidate, index, items) => candidate.slug !== article.slug && items.findIndex((item) => item.slug === candidate.slug) === index)
    .slice(0, 8);

  return (
    <div className="page-stack">
      <CategoryNav categories={categories} activeSlug={article.category?.id} />
      <article className="article-detail" lang={articleLanguage}>
        <div className="article-detail__header">
          <p className="meta article-detail__breadcrumbs">
            <Link href="/">Home</Link> / {article.category?.name ?? "Uncategorized"}
          </p>
          <div className="article-detail__meta-row">
            <span className="article-card__category" lang={articleLanguage}>
              {article.category?.name ?? "Uncategorized"}
            </span>
            <span className="meta">{formatPublished(article.published_at, article.language)}</span>
          </div>
          <h1 className={article.is_rtl ? "rtl" : ""}>{article.title}</h1>
          <p className="meta article-detail__byline">
            <span className="article-detail__byline-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 12a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5Zm0 2c-4.14 0-7.5 2.57-7.5 5.75 0 .41.34.75.75.75h13.5a.75.75 0 0 0 .75-.75C19.5 16.57 16.14 14 12 14Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span>By {article.author_name ?? "News Desk"}</span>
          </p>
        </div>
        {article.featured_image_url ? (
          <Image
            src={article.featured_image_url}
            alt={article.title}
            width={1400}
            height={800}
            className="article-detail__image"
          />
        ) : null}
        <div className={`article-detail__content ${article.is_rtl ? "rtl" : ""}`}>
          {article.content}
        </div>
      </article>

      {relatedArticles.length ? (
        <section className="section-block article-related">
          <div className="section-heading">
            <div>
              <p className="section-label">އިތުރު ހަބަރު</p>
            </div>
          </div>
          <div className="article-grid article-grid--compact">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCardWithVariant key={relatedArticle.id} article={relatedArticle} variant="compact" />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
