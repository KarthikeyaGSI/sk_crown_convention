export const heroImages = [
  "/images/sk crown decor main.webp",
  "/images/sk crown entrance.webp",
  "/images/sk crown stage.webp",
  "/images/sk crown decor  4.webp",
];

export const venueImages = [
  "/images/sk crown internal.webp",
  "/images/sk crown interior seating.webp",
];

export const weddingShowcaseImages = [
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

export const experienceImages = {
  dining: "/images/sk crown dining.webp",
  catering: "/images/sk crown catering team team.webp",
  seating: "/images/sk crown seating.webp",
  entrance: "/images/sk crown entrance.webp",
  parking: "/images/sk crown parking.webp",
  parking2: "/images/sk crown parking 2.webp",
};

export const galleryImages = [
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

export const footerBackground = "/images/sk crown entrance.webp";

// Shimmer placeholder generators for Next.js Image
export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#121212" offset="20%" />
      <stop stop-color="#1e1e1e" offset="50%" />
      <stop stop-color="#121212" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#121212" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const shimmerBlurDataUrl = (w = 700, h = 475) => 
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
