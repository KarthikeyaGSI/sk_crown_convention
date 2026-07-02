import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
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
  title: "SK Crown Convention Hall A/c | Luxury Wedding Venue in Warangal",
  description: "Celebrate weddings, receptions, engagements and corporate events at SK Crown Convention Hall A/c, one of the finest luxury wedding venues on Mulug Road, Warangal. Fully climate-controlled spaces and parking.",
  keywords: [
    "SK Crown Convention Hall A/c",
    "Wedding Venue Mulug Road Warangal",
    "Marriage Hall Hanuman Junction",
    "Luxury Banquet Hall Warangal",
    "AC Convention Hall Telangana",
    "Hanuman Junction Function Hall"
  ],
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "SK Crown Convention Hall A/c | Luxury Wedding Venue in Warangal",
    description: "Celebrate weddings, receptions, engagements and corporate events at SK Crown Convention Hall A/c, one of the finest luxury wedding venues on Mulug Road, Warangal.",
    url: "https://skcrown.com",
    siteName: "SK Crown Convention Hall A/c",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/sk crown entrance.webp",
        width: 800,
        height: 600,
        alt: "SK Crown Convention Hall A/c Entrance",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SK Crown Convention Hall A/c | Luxury Wedding Venue in Warangal",
    description: "Celebrate weddings, receptions, engagements and corporate events at SK Crown Convention Hall A/c, one of the finest luxury wedding venues on Mulug Road, Warangal.",
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
      <head>
        {/* Favicon Logo links for title bar tab branding */}
        <link rel="icon" href="/images/logo.png" />
        <link rel="shortcut icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        {/* Google Tag Manager head script */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-59BVGSPR');`,
          }}
        />
        {/* Microsoft Clarity tag */}
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "xg10zak0e6");`,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) body tag */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-59BVGSPR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
