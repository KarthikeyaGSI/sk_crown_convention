import { GalleryImageData } from "./sanity-data";
import autoImages from "./auto-images.json";

export function getLocalGalleryImages(): GalleryImageData[] {
  return autoImages as GalleryImageData[];
}
