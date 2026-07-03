import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import {
  fallbackReviews,
  fallbackGallery,
  fallbackShowcase,
  fallbackHeroSlides,
  fallbackSiteSettings,
  fallbackHomepage,
  fallbackContactSettings,
  fallbackSeoSettings,
  Review,
  HeroSlideData,
  SiteSettingsData,
  HomepageData,
  ContactSettingsData,
  SeoSettingsData,
} from "./fallback-data";
import { defineQuery } from "next-sanity";

// Queries
const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    logo,
    darkLogo,
    favicon,
    loadingLogo,
    navLinks[] {
      label,
      url,
      openInNewTab,
      order
    },
    footerQuickLinks[] {
      label,
      url
    },
    copyrightText,
    developerCredit {
      text,
      url
    }
  }
`);

const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homepage"][0] {
    heroHeading,
    heroSubheading,
    heroCTA {
      label,
      link
    },
    heroSecondaryCTA {
      label,
      link
    },
    introSection {
      title,
      text,
      image
    },
    highlights[] {
      title,
      description,
      icon
    },
    featuredExperience {
      title,
      subtitle,
      description,
      image,
      bulletPoints
    },
    galleryPreview {
      title,
      subtitle
    },
    ctaBanner {
      title,
      subtitle,
      ctaLabel,
      ctaLink
    }
  }
`);

const SEO_SETTINGS_QUERY = defineQuery(`
  *[_type == "seoSettings"][0] {
    defaultTitle,
    defaultDescription,
    ogImage,
    canonicalBaseUrl,
    robots,
    schemaMarkup
  }
`);

const CONTACT_SETTINGS_QUERY = defineQuery(`
  *[_type == "contactSettings"][0] {
    phone,
    whatsApp,
    email,
    address,
    googleMapsLink,
    latitude,
    longitude,
    openingHours,
    emergencyContact,
    instagram,
    facebook,
    youtube,
    linkedin
  }
`);

const HERO_SLIDES_QUERY = defineQuery(`
  *[_type == "heroSlide" && active == true] | order(order asc) {
    _id,
    title,
    subtitle,
    description,
    desktopImage,
    mobileImage,
    overlayOpacity,
    ctaLabel,
    ctaLink,
    secondaryCtaLabel,
    secondaryCtaLink
  }
`);

const REVIEWS_QUERY = defineQuery(`
  *[_type == "review"] | order(order asc, _createdAt desc) {
    _id,
    author,
    rating,
    content,
    date,
    verified,
    featured,
    googleReviewUrl,
    avatar,
    location
  }
`);

const GALLERY_QUERY = defineQuery(`
  *[_type == "galleryImage"] | order(order asc, _createdAt desc) {
    _id,
    title,
    category,
    image,
    alt,
    featured
  }
`);

const SHOWCASE_QUERY = defineQuery(`
  *[_type == "showcaseEvent" && featured == true] | order(order asc, _createdAt desc) {
    _id,
    title,
    description,
    image,
    theme,
    capacity
  }
`);

// Helper to safely get image URL
function getImageUrl(imageAsset: any): string | undefined {
  if (!imageAsset) return undefined;
  try {
    return urlFor(imageAsset).url();
  } catch (e) {
    return undefined;
  }
}

// Fetching functions

export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const data = await client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60, tags: ["siteSettings"] } });
    if (data) {
      return {
        logoUrl: getImageUrl(data.logo) || fallbackSiteSettings.logoUrl,
        darkLogoUrl: getImageUrl(data.darkLogo),
        faviconUrl: getImageUrl(data.favicon),
        loadingLogoUrl: getImageUrl(data.loadingLogo),
        navLinks: data.navLinks ? data.navLinks.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) : fallbackSiteSettings.navLinks,
        footerQuickLinks: data.footerQuickLinks || fallbackSiteSettings.footerQuickLinks,
        copyrightText: data.copyrightText || fallbackSiteSettings.copyrightText,
        developerCredit: data.developerCredit || fallbackSiteSettings.developerCredit,
      };
    }
  } catch (error) {
    console.error("Failed to fetch siteSettings from Sanity:", error);
  }
  return fallbackSiteSettings;
}

export async function getHomepage(): Promise<HomepageData> {
  try {
    console.log("SANITY CLIENT CONFIG:", { projectId: client.config().projectId, dataset: client.config().dataset, useCdn: client.config().useCdn });
    const data = await client.fetch(HOMEPAGE_QUERY, {}, { next: { revalidate: 60, tags: ["homepage"] } });
    console.log("SANITY HOMEPAGE DATA FETCHED:", data);
    if (data) {
      return {
        heroHeading: data.heroHeading || fallbackHomepage.heroHeading,
        heroSubheading: data.heroSubheading || fallbackHomepage.heroSubheading,
        heroCTA: data.heroCTA || fallbackHomepage.heroCTA,
        heroSecondaryCTA: data.heroSecondaryCTA || fallbackHomepage.heroSecondaryCTA,
        introSection: {
          title: data.introSection?.title || fallbackHomepage.introSection.title,
          text: data.introSection?.text || fallbackHomepage.introSection.text,
          imageUrl: getImageUrl(data.introSection?.image) || fallbackHomepage.introSection.imageUrl,
        },
        highlights: data.highlights || fallbackHomepage.highlights,
        featuredExperience: {
          title: data.featuredExperience?.title || fallbackHomepage.featuredExperience.title,
          subtitle: data.featuredExperience?.subtitle || fallbackHomepage.featuredExperience.subtitle,
          description: data.featuredExperience?.description || fallbackHomepage.featuredExperience.description,
          imageUrl: getImageUrl(data.featuredExperience?.image) || fallbackHomepage.featuredExperience.imageUrl,
          bulletPoints: data.featuredExperience?.bulletPoints || fallbackHomepage.featuredExperience.bulletPoints,
        },
        galleryPreview: data.galleryPreview || fallbackHomepage.galleryPreview,
        ctaBanner: data.ctaBanner || fallbackHomepage.ctaBanner,
      };
    }
  } catch (error) {
    console.error("Failed to fetch homepage settings from Sanity:", error);
  }
  return fallbackHomepage;
}

export async function getSeoSettings(): Promise<SeoSettingsData> {
  try {
    const data = await client.fetch(SEO_SETTINGS_QUERY, {}, { next: { revalidate: 60, tags: ["seo"] } });
    if (data) {
      return {
        defaultTitle: data.defaultTitle || fallbackSeoSettings.defaultTitle,
        defaultDescription: data.defaultDescription || fallbackSeoSettings.defaultDescription,
        ogImageUrl: getImageUrl(data.ogImage),
        canonicalBaseUrl: data.canonicalBaseUrl || fallbackSeoSettings.canonicalBaseUrl,
        robots: data.robots || fallbackSeoSettings.robots,
        schemaMarkup: data.schemaMarkup,
      };
    }
  } catch (error) {
    console.error("Failed to fetch seoSettings from Sanity:", error);
  }
  return fallbackSeoSettings;
}

export async function getContactSettings(): Promise<ContactSettingsData> {
  try {
    const data = await client.fetch(CONTACT_SETTINGS_QUERY, {}, { next: { revalidate: 60, tags: ["contact"] } });
    if (data) {
      return {
        phone: data.phone || fallbackContactSettings.phone,
        whatsApp: data.whatsApp || fallbackContactSettings.whatsApp,
        email: data.email || fallbackContactSettings.email,
        address: data.address || fallbackContactSettings.address,
        googleMapsLink: data.googleMapsLink || fallbackContactSettings.googleMapsLink,
        latitude: data.latitude,
        longitude: data.longitude,
        openingHours: data.openingHours || fallbackContactSettings.openingHours,
        emergencyContact: data.emergencyContact,
        instagram: data.instagram || fallbackContactSettings.instagram,
        facebook: data.facebook,
        youtube: data.youtube,
        linkedin: data.linkedin,
      };
    }
  } catch (error) {
    console.error("Failed to fetch contactSettings from Sanity:", error);
  }
  return fallbackContactSettings;
}

export async function getHeroSlides(): Promise<HeroSlideData[]> {
  try {
    const data = await client.fetch(HERO_SLIDES_QUERY, {}, { next: { revalidate: 60, tags: ["hero"] } });
    if (data && data.length > 0) {
      return data.map((slide: any) => ({
        title: slide.title,
        subtitle: slide.subtitle,
        description: slide.description,
        imageUrl: getImageUrl(slide.desktopImage) || fallbackHeroSlides[0].imageUrl,
        mobileImageUrl: getImageUrl(slide.mobileImage),
        overlayOpacity: slide.overlayOpacity,
        ctaLabel: slide.ctaLabel,
        ctaLink: slide.ctaLink,
        secondaryCtaLabel: slide.secondaryCtaLabel,
        secondaryCtaLink: slide.secondaryCtaLink,
      }));
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch heroSlides from Sanity:", error);
    return fallbackHeroSlides;
  }
}

export async function getReviews(): Promise<Review[]> {
  try {
    const data = await client.fetch(REVIEWS_QUERY, {}, { next: { revalidate: 60, tags: ["reviews"] } });
    if (data && data.length > 0) {
      return data.map((r: any) => ({
        id: r._id,
        author: r.author,
        rating: r.rating,
        content: r.content,
        date: r.date,
        verified: r.verified,
        featured: r.featured,
        googleReviewUrl: r.googleReviewUrl,
        avatarUrl: getImageUrl(r.avatar),
        location: r.location,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch reviews from Sanity, falling back to static data:", error);
  }
  return fallbackReviews;
}

export interface GalleryImageData {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  alt: string;
  featured?: boolean;
}

export async function getGalleryImages(): Promise<GalleryImageData[]> {
  try {
    const data = await client.fetch(GALLERY_QUERY, {}, { next: { revalidate: 60, tags: ["gallery"] } });
    if (data && data.length > 0) {
      return data.map((img: any) => ({
        id: img._id,
        title: img.title || "Gallery Image",
        category: img.category || "Wedding",
        imageUrl: getImageUrl(img.image) || "",
        alt: img.alt || "SK Crown Convention",
        featured: img.featured,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch gallery images from Sanity, falling back to static data:", error);
  }
  // Convert basic string gallery to array of objects for fallback
  return fallbackGallery.map((url, index) => ({
    id: `gallery-fallback-${index}`,
    title: "Gallery Image",
    category: index % 3 === 0 ? "Wedding" : index % 3 === 1 ? "Reception" : "Dining",
    imageUrl: url,
    alt: "SK Crown Convention",
    featured: false,
  }));
}

export interface ShowcaseEventData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  theme?: string;
  capacity?: string;
}

export async function getShowcaseEvents(): Promise<ShowcaseEventData[]> {
  try {
    const data = await client.fetch(SHOWCASE_QUERY, {}, { next: { revalidate: 60, tags: ["showcase"] } });
    if (data && data.length > 0) {
      return data.map((event: any) => ({
        id: event._id,
        imageUrl: getImageUrl(event.image) || "",
        title: event.title,
        description: event.description,
        theme: event.theme,
        capacity: event.capacity,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch showcase events from Sanity, falling back to static data:", error);
  }
  return fallbackShowcase.map((event, index) => ({
    id: `showcase-fallback-${index}`,
    imageUrl: event.src,
    title: event.title,
    description: event.description,
  }));
}
