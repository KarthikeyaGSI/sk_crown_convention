import { Metadata } from "next";
import { getLegalPage } from "@/lib/sanity-data";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings, getContactSettings } from "@/lib/sanity-data";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage("terms");
  if (!page) return {};
  
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription,
  };
}

export default async function TermsPage() {
  const page = await getLegalPage("terms");
  
  if (!page) {
    notFound();
  }

  const siteSettings = await getSiteSettings();
  const contactSettings = await getContactSettings();

  return (
    <div className="min-h-screen bg-luxury-bg text-white-soft flex flex-col font-sans">
      <Navbar siteSettings={siteSettings} contactSettings={contactSettings} />
      
      <main className="flex-grow pt-[120px] pb-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gold mb-6">{page.title}</h1>
          
          {page.lastUpdated && (
            <p className="text-sm text-muted-text mb-12">
              Last Updated: {new Date(page.lastUpdated).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}

          <div className="prose prose-invert prose-gold max-w-none prose-p:text-white-soft/80 prose-headings:text-gold prose-a:text-gold-soft hover:prose-a:text-gold prose-li:text-white-soft/80">
            {page.body ? (
              <>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <PortableText value={page.body as any} />
              </>
            ) : (
              <p>Terms and conditions content is currently unavailable.</p>
            )}
          </div>
        </div>
      </main>

      <Footer siteSettings={siteSettings} contactSettings={contactSettings} />
    </div>
  );
}
