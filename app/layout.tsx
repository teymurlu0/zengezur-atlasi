import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin", "latin-ext"],
  variable: "--font-zengezur",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zəngəzur Atlası | Abidələr, tarix, 3D",
  description:
    "Şərqi Zəngəzurun təbiətini, tarixini və yenidən qurulmasını interaktiv mühitdə kəşf edin.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="az" className={roboto.variable}>
      <body>{children}</body>
    </html>
  );
}
