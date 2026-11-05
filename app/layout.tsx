
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin", "latin-ext"],
  variable: "--font-zengezur",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZƏNGƏZURİUM | Tarix, abidələr və səfər",

  description:
    "Şərqi Zəngəzurun təbiətini, tarixini və yenidən qurulmasını interaktiv mühitdə kəşf edin.",

  icons: {
    icon: [
      {
        url: "/icon.png?v=3",
        type: "image/png",
        sizes: "any",
      },
    ],
    shortcut: "/icon.png?v=3",
    apple: "/icon.png?v=3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="az"
      className={roboto.variable}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
