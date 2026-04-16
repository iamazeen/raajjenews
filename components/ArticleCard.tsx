import Image from "next/image";
import Link from "next/link";
import { formatSiteDate } from "@/lib/dates";
import { sanguSuruheeClassName } from "@/lib/fonts";
import type { Article } from "@/lib/types";

function formatPublished(value: string | null, language: "dv" | "en") {
  if (!value) {
    return language === "dv" ? "ތާރީޚެއް ނެތް" : "Unscheduled";
  }

  if (language === "dv") {
    return formatSiteDate(value, language);
  }

  return formatSiteDate(value, language);
}

export function ArticleCard({ article }: { article: Article }) {
  return <ArticleCardWithVariant article={article} variant="default" />;
}

type ArticleCardVariant = "default" | "feature" | "compact";

export function ArticleCardWithVariant({
  article,
  variant = "default"
}: {
  article: Article;
  variant?: ArticleCardVariant;
}) {
  const articleClassName = ["article-card", `article-card--${variant}`].join(" ");
  const metaRowClassName = ["article-card__meta-row", variant === "feature" ? "article-card__meta-row--feature" : ""]
    .filter(Boolean)
    .join(" ");
  const bodyClassName = ["article-card__body", variant === "feature" ? "article-card__body--feature" : ""]
    .filter(Boolean)
    .join(" ");
  const titleClassName = [
    "article-card__title",
    article.language === "dv" ? sanguSuruheeClassName : "",
    article.is_rtl ? "rtl-text" : ""
  ]
    .filter(Boolean)
    .join(" ");
  const summaryClassName = ["article-card__summary", article.is_rtl ? "rtl" : ""].filter(Boolean).join(" ");
  const publishedClassName = ["meta", variant === "feature" ? "article-card__published--feature" : ""].filter(Boolean).join(" ");
  const articleLanguage = article.language === "dv" ? "dv" : "en";
  const imageUrl = article.featured_image_url;
  const showImage = Boolean(imageUrl);

  return (
    <article className={articleClassName} lang={articleLanguage}>
      {showImage && imageUrl ? (
        <Link className="article-card__media" href={`/articles/${article.slug}`}>
          <Image
            src={imageUrl}
            alt={article.title}
            width={1200}
            height={630}
            className="article-card__image"
          />
        </Link>
      ) : null}
      <div className={bodyClassName}>
        <div className={metaRowClassName}>
          <span className="article-card__category" lang={articleLanguage}>
            {article.category?.name ?? "Uncategorized"}
          </span>
          {variant !== "feature" ? <span className={publishedClassName}>{formatPublished(article.published_at, article.language)}</span> : null}
        </div>
        <h2 className={titleClassName} lang={articleLanguage}>
          <Link href={`/articles/${article.slug}`} lang={articleLanguage}>
            {article.title}
          </Link>
        </h2>
        {article.summary ? <p className={summaryClassName}>{article.summary}</p> : null}
        {variant === "feature" ? <p className={publishedClassName}>{formatPublished(article.published_at, article.language)}</p> : null}
      </div>
    </article>
  ); 
}
