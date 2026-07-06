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

import { getSiteSettings, getSeoSettings, getContactSettings } from "@/lib/sanity-data";
import Preloader from "@/components/Preloader";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { getWhatsAppLink } from "@/lib/whatsapp";

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
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: seo.defaultTitle,
      description: seo.defaultDescription,
      url: url,
      siteName: seo.defaultTitle,
      locale: "en_IN",
      type: "website",
      images: seo.ogImageUrl ? [{ url: seo.ogImageUrl, alt: seo.defaultTitle }] : [{ url: "/images/logo.webp", alt: seo.defaultTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.defaultTitle,
      description: seo.defaultDescription,
      images: seo.ogImageUrl ? [seo.ogImageUrl] : ["/images/logo.webp"],
    },
    verification: {
      google: "YOUR_GOOGLE_VERIFICATION_CODE", // Prompting user or leaving placeholder
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
  const contactSettings = await getContactSettings();
  const favicon = siteSettings.faviconUrl || "/images/logo.webp";
  const url = seo.canonicalBaseUrl || "https://skcrown.com";

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
        {seo.faqs && seo.faqs.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": seo.faqs.map((f: { question: string; answer: string }) => ({
                  "@type": "Question",
                  "name": f.question,
                  "acceptedAnswer": { "@type": "Answer", "text": f.answer },
                })),
              })
            }}
          />
        )}
        {seo.address && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": ["EventVenue", "LocalBusiness"],
                "name": seo.defaultTitle,
                "url": url,
                "image": seo.ogImageUrl || `${url}/images/logo.webp`,
                "address": { "@type": "PostalAddress", "streetAddress": seo.address, "addressLocality": "Warangal", "addressRegion": "TS", "addressCountry": "IN" },
                "telephone": seo.phone,
                "geo": { "@type": "GeoCoordinates", "latitude": seo.latitude, "longitude": seo.longitude },
                "openingHours": seo.openingHours,
                "priceRange": "$$",
                "description": seo.defaultDescription,
              })
            }}
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
})(window,document,'script','dataLayer','${siteSettings.googleTagManagerId || 'GTM-XXXXXXX'}');`,
          }}
        />

        {/* Google Analytics */}
        {siteSettings.googleAnalyticsId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${siteSettings.googleAnalyticsId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${siteSettings.googleAnalyticsId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Meta Pixel */}
        {siteSettings.metaPixelId && (
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${siteSettings.metaPixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}

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
            src={`https://www.googletagmanager.com/ns.html?id=${siteSettings.googleTagManagerId || 'GTM-XXXXXXX'}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {siteSettings.metaPixelId && (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img height="1" width="1" style={{ display: 'none' }}
                 src={`https://www.facebook.com/tr?id=${siteSettings.metaPixelId}&ev=PageView&noscript=1`}
                 alt="Meta Pixel"
            />
          </noscript>
        )}
        
        
        <Preloader />
        <FloatingWhatsApp whatsAppUrl={getWhatsAppLink(contactSettings.whatsApp, contactSettings.phone)} />
        
        {children}
      </body>
    </html>
  );
}
