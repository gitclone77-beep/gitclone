import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const assets = [
  ["public/brand/logo-full.svg", "public/brand/logo-full.png", 900, 260],
  ["public/brand/logo-symbol.svg", "public/brand/logo-symbol.png", 512, 512],
  ["public/brand/favicon.svg", "public/brand/favicon.png", 128, 128],
  ["public/brand/icon-repo.svg", "public/brand/icon-repo.png", 512, 512],
  ["public/brand/icon-branch.svg", "public/brand/icon-branch.png", 512, 512],
  ["public/brand/icon-commit.svg", "public/brand/icon-commit.png", 512, 512],
  ["public/brand/icon-pull-request.svg", "public/brand/icon-pull-request.png", 512, 512],
  ["public/brand/og-image.svg", "public/brand/og-image.png", 1200, 630]
];

await Promise.all(
  assets.map(async ([source, target, width, height]) => {
    const sourcePath = join(root, source);
    const targetPath = join(root, target);

    await mkdir(dirname(targetPath), { recursive: true });
    await sharp(sourcePath, { density: 384 })
      .resize(width, height, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(targetPath);
  })
);

console.log(`Generated ${assets.length} GitClone brand assets.`);
