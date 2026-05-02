import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDir = path.join("assets", "responsive");

const images = [
  {
    source: "assets/tyshone-stage-wide.jpg",
    widths: [640, 960, 1280, 1598],
    jpegQuality: 76,
    webpQuality: 72
  },
  {
    source: "assets/tyshone-pulpit.jpg",
    widths: [384, 640, 960, 1280],
    jpegQuality: 76,
    webpQuality: 72
  },
  {
    source: "assets/tyshone-portrait.jpg",
    widths: [320, 480, 720, 960],
    jpegQuality: 76,
    webpQuality: 72
  },
  {
    source: "assets/tyshone-speaking-soft.jpg",
    widths: [384, 640, 960, 1280],
    jpegQuality: 76,
    webpQuality: 72
  },
  {
    source: "assets/rolands.jpg",
    widths: [320, 480, 720, 960],
    jpegQuality: 76,
    webpQuality: 72
  },
  {
    source: "assets/tyshone-tent-speaking.jpg",
    widths: [320, 480, 720, 960],
    jpegQuality: 76,
    webpQuality: 72
  }
];

await mkdir(outputDir, { recursive: true });

for (const image of images) {
  const metadata = await sharp(image.source).metadata();
  const baseName = path.basename(image.source, path.extname(image.source));
  const widths = image.widths.filter((width) => width <= metadata.width);

  await Promise.all(
    widths.flatMap((width) => {
      const stem = path.join(outputDir, `${baseName}-${width}`);
      const pipeline = sharp(image.source).resize({ width, withoutEnlargement: true });

      return [
        pipeline
          .clone()
          .jpeg({ quality: image.jpegQuality, mozjpeg: true })
          .toFile(`${stem}.jpg`),
        pipeline
          .clone()
          .webp({ quality: image.webpQuality, effort: 6 })
          .toFile(`${stem}.webp`)
      ];
    })
  );
}
