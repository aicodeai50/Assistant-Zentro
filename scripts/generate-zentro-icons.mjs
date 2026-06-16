import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const svgPath = join(root, "public/icons/zentro-mark.svg");
const svg = readFileSync(svgPath);

const sizes = [
  { file: "public/favicon.png", size: 32 },
  { file: "public/icons/icon-192.png", size: 192 },
  { file: "public/icons/icon-512.png", size: 512 },
  { file: "public/icons/icon-192-maskable.png", size: 192, padding: 0.12 },
  { file: "public/icons/icon-512-maskable.png", size: 512, padding: 0.12 },
];

for (const { file, size, padding = 0 } of sizes) {
  const out = join(root, file);
  let pipeline = sharp(svg, { density: 320 }).resize(
    Math.round(size * (1 - padding * 2)),
    Math.round(size * (1 - padding * 2)),
    { fit: "contain", background: { r: 7, g: 10, b: 18, alpha: 1 } }
  );

  if (padding > 0) {
    pipeline = pipeline.extend({
      top: Math.round(size * padding),
      bottom: Math.round(size * padding),
      left: Math.round(size * padding),
      right: Math.round(size * padding),
      background: { r: 7, g: 10, b: 18, alpha: 1 },
    });
  } else {
    pipeline = pipeline.resize(size, size, {
      fit: "contain",
      background: { r: 7, g: 10, b: 18, alpha: 1 },
    });
  }

  await pipeline.png().toFile(out);
  console.log("wrote", file);
}

// favicon.ico (multi-size) via 32px png buffer
const ico32 = await sharp(svg, { density: 320 })
  .resize(32, 32, { fit: "contain", background: { r: 7, g: 10, b: 18, alpha: 1 } })
  .png()
  .toBuffer();

writeFileSync(join(root, "public/favicon.ico"), ico32);
console.log("wrote public/favicon.ico (png-in-ico compatible)");
