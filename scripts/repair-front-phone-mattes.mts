import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Pixel origins of the original licensed masks inside their corresponding frame PNGs.
// Source revision: dc2c42dc3419750038e8bbf2f429ab22286e4779.
const originals = [
  { id: "iphone-17-pro-front", left: 50, top: 42, frameWidth: 1165, maskWidth: 1065, maskHeight: 2315 },
  { id: "iphone-17-front", left: 45, top: 39, frameWidth: 1161, maskWidth: 1069, maskHeight: 2323 },
];

// Use the original, unmodified PNGs as inputs; never repeatedly dilate repaired masks.
// node --import tsx scripts/repair-front-phone-mattes.mts <original-assets-dir> <output-dir>
const [sourceDir, outputDir] = process.argv.slice(2);
if (!sourceDir || !outputDir || path.resolve(sourceDir) === path.resolve(outputDir)) {
  throw new Error("Provide separate original-assets and output directories.");
}
await mkdir(outputDir, { recursive: true });

for (const original of originals) {
  const frameName = `${original.id}.png`;
  const maskName = `${original.id}-screen-mask.png`;
  const { data: frame, info: frameInfo } = await sharp(path.join(sourceDir, frameName))
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { data: mask, info: maskInfo } = await sharp(path.join(sourceDir, maskName))
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  if (frameInfo.width !== original.frameWidth || frameInfo.height !== 2400
    || maskInfo.width !== original.maskWidth || maskInfo.height !== original.maskHeight
    || frameInfo.channels !== 4 || maskInfo.channels !== 4) {
    throw new Error(`Unexpected source dimensions or channels for ${original.id}; use the original assets.`);
  }
  const overlap = 6;
  const width = maskInfo.width + overlap * 2;
  const height = maskInfo.height + overlap * 2;
  const sourceAlpha = Buffer.alloc(width * height);
  for (let y = 0; y < maskInfo.height; y += 1) {
    for (let x = 0; x < maskInfo.width; x += 1) {
      sourceAlpha[(y + overlap) * width + x + overlap] = mask[(y * maskInfo.width + x) * 4 + 3];
    }
  }
  const horizontal = Buffer.alloc(sourceAlpha.length);
  const alpha = Buffer.alloc(sourceAlpha.length);
  // Expand white alpha coverage with a maximum filter, preserving edge feathering.
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let maximum = 0;
      for (let dx = -overlap; dx <= overlap; dx += 1) {
        const sampleX = Math.max(0, Math.min(width - 1, x + dx));
        maximum = Math.max(maximum, sourceAlpha[y * width + sampleX]);
      }
      horizontal[y * width + x] = maximum;
    }
  }
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let maximum = 0;
      for (let dy = -overlap; dy <= overlap; dy += 1) {
        const sampleY = Math.max(0, Math.min(height - 1, y + dy));
        maximum = Math.max(maximum, horizontal[sampleY * width + x]);
      }
      alpha[y * width + x] = maximum;
    }
  }
  const left = original.left - overlap;
  const top = original.top - overlap;
  const repairedMask = Buffer.alloc(width * height * 4, 255);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const pixel = y * width + x;
      const maskIndex = pixel * 4;
      const frameIndex = ((y + top) * frameInfo.width + x + left) * 4;
      repairedMask[maskIndex + 3] = alpha[pixel];
      if (sourceAlpha[pixel] === 255) {
        // The clear display contains no frame detail; remove stray keying speckles.
        frame.fill(0, frameIndex, frameIndex + 4);
      } else if (alpha[pixel] > 0) {
        const red = frame[frameIndex];
        const green = frame[frameIndex + 1];
        const blue = frame[frameIndex + 2];
        if (green > blue + 8 && green >= red - 8) {
          if (green > 110 || sourceAlpha[pixel] >= 128) {
            frame.fill(0, frameIndex, frameIndex + 4);
            continue;
          }
          // Neutralize yellow/green key spill at the glass and island boundaries.
          const neutral = Math.min(red, green, blue);
          frame[frameIndex] = frame[frameIndex + 1] = frame[frameIndex + 2] = neutral;
        }
      }
    }
  }

  // The mask now overlaps the feathered frame edge; the PNG still defines its shape.
  await sharp(frame, { raw: frameInfo }).png({ compressionLevel: 9 }).toFile(path.join(outputDir, frameName));
  await sharp(repairedMask, { raw: { width, height, channels: 4 } }).png({ compressionLevel: 9 }).toFile(path.join(outputDir, maskName));
  console.log(original.id, { x: left / frameInfo.width, y: top / frameInfo.height, width: width / frameInfo.width, height: height / frameInfo.height });
}
