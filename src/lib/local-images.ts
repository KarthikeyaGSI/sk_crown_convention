import fs from "fs";
import path from "path";
import { GalleryImageData } from "./sanity-data";

export function getLocalGalleryImages(): GalleryImageData[] {
  try {
    const imagesDir = path.join(process.cwd(), "public", "images");
    if (!fs.existsSync(imagesDir)) return [];

    const files = fs.readdirSync(imagesDir);
    
    // Filter out non-venue images like logos
    const venueFiles = files.filter(file => {
      const isImage = file.endsWith(".webp") || file.endsWith(".jpg") || file.endsWith(".png");
      const isLogo = file.includes("logo") || file.includes("marketingko");
      const isCatering = file.includes("catering"); // handled separately as featured
      return isImage && !isLogo && !isCatering;
    });

    return venueFiles.map((file, index) => {
      // Auto categorize based on filename
      let category = "Venue";
      const name = file.toLowerCase();
      
      if (name.includes("decor")) category = "Wedding Decor";
      else if (name.includes("stage")) category = "Stage";
      else if (name.includes("dining")) category = "Dining";
      else if (name.includes("seat")) category = "Seating";
      else if (name.includes("park")) category = "Parking";
      else if (name.includes("interior") || name.includes("internal")) category = "Interior";
      else if (name.includes("entrance")) category = "Exterior";
      else if (name.includes("cater")) category = "Catering";

      // Make a readable title
      const title = file
        .replace(/\.(webp|jpg|png)$/i, "")
        .replace(/sk crown/i, "")
        .replace(/[-_]/g, " ")
        .trim()
        .replace(/\b\w/g, l => l.toUpperCase());

      return {
        id: `local-${index}`,
        title: title || "Convention Hall Space",
        category,
        imageUrl: `/images/${file}`,
        alt: `SK Crown Convention ${title}`,
        featured: false,
      };
    });
  } catch (error) {
    console.error("Failed to read local images:", error);
    return [];
  }
}
