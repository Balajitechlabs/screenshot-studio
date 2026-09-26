import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import sharp from "sharp";
import { getMockupDefinition } from "../lib/constants/mockups";

for (const definitionId of ["iphone-17-pro-front", "iphone-17-front"]) {
  test(`${definitionId} has clean frame edges and overlapping screen coverage`, async () => {
    const definition = getMockupDefinition(definitionId);
    assert.ok(definition?.asset);
    const asset = definition.asset;
    const bounds = asset.maskScreen ?? asset.screen;
    const framePath = new URL(`../public${asset.src}`, import.meta.url);
    const maskPath = new URL(`../public${asset.maskSrc}`, import.meta.url);
    const { data: frame, info: frameInfo } = await sharp(await readFile(framePath))
      .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const { data: mask, info: maskInfo } = await sharp(await readFile(maskPath))
      .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const left = Math.round(bounds.x * frameInfo.width);
    const top = Math.round(bounds.y * frameInfo.height);
    assert.equal(Math.round(bounds.width * frameInfo.width), maskInfo.width);
    assert.equal(Math.round(bounds.height * frameInfo.height), maskInfo.height);

    let colorSpill = 0;
    for (let y = 0; y < maskInfo.height; y += 1) {
      for (let x = 0; x < maskInfo.width; x += 1) {
        const i = (y * maskInfo.width + x) * 4;
        const j = ((y + top) * frameInfo.width + x + left) * 4;
        if (mask[i + 3] > 0 && frame[j + 3] > 0
          && frame[j + 1] > frame[j + 2] + 8 && frame[j + 1] >= frame[j] - 8) colorSpill += 1;
      }
    }
    assert.equal(colorSpill, 0, "green/yellow keying residue must not return at the display edge");

    // These feathered pixels previously exposed the canvas around the island and screen.
    const samples = definitionId === "iphone-17-pro-front"
      ? [[580, 78], [580, 80], [580, 81], [50, 1200], [580, 2356]]
      : [[580, 76], [45, 1200], [580, 2360]];
    for (const [x, y] of samples) {
      const frameAlpha = frame[(y * frameInfo.width + x) * 4 + 3] / 255;
      const maskAlpha = mask[((y - top) * maskInfo.width + x - left) * 4 + 3] / 255;
      assert.ok(frameAlpha + (1 - frameAlpha) * maskAlpha > 0.995, `canvas must not leak at ${x},${y}`);
    }
    // The middle of the island stays covered by the original frame, not the app image.
    const islandX = Math.round(frameInfo.width / 2);
    const islandY = 125;
    assert.equal(mask[((islandY - top) * maskInfo.width + islandX - left) * 4 + 3], 0);
    assert.equal(frame[(islandY * frameInfo.width + islandX) * 4 + 3], 255);
  });
}
