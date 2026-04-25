import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://placeholder-karina-studio.com"),
  title: "Karina Studio + | Estetica facial y corporal en San Fernando",
  description:
    "Estudio de estetica facial y corporal en San Fernando. Tratamientos de cejas, labios, faciales y cuidado personalizado.",
  keywords: [
    "estetica facial",
    "estetica corporal",
    "San Fernando",
    "Buenos Aires",
    "cejas",
    "labios",
    "faciales",
    "beauty studio",
  ],
  alternates: {
    canonical: "https://placeholder-karina-studio.com",
  },
  openGraph: {
    title: "Karina Studio + | Estetica facial y corporal en San Fernando",
    description:
      "Estudio de estetica facial y corporal en San Fernando. Tratamientos de cejas, labios, faciales y cuidado personalizado.",
    url: "https://placeholder-karina-studio.com",
    siteName: "Karina Studio +",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og-placeholder.svg",
        width: 1200,
        height: 630,
        alt: "Karina Studio +, estudio de estetica facial y corporal en San Fernando",
      },
    ],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karina Studio + | Estetica facial y corporal en San Fernando",
    description:
      "Estudio de estetica facial y corporal en San Fernando. Tratamientos de cejas, labios, faciales y cuidado personalizado.",
    images: ["/og-placeholder.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
