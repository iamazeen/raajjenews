"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Category } from "@/lib/types";

export function CategoryNav({
  categories,
  activeSlug,
  searchQuery
}: {
  categories: Category[];
  activeSlug?: string;
  searchQuery?: string;
}) {
  const router = useRouter();
  const searchInputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const normalizedDefaultQuery = useMemo(() => (searchQuery ?? "").trim(), [searchQuery]);
  const [isExpanded, setIsExpanded] = useState(Boolean(normalizedDefaultQuery));
  const [query, setQuery] = useState(normalizedDefaultQuery);
  const hasCategories = categories.length > 0;

  useEffect(() => {
    setQuery(normalizedDefaultQuery);
    setIsExpanded(Boolean(normalizedDefaultQuery));
  }, [normalizedDefaultQuery]);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [isExpanded]);

  function expandSearch() {
    setIsExpanded(true);
  }

  function collapseSearch() {
    if (query.trim()) {
      return;
    }
    setIsExpanded(false);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  if (!hasCategories) {
    return null;
  }

  return (
    <nav className="category-nav">
      <div className="category-nav__links">
        <Link className={`pill${activeSlug ? "" : " pill--active"}`} href="/">
          ހަބަރު
        </Link>
        {categories.map((category) => (
          <Link
            className={`pill${activeSlug === category.id ? " pill--active" : ""}`}
            key={category.id}
            href={`/category/${category.id}`}
            lang="dv"
          >
            {category.name}
          </Link>
        ))}
      </div>
      <form
        className={`category-nav__search${isExpanded ? " category-nav__search--expanded" : ""}`}
        action="/search"
        method="get"
        role="search"
        onSubmit={onSubmit}
      >
        <input
          id={searchInputId}
          ref={inputRef}
          className="category-nav__search-input"
          type="search"
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={expandSearch}
          onBlur={collapseSearch}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              inputRef.current?.blur();
              collapseSearch();
            }
          }}
          placeholder="ހަބަރު ހޯދާ"
          aria-label="ހަބަރު ހޯދާ"
        />
        <button
          className="category-nav__search-button"
          type="submit"
          aria-label={isExpanded ? "ހޯދާ" : "ހަބަރު ހޯދާ"}
          title={isExpanded ? "ހޯދާ" : "ހަބަރު ހޯދާ"}
          onClick={(event) => {
            if (!isExpanded) {
              event.preventDefault();
              expandSearch();
            }
          }}
        >
          <span className="sr-only">{isExpanded ? "ހޯދާ" : "ހަބަރު ހޯދާ"}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M16 16l4.5 4.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
          </svg>
        </button>
      </form>
    </nav>
  );
}
