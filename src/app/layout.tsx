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

import { getSiteSettings, getSeoSettings } from "@/lib/sanity-data";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings();
  const url = seo.canonicalBaseUrl || "https://skcrown.com";
  return {
    metadataBase: new URL(url),
    title: {
      default: seo.defaultTitle,
      template: `%s | ${seo.defaultTitle}`,
    },
    description: seo.defaultDescription,
    robots: seo.robots || "index, follow",
    openGraph: {
      title: seo.defaultTitle,
      description: seo.defaultDescription,
      url: url,
      siteName: seo.defaultTitle,
      locale: "en_IN",
      type: "website",
      images: seo.ogImageUrl ? [{ url: seo.ogImageUrl, alt: seo.defaultTitle }] : [{ url: "/images/logo.png" }]
    },
    twitter: {
      card: "summary_large_image",
      title: seo.defaultTitle,
      description: seo.defaultDescription,
      images: seo.ogImageUrl ? [seo.ogImageUrl] : ["/images/logo.png"],
    }
  };
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();
  const seo = await getSeoSettings();
  const favicon = siteSettings.faviconUrl || "/images/logo.png";

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth antialiased`}
    >
      <head>
        {/* Favicon Logo links for title bar tab branding */}
        <link rel="icon" href={favicon} />
        <link rel="shortcut icon" href={favicon} />
        <link rel="apple-touch-icon" href={favicon} />
        
        {seo.schemaMarkup && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: seo.schemaMarkup }}
          />
        )}
        
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
