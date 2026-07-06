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
  fallbackBookingSettings,
  fallbackFormSettings,
  fallbackVenueHighlights,
  fallbackAnnouncementBanner,
  Review,
  HeroSlideData,
  SiteSettingsData,
  HomepageData,
  ContactSettingsData,
  SeoSettingsData,
  BookingSettingsData,
  FormSettingsData,
  VenueHighlightsData,
  AnnouncementBannerData,
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
    developerCredit {
      text,
      url
    },
    googleAnalyticsId,
    googleTagManagerId,
    metaPixelId
  }
`);

const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homepage"][0] {
    heroHeading,
    heroSubheading,
    heroVideoWebmUrl,
    heroVideoMp4Url,
    heroPoster,
    heroOverlayOpacity,
    heroEnabled,
    heroOrder,
    heroCTA {
      label,
      link
    },
    heroSecondaryCTA {
      label,
      link
    },
    introSection {
      enabled,
      order,
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
      enabled,
      order,
      title,
      subtitle,
      description,
      image,
      bulletPoints
    },
    galleryPreview {
      enabled,
      order,
      title,
      subtitle
    },
    ctaBanner {
      enabled,
      order,
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
    schemaMarkup,
    address,
    phone,
    latitude,
    longitude,
    openingHours,
    faqs[]->{question, answer}
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

const BOOKING_SETTINGS_QUERY = defineQuery(`
  *[_type == "bookingSettings"][0] {
    enabled,
    message,
    availableSlots
  }
`);

const FORM_SETTINGS_QUERY = defineQuery(`
  *[_type == "formSettings"][0] {
    successMessage,
    errorMessage,
    buttonLabel,
    whatsAppTemplate,
    emailSubject
  }
`);

const VENUE_HIGHLIGHTS_QUERY = defineQuery(`
  *[_type == "venueHighlights"][0] {
    metrics[] {
      value,
      label
    }
  }
`);

const ANNOUNCEMENT_BANNER_QUERY = defineQuery(`
  *[_type == "announcementBanner"][0] {
    enabled,
    message
  }
`);

const LEGAL_PAGE_QUERY = defineQuery(`
  *[_type == "legalPage" && slug.current == $slug][0] {
    title,
    body,
    lastUpdated,
    seoTitle,
    seoDescription
  }
`);

// Helper to safely get image URL
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getImageUrl(imageAsset: any): string | undefined {
  if (!imageAsset) return undefined;
  try {
    return urlFor(imageAsset).url();
  } catch {
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
        navLinks: data.navLinks ? data.navLinks.sort((a: { order?: number }, b: { order?: number }) => (a.order || 0) - (b.order || 0)) : fallbackSiteSettings.navLinks,
        footerQuickLinks: data.footerQuickLinks || fallbackSiteSettings.footerQuickLinks,
        copyrightText: data.copyrightText || fallbackSiteSettings.copyrightText,
        developerCredit: data.developerCredit || fallbackSiteSettings.developerCredit,
        googleAnalyticsId: data.googleAnalyticsId,
        googleTagManagerId: data.googleTagManagerId,
        metaPixelId: data.metaPixelId,
      };
    }
  } catch (error) {
    console.error("Failed to fetch siteSettings from Sanity:", error);
  }
  return fallbackSiteSettings;
}

export async function getHomepage(): Promise<HomepageData> {
  try {
    const data = await client.fetch(HOMEPAGE_QUERY, {}, { next: { revalidate: 60, tags: ["homepage"] } });
    if (data) {
      return {
        heroHeading: data.heroHeading || fallbackHomepage.heroHeading,
        heroSubheading: data.heroSubheading || fallbackHomepage.heroSubheading,
        heroVideoWebmUrl: data.heroVideoWebmUrl,
        heroVideoMp4Url: data.heroVideoMp4Url,
        heroPoster: getImageUrl(data.heroPoster),
        heroOverlayOpacity: data.heroOverlayOpacity,
        heroEnabled: data.heroEnabled ?? true,
        heroOrder: data.heroOrder ?? 1,
        heroCTA: data.heroCTA || fallbackHomepage.heroCTA,
        heroSecondaryCTA: data.heroSecondaryCTA || fallbackHomepage.heroSecondaryCTA,
        introSection: {
          enabled: data.introSection?.enabled ?? true,
          order: data.introSection?.order ?? 2,
          title: data.introSection?.title || fallbackHomepage.introSection.title,
          text: data.introSection?.text || fallbackHomepage.introSection.text,
          imageUrl: getImageUrl(data.introSection?.image) || fallbackHomepage.introSection.imageUrl,
        },
        highlights: data.highlights || fallbackHomepage.highlights,
        featuredExperience: {
          enabled: data.featuredExperience?.enabled ?? true,
          order: data.featuredExperience?.order ?? 3,
          title: data.featuredExperience?.title || fallbackHomepage.featuredExperience.title,
          subtitle: data.featuredExperience?.subtitle || fallbackHomepage.featuredExperience.subtitle,
          description: data.featuredExperience?.description || fallbackHomepage.featuredExperience.description,
          imageUrl: getImageUrl(data.featuredExperience?.image) || fallbackHomepage.featuredExperience.imageUrl,
          bulletPoints: data.featuredExperience?.bulletPoints || fallbackHomepage.featuredExperience.bulletPoints,
        },
        galleryPreview: {
          enabled: data.galleryPreview?.enabled ?? true,
          order: data.galleryPreview?.order ?? 4,
          title: data.galleryPreview?.title || fallbackHomepage.galleryPreview.title,
          subtitle: data.galleryPreview?.subtitle || fallbackHomepage.galleryPreview.subtitle,
        },
        ctaBanner: {
          enabled: data.ctaBanner?.enabled ?? true,
          order: data.ctaBanner?.order ?? 5,
          title: data.ctaBanner?.title || fallbackHomepage.ctaBanner.title,
          subtitle: data.ctaBanner?.subtitle || fallbackHomepage.ctaBanner.subtitle,
          ctaLabel: data.ctaBanner?.ctaLabel || fallbackHomepage.ctaBanner.ctaLabel,
          ctaLink: data.ctaBanner?.ctaLink || fallbackHomepage.ctaBanner.ctaLink,
        },
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
        address: data.address || fallbackSeoSettings.address,
        phone: data.phone || fallbackSeoSettings.phone,
        latitude: data.latitude ?? fallbackSeoSettings.latitude,
        longitude: data.longitude ?? fallbackSeoSettings.longitude,
        openingHours: data.openingHours || fallbackSeoSettings.openingHours,
        faqs: data.faqs || fallbackSeoSettings.faqs,
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
      return data.map((slide: { 
        title: string; subtitle?: string; description?: string; desktopImage?: unknown; mobileImage?: unknown; 
        overlayOpacity?: number; ctaLabel?: string; ctaLink?: string; secondaryCtaLabel?: string; secondaryCtaLink?: string; 
      }) => ({
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
      return data.map((r: { 
        _id: string; author: string; rating: number; content: string; date?: string; 
        verified?: boolean; featured?: boolean; googleReviewUrl?: string; avatar?: unknown; location?: string; 
      }) => ({
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
      return data.map((img: { _id: string; title?: string; category?: string; image?: unknown; alt?: string; featured?: boolean }) => ({
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
  return fallbackGallery.map((item, index) => ({
    id: `gallery-fallback-${index}`,
    title: item.category,
    category: item.category,
    imageUrl: item.url,
    alt: `SK Crown Convention ${item.category}`,
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
      return data.map((event: { _id: string; image?: unknown; title: string; description: string; theme?: string; capacity?: string }) => ({
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

export async function getBookingSettings(): Promise<BookingSettingsData> {
  try {
    const data = await client.fetch(BOOKING_SETTINGS_QUERY, {}, { next: { revalidate: 60, tags: ["bookingSettings"] } });
    if (data) {
      return {
        enabled: data.enabled ?? fallbackBookingSettings.enabled,
        message: data.message,
        availableSlots: data.availableSlots || fallbackBookingSettings.availableSlots,
      };
    }
  } catch (error) {
    console.error("Failed to fetch booking settings:", error);
  }
  return fallbackBookingSettings;
}

export async function getFormSettings(): Promise<FormSettingsData> {
  try {
    const data = await client.fetch(FORM_SETTINGS_QUERY, {}, { next: { revalidate: 60, tags: ["formSettings"] } });
    if (data) {
      return {
        successMessage: data.successMessage || fallbackFormSettings.successMessage,
        errorMessage: data.errorMessage || fallbackFormSettings.errorMessage,
        buttonLabel: data.buttonLabel || fallbackFormSettings.buttonLabel,
        whatsAppTemplate: data.whatsAppTemplate || fallbackFormSettings.whatsAppTemplate,
        emailSubject: data.emailSubject || fallbackFormSettings.emailSubject,
      };
    }
  } catch (error) {
    console.error("Failed to fetch form settings:", error);
  }
  return fallbackFormSettings;
}

export async function getVenueHighlights(): Promise<VenueHighlightsData> {
  try {
    const data = await client.fetch(VENUE_HIGHLIGHTS_QUERY, {}, { next: { revalidate: 60, tags: ["venueHighlights"] } });
    if (data && data.metrics) {
      return { metrics: data.metrics };
    }
  } catch (error) {
    console.error("Failed to fetch venue highlights:", error);
  }
  return fallbackVenueHighlights;
}

export async function getAnnouncementBanner(): Promise<AnnouncementBannerData> {
  try {
    const data = await client.fetch(ANNOUNCEMENT_BANNER_QUERY, {}, { next: { revalidate: 60, tags: ["announcementBanner"] } });
    if (data) {
      return {
        enabled: data.enabled ?? false,
        message: data.message,
      };
    }
  } catch (error) {
    console.error("Failed to fetch announcement banner:", error);
  }
  return fallbackAnnouncementBanner;
}

export interface LegalPageData {
  title: string;
  body: unknown;
  lastUpdated?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export async function getLegalPage(slug: string): Promise<LegalPageData | null> {
  try {
    const data = await client.fetch(LEGAL_PAGE_QUERY, { slug }, { next: { revalidate: 3600, tags: ["legalPage"] } });
    if (data) {
      return {
        title: data.title,
        body: data.body,
        lastUpdated: data.lastUpdated,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
      };
    }
  } catch (error) {
    console.error(`Failed to fetch legal page for slug ${slug}:`, error);
  }
  return null;
}
