// Centralized static fallback data for SK Crown Convention

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  verified?: boolean;
  featured?: boolean;
  order?: number;
  googleReviewUrl?: string;
  avatarUrl?: string;
  location?: string;
}

export interface HeroSlideData {
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  overlayOpacity?: number;
  ctaLabel?: string;
  ctaLink?: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
}

export interface SiteSettingsData {
  logoUrl: string;
  darkLogoUrl?: string;
  faviconUrl?: string;
  loadingLogoUrl?: string;
  navLinks: Array<{ label: string; url: string; openInNewTab?: boolean; order?: number }>;
  footerQuickLinks: Array<{ label: string; url: string }>;
  copyrightText: string;
  developerCredit?: { text: string; url: string };
}

export interface HomepageData {
  heroHeading: string;
  heroSubheading: string;
  heroCTA: { label: string; link: string };
  heroSecondaryCTA: { label: string; link: string };
  introSection: { title: string; text: string; imageUrl: string };
  highlights: Array<{ title: string; description: string; icon?: string }>;
  featuredExperience: {
    title: string;
    subtitle?: string;
    description: string;
    imageUrl: string;
    bulletPoints?: string[];
  };
  galleryPreview: { title: string; subtitle?: string };
  ctaBanner: { title: string; subtitle?: string; ctaLabel: string; ctaLink: string };
}

export interface ContactSettingsData {
  phone: string;
  whatsApp?: string;
  email: string;
  address: string;
  googleMapsLink?: string;
  latitude?: number;
  longitude?: number;
  openingHours?: string;
  emergencyContact?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
}

export interface SeoSettingsData {
  defaultTitle: string;
  defaultDescription: string;
  ogImageUrl?: string;
  canonicalBaseUrl: string;
  robots?: string;
  schemaMarkup?: string;
}

export const fallbackHero = [
  "/images/sk crown decor main.webp",
  "/images/sk crown entrance.webp",
  "/images/sk crown stage.webp",
  "/images/sk crown decor  4.webp",
];

export const fallbackHeroSlides: HeroSlideData[] = [
  {
    title: "Luxurious Celebrations",
    subtitle: "Where Dreams Meet Grandeur",
    description: "Welcome to Warangal's premier air-conditioned convention center, designed for weddings, banquets, and grand celebrations.",
    imageUrl: "/images/sk crown decor main.webp",
    ctaLabel: "Plan Your Event",
    ctaLink: "/contact",
    secondaryCtaLabel: "Explore Space",
    secondaryCtaLink: "/experience",
  },
  {
    title: "Majestic Grand Entrance",
    subtitle: "A Royal Welcome Awaits",
    description: "Make an unforgettable impression on your guests from the moment they step into our beautifully illuminated entryways.",
    imageUrl: "/images/sk crown entrance.webp",
    ctaLabel: "View Gallery",
    ctaLink: "/gallery",
  },
  {
    title: "Opulent Floral Stages",
    subtitle: "Crafted with Floral Magic",
    description: "Our dedicated panel of wedding planners and decorators customize every detail to match your unique celebration vision.",
    imageUrl: "/images/sk crown stage.webp",
    ctaLabel: "Read Reviews",
    ctaLink: "/reviews",
  },
];

export const fallbackVenue = [
  "/images/sk crown internal.webp",
  "/images/sk crown interior seating.webp",
];

export const fallbackShowcase = [
  {
    src: "/images/sk crown stage.webp",
    title: "Grand Wedding Stage Setup",
    description: "Opulent floral backdrops and premium lighting systems.",
  },
  {
    src: "/images/sk crown decor.webp",
    title: "Royal Aisle Decoration",
    description: "Stunning pathways curated with custom floral arrangements.",
  },
  {
    src: "/images/sk crown decor 3.webp",
    title: "Elegant Mandap Decor",
    description: "Blending traditional accents with modern luxury aesthetics.",
  },
  {
    src: "/images/sk crown decor  _.webp",
    title: "Premium Foyer Accent",
    description: "Welcome areas designed to make an unforgettable first impression.",
  },
  {
    src: "/images/sk crown decor __.webp",
    title: "Luxury Banquet Setting",
    description: "Intricately detailed centerpieces and premium tableware.",
  },
  {
    src: "/images/sk crown decor  34.webp",
    title: "Ambient Evening Decor",
    description: "Soft warm illumination setting a romantic celebration vibe.",
  },
];

export const fallbackExperience = {
  dining: "/images/sk crown dining.webp",
  catering: "/images/sk crown catering team team.webp",
  seating: "/images/sk crown seating.webp",
  entrance: "/images/sk crown entrance.webp",
  parking: "/images/sk crown parking.webp",
  parking2: "/images/sk crown parking 2.webp",
};

export const fallbackGallery = [
  "/images/sk crown decor main.webp",
  "/images/sk crown entrance.webp",
  "/images/sk crown stage.webp",
  "/images/sk crown decor.webp",
  "/images/sk crown decor 3.webp",
  "/images/sk crown decor 4.webp",
  "/images/sk crown decor  _.webp",
  "/images/sk crown decor __.webp",
  "/images/sk crown decor  34.webp",
  "/images/sk crown internal.webp",
  "/images/sk crown interior seating.webp",
  "/images/sk crown dining.webp",
];

export const fallbackFooterBackground = "/images/sk crown entrance.webp";

export const fallbackReviews: Review[] = [
  {
    id: "review-1",
    author: "Mohammad Muddassir",
    rating: 5,
    content: "Lovely place.. Big halls, good dining hall... Large kitchen. Spacious parking place...",
    date: "5 months ago",
  },
  {
    id: "review-2",
    author: "KHAJA KAMALUDDIN",
    rating: 5,
    content: "We recently hosted our wedding at SK CROWN CONVENTION and it exceeded all our expectations! The venue itself is stunning, with elegant décor and spacious halls that perfectly accommodated our guests. The lighting, floral arrangements, and overall ambiance created a magical atmosphere.",
    date: "a year ago",
  },
  {
    id: "review-3",
    author: "Shahrukh Mohammed",
    rating: 5,
    content: "Attended a Valima here, and the experience was fantastic. The hall is spacious, beautifully decorated, and perfect for large events. The staff was attentive, and the service was seamless. Highly recommend for weddings or any special occasion!",
    date: "a year ago",
  },
  {
    id: "review-4",
    author: "Søhail Môhd",
    rating: 5,
    content: "Beautiful Places for weddings and special occasions perfect ambience and cool place",
    date: "10 months ago",
  },
  {
    id: "review-5",
    author: "Sampoorna Bandari",
    rating: 5,
    content: "Nice hall...near mulugu road...government bus service also available... u can board bus in wgl or hnk bus stand and you can get down here... it is on main road only... 👍🏻👍🏻👍🏻",
    date: "7 months ago",
  },
];

export const fallbackSiteSettings: SiteSettingsData = {
  logoUrl: "/images/logo.png",
  copyrightText: "© 2026 SK Crown Convention. All Rights Reserved.",
  navLinks: [
    { label: "Home", url: "/" },
    { label: "About", url: "/about" },
    { label: "Experience", url: "/experience" },
    { label: "Gallery", url: "/gallery" },
    { label: "Reviews", url: "/reviews" },
    { label: "Plan Your Visit", url: "/visit" },
  ],
  footerQuickLinks: [
    { label: "Home", url: "/" },
    { label: "About", url: "/about" },
    { label: "Experience", url: "/experience" },
    { label: "Gallery", url: "/gallery" },
    { label: "Reviews", url: "/reviews" },
  ],
  developerCredit: {
    text: "Powered by MarketingKo Labs",
    url: "#",
  },
};

export const fallbackHomepage: HomepageData = {
  heroHeading: "Grand Celebrations",
  heroSubheading: "Where Elegance Meets Extraordinary Banqueting",
  heroCTA: { label: "Book Venue", link: "/contact" },
  heroSecondaryCTA: { label: "Explore Experience", link: "/experience" },
  introSection: {
    title: "Welcome to SK Crown Convention",
    text: "Experience the epitome of luxury celebration space in Warangal. Designed for grand weddings, grand receptions, cultural events, corporate banquets, and intimate family gatherings, SK Crown Convention provides unparalleled luxury, fully air-conditioned spaces, professional lighting systems, and expansive parking areas.",
    imageUrl: "/images/sk crown decor main.webp",
  },
  highlights: [
    { title: "Capacity", description: "Accommodates up to 3,000 guests comfortably", icon: "Users" },
    { title: "24/7 Access", description: "Round-the-clock availability for seamless events", icon: "Flame" },
    { title: "Massive Parking", description: "Dedicated secure space for 500+ vehicles", icon: "Car" },
    { title: "Air Conditioned", description: "Fully climate-controlled indoor halls", icon: "Shield" },
  ],
  featuredExperience: {
    title: "A Premium Luxury Setting",
    subtitle: "Designed for Unforgettable Moments",
    description: "Every corner of SK Crown Convention is designed to express luxury and comfort. From our state-of-the-art stage setups and royal aisle decorations to our massive centralized AC banqueting layouts, we ensure your wedding is a masterclass in hospitality.",
    imageUrl: "/images/sk crown stage.webp",
    bulletPoints: [
      "Spacious Dining Hall for over 1,000 guests simultaneously",
      "Expansive professional catering kitchens",
      "Elegant green rooms and executive bridal suites",
      "Stunning ambient lighting and acoustics",
    ],
  },
  galleryPreview: {
    title: "Snapshots of Splendor",
    subtitle: "A glimpse into our host of luxurious decor settings, grand entrances, and memorable setups.",
  },
  ctaBanner: {
    title: "Ready to Plan Your Dream Event?",
    subtitle: "Book a personal consultation or tour of our facility to start your planning journey.",
    ctaLabel: "Get In Touch",
    ctaLink: "/contact",
  },
};

export const fallbackContactSettings: ContactSettingsData = {
  phone: "+91 7070709661, +91 7900775577",
  whatsApp: "https://wa.me/917070709661",
  email: "skcrown700@gmail.com",
  address: "Sk crown Mulug Road, Near Hp Petrol Station, Hanuman Junction, Warangal, India 506006",
  googleMapsLink: "https://maps.app.goo.gl/EVGcvP6fjXupsRUd6",
  latitude: 18.0264,
  longitude: 79.6201,
  openingHours: "Open 24/7 for Bookings & Events",
  instagram: "https://www.instagram.com/skcrownconvention",
};

export const fallbackSeoSettings: SeoSettingsData = {
  defaultTitle: "SK Crown Convention Hall | Premium Wedding & Event Venue in Warangal",
  defaultDescription: "Host your dream weddings and celebrations at SK Crown Convention. Located on Mulug Road, Warangal. High capacity, Centralized AC, and parking for 500+ cars.",
  canonicalBaseUrl: "https://skcrownconvention.com",
};
