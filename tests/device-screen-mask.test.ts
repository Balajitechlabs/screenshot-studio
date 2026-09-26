import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DeviceShell } from "../components/mockups/DeviceShell";
import { getMockupDefinition } from "../lib/constants/mockups";
import { createDeviceScreen } from "../lib/device-mockups/layouts";

function style(tag: string | undefined): Record<string, string> {
  const css = tag?.match(/style="([^"]*)"/)?.[1];
  assert.ok(css);
  return Object.fromEntries(css.split(";").filter(Boolean).map((entry) => {
    const [name, ...value] = entry.split(":");
    return [name, value.join(":")];
  }));
}

for (const [id, original] of [
  ["iphone-17-pro-front", [0.043037, 0.017606, 0.913926, 0.964789]],
  ["iphone-17-front", [0.038931, 0.016248, 0.920611, 0.967873]],
] as const) {
  test(`${id} extends the mask without moving or resizing the screenshot`, () => {
    const definition = getMockupDefinition(id);
    assert.ok(definition?.asset?.maskScreen);
    const markup = renderToStaticMarkup(createElement(DeviceShell, {
      definition,
      screen: createDeviceScreen("/screen.png", "screen.png", true),
      onScreenFile: () => undefined,
    }));
    const mask = style(markup.match(/<div\b[^>]*data-device-screen-dropzone=""[^>]*>/)?.[0]);
    const image = style(markup.match(/<img\b[^>]*alt="Device screen"[^>]*>/)?.[0]);
    const percent = (value: string): number => Number.parseFloat(value) / 100;
    const [x, y, width, height] = [mask.left, mask.top, mask.width, mask.height].map(percent);
    const rendered = [x + percent(image.left) * width, y + percent(image.top) * height,
      percent(image.width) * width, percent(image.height) * height];
    const expected = [original[0] - 0.004, original[1] - 0.003, original[2] + 0.008, original[3] + 0.006];
    expected.forEach((value, i) => assert.ok(Math.abs(rendered[i] - value) < 1e-10, "screenshot placement changed"));
    const bounds = definition.asset.maskScreen;
    [bounds.x, bounds.y, bounds.width, bounds.height].forEach((value, i) => {
      assert.ok(Math.abs([x, y, width, height][i] - value) < 1e-10, "mask placement changed");
    });
    assert.equal(mask["mask-size"], "100% 100%");
    assert.equal(mask["-webkit-mask-size"], mask["mask-size"]);
  });
}
