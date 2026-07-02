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
  metadataBase: new URL("https://skcrown.com"),
  title: "SK Crown Convention | Luxury Wedding Venue in Warangal",
  description: "Celebrate weddings, receptions, engagements and corporate events at SK Crown Convention, one of the finest luxury wedding venues in Warangal.",
  keywords: ["SK Crown Convention", "Wedding Venue Warangal", "Banquet Hall Warangal", "Luxury Convention Center", "Warangal Function Hall"],
  icons: {
    icon: "/images/sk crown entrance.webp",
    apple: "/images/sk crown entrance.webp",
  },
  openGraph: {
    title: "SK Crown Convention | Premium Wedding Venue in Warangal",
    description: "Celebrate weddings, receptions, engagements and corporate events at SK Crown Convention, one of the finest wedding venues in Warangal.",
    url: "https://skcrown.com",
    siteName: "SK Crown Convention",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/sk crown entrance.webp",
        width: 800,
        height: 600,
        alt: "SK Crown Convention Entrance",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SK Crown Convention | Premium Wedding Venue in Warangal",
    description: "Celebrate weddings, receptions, engagements and corporate events at SK Crown Convention, one of the finest wedding venues in Warangal.",
    images: ["/images/sk crown entrance.webp"],
  }
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
