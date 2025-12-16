/**
 * Favicon Generator Script
 * Generates favicons for all platforms from a source SVG/PNG icon
 *
 * Usage: npm run favicon
 *
 * By default looks for:
 *   - src/assets/images/logo-icon.svg
 *   - src/assets/images/logo-icon.png
 */

import favicons from "favicons";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const SOURCE_CANDIDATES = [
  "src/assets/images/logo-icon.svg",
  "src/assets/images/logo-icon.png",
];

const OUTPUT_DIR = "src/static";
const PARTIALS_DIR = "src/_includes/partials";

/**
 * Find the first existing source icon
 */
async function findSourceIcon() {
  for (const file of SOURCE_CANDIDATES) {
    const fullPath = path.join(rootDir, file);
    try {
      await fs.access(fullPath);
      return fullPath;
    } catch {
      // File doesn't exist, try next
    }
  }

  console.error("Error: No source icon found.");
  console.error("Please create one of the following files:");
  SOURCE_CANDIDATES.forEach((f) => console.error(`  - ${f}`));
  process.exit(1);
}

/**
 * Generate favicons from source image
 */
async function generateFavicons() {
  const src = await findSourceIcon();
  const dest = path.join(rootDir, OUTPUT_DIR);

  console.log(`Source: ${path.relative(rootDir, src)}`);
  console.log(`Output: ${OUTPUT_DIR}/`);
  console.log("");

  const config = {
    path: "/",
    appName: "FreshJuice",
    appShortName: "FreshJuice",
    appDescription: "FreshJuice 11ty Starter",
    developerName: "FreshJuice",
    developerURL: "https://freshjuice.dev/",
    background: "#ffffff",
    theme_color: "#ffffff",
    appleStatusBarStyle: "default",
    display: "standalone",
    orientation: "any",
    start_url: "/",
    version: "1.0",
    pixel_art: false,
    loadManifest: false,
    manifestMaskable: true,
    preferRelatedApplications: false,
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: false, // Heavy, disable by default
      favicons: true,
      windows: true,
      yandex: false,
    },
  };

  console.log("Generating favicons...");

  try {
    const response = await favicons(src, config);

    // Create output directory
    await fs.mkdir(dest, { recursive: true });

    // Write images
    const imageWrites = response.images.map((image) =>
      fs.writeFile(path.join(dest, image.name), image.contents)
    );
    await Promise.all(imageWrites);
    console.log(`  Generated ${response.images.length} images`);

    // Write manifest and other files
    const fileWrites = response.files.map((file) =>
      fs.writeFile(path.join(dest, file.name), file.contents)
    );
    await Promise.all(fileWrites);
    console.log(`  Generated ${response.files.length} manifest files`);

    // Write HTML snippet to partials directory
    const partialsDir = path.join(rootDir, PARTIALS_DIR);
    await fs.mkdir(partialsDir, { recursive: true });
    const htmlContent = response.html.join("\n");
    await fs.writeFile(path.join(partialsDir, "favicon-meta.njk"), htmlContent);
    console.log(`  Generated ${PARTIALS_DIR}/favicon-meta.njk`);

    console.log("");
    console.log("Done! Add to your base template <head>:");
    console.log('  {% include "partials/favicon-meta.njk" %}');
  } catch (error) {
    console.error("Error generating favicons:", error.message);
    process.exit(1);
  }
}

generateFavicons();
