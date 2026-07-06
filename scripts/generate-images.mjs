import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, "..", "public", "images");
const outputFile = path.join(__dirname, "..", "src", "lib", "auto-images.json");

function generate() {
  if (!fs.existsSync(imagesDir)) {
    fs.writeFileSync(outputFile, JSON.stringify([]));
    return;
  }

  const files = fs.readdirSync(imagesDir);
  
  const venueFiles = files.filter(file => {
    const isImage = file.endsWith(".webp") || file.endsWith(".jpg") || file.endsWith(".png");
    const isLogo = file.includes("logo") || file.includes("marketingko");
    const isCatering = file.includes("catering");
    return isImage && !isLogo && !isCatering;
  });

  const imageData = venueFiles.map((file, index) => {
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

  fs.writeFileSync(outputFile, JSON.stringify(imageData, null, 2));
  console.log(`Generated auto-images.json with ${imageData.length} images.`);
}

generate();
