import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SK Crown Convention | Luxury Wedding & Celebration Venue in Warangal",
  description: "Experience SK Crown Convention, Warangal's premier luxury wedding destination and banquet hall. Crafted for lifetime memories, weddings, receptions, and corporate galas.",
  keywords: ["SK Crown Convention", "Wedding Venue Warangal", "Banquet Hall Warangal", "Luxury Convention Center", "Warangal Function Hall"],
  openGraph: {
    title: "SK Crown Convention | Luxury Wedding Venue",
    description: "Warangal's premier luxury wedding destination and banquet hall.",
    url: "https://skcrown.com",
    siteName: "SK Crown Convention",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth antialiased`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
