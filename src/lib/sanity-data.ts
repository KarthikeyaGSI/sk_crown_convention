import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { fallbackReviews, fallbackGallery, fallbackShowcase, Review } from "./fallback-data";
import { defineQuery } from "next-sanity";


// Queries
const REVIEWS_QUERY = defineQuery(`
  *[_type == "review"] | order(_createdAt desc) {
    _id,
    author,
    rating,
    content,
    date
  }
`);

const GALLERY_QUERY = defineQuery(`
  *[_type == "galleryImage"] | order(_createdAt desc) {
    _id,
    image,
    alt
  }
`);

const SHOWCASE_QUERY = defineQuery(`
  *[_type == "showcaseEvent"] | order(_createdAt desc) {
    _id,
    image,
    title,
    description
  }
`);

export async function getReviews(): Promise<Review[]> {
  try {
    const sanityReviews = await client.fetch(REVIEWS_QUERY, {}, { next: { revalidate: 60 } });
    if (sanityReviews && sanityReviews.length > 0) {
      return sanityReviews.map((r: any) => ({
        id: r._id,
        author: r.author,
        rating: r.rating,
        content: r.content,
        date: r.date,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch reviews from Sanity, falling back to static data:", error);
  }
  return fallbackReviews;
}

export async function getGalleryImages(): Promise<string[]> {
  try {
    const sanityImages = await client.fetch(GALLERY_QUERY, {}, { next: { revalidate: 60 } });
    if (sanityImages && sanityImages.length > 0) {
      return sanityImages.map((img: any) => urlFor(img.image).url());
    }
  } catch (error) {
    console.error("Failed to fetch gallery images from Sanity, falling back to static data:", error);
  }
  return fallbackGallery;
}

export async function getShowcaseEvents(): Promise<Array<{ src: string; title: string; description: string }>> {
  try {
    const sanityEvents = await client.fetch(SHOWCASE_QUERY, {}, { next: { revalidate: 60 } });
    if (sanityEvents && sanityEvents.length > 0) {
      return sanityEvents.map((event: any) => ({
        src: urlFor(event.image).url(),
        title: event.title,
        description: event.description,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch showcase events from Sanity, falling back to static data:", error);
  }
  return fallbackShowcase;
}

