import "./globals.css";
import Image from "next/image";
import { formatSiteDate } from "@/lib/dates";
import type { Metadata } from "next";
import { inter, sanguSuruhee } from "@/lib/fonts";
import Link from "next/link";
import type { ReactNode } from "react";

function SocialIcon({
  href,
  label,
  path
}: {
  href: string;
  label: string;
  path: string;
}) {
  return (
    <a className="site-footer__social-link" href={href} aria-label={label} target="_blank" rel="noreferrer">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={path} fill="currentColor" />
      </svg>
    </a>
  );
}

export const metadata: Metadata = {
  title: "RaajjeMV",
  description: "Breaking headlines, latest updates, and in-depth coverage from RaajjeMV."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const today = formatSiteDate(new Date(), "dv");

  return (
    <html lang="dv" dir="rtl">
      <body className={`${inter.className} ${sanguSuruhee.variable}`}>
        <main className="site-shell">
          <div className="site-meta-bar">
            <p className="site-meta-bar__item">{today}</p>
            <p className="site-meta-bar__item">ރާއްޖޭގެ ހަބަރު، ދުނިޔޭގެ ހަބަރު، އަދި ރިޕޯޓް</p>
          </div>
          <header className="site-header">
            <div className="site-header__main">
              <div className="site-brand">
                <Link className="site-logo" href="/" aria-label="RaajjeMV home">
                  <Image src="/logo.png" alt="RaajjeMV logo" width={212} height={97} className="site-logo__image" priority />
                </Link>
                <p className="site-tagline">
                  ދިވެހި ބަހުން ހަބަރު، ރިޕޯޓް އަދި އާ އަޕްޑޭޓްތައް
                </p>
              </div>
            </div>
          </header>
          {children}
        </main>
        <footer className="site-footer">
          <div className="site-footer__inner">
            <Image src="/footer-logo.png" alt="RaajjeMV footer logo" width={212} height={97} className="site-footer__logo" />
            <p className="site-footer__copy">ރާއްޖޭގެ ހަބަރު، ދުނިޔޭގެ ހަބަރު، އަދި އާ އަޕްޑޭޓްތައް</p>
            <div className="site-footer__contact">
              <p className="site-footer__contact-item">އީމެއިލް: info@raajjenews.com</p>
              <p className="site-footer__contact-item">ފޯނު: 3332266</p>
              <p className="site-footer__contact-item">އެޑްރެސް: މާލެ، ދިވެހިރާއްޖެ</p>
            </div>
            <div className="site-footer__socials">
              <SocialIcon
                href="https://facebook.com"
                label="Facebook"
                path="M13.5 9H16V6h-2.5C10.8 6 9 7.8 9 10.5V13H7v3h2v5h3v-5h2.5l.5-3H12v-2.5c0-.8.7-1.5 1.5-1.5Z"
              />
              <SocialIcon
                href="https://instagram.com"
                label="Instagram"
                path="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2.5A1.5 1.5 0 0 0 5.5 7v10A1.5 1.5 0 0 0 7 18.5h10a1.5 1.5 0 0 0 1.5-1.5V7A1.5 1.5 0 0 0 17 5.5H7Zm5 2.25A4.25 4.25 0 1 1 7.75 12 4.25 4.25 0 0 1 12 7.75Zm0 2.5A1.75 1.75 0 1 0 13.75 12 1.75 1.75 0 0 0 12 10.25Zm4.5-3.38a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z"
              />
              <SocialIcon
                href="https://x.com"
                label="X"
                path="M18.9 3H21l-4.6 5.3L22 21h-4.7l-3.7-4.9L9.3 21H7.2l4.9-5.7L2 3h4.8l3.3 4.4L13.9 3h2.1Zm-1.6 15.3h1.3L6.1 5.6H4.7l12.6 12.7Z"
              />
              <SocialIcon
                href="https://youtube.com"
                label="YouTube"
                path="M21.8 8.2a3 3 0 0 0-2.1-2.1C17.8 5.5 12 5.5 12 5.5s-5.8 0-7.7.6A3 3 0 0 0 2.2 8.2C1.5 10.1 1.5 12 1.5 12s0 1.9.7 3.8a3 3 0 0 0 2.1 2.1c1.9.6 7.7.6 7.7.6s5.8 0 7.7-.6a3 3 0 0 0 2.1-2.1c.7-1.9.7-3.8.7-3.8s0-1.9-.7-3.8ZM10 15.5v-7l6 3.5-6 3.5Z"
              />
            </div>
            <p className="site-footer__meta">{today} | All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
