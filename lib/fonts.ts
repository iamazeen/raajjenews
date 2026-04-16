import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const sanguSuruhee = localFont({
  src: "../SanguSuruhee-2.0.ttf",
  display: "swap",
  variable: "--font-sangu-suruhee"
});

export const sanguSuruheeClassName = sanguSuruhee.className;
