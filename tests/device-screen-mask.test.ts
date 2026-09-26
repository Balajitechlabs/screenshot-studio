import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DeviceShell } from "../components/mockups/DeviceShell";
import { getMockupDefinition } from "../lib/constants/mockups";
import { createDeviceScreen } from "../lib/device-mockups/layouts";

function renderScreenStyle(definitionId: string): Record<string, string> {
  const definition = getMockupDefinition(definitionId);
  assert.ok(definition?.asset);
  const markup = renderToStaticMarkup(createElement(DeviceShell, {
    definition,
    screen: createDeviceScreen("/screen.png", "screen.png", true),
    onScreenFile: () => {},
  }));
  const screenTag = markup.match(/<div\b[^>]*data-device-screen-dropzone=""[^>]*>/)?.[0];
  assert.ok(screenTag, "the actual device screen should be rendered");
  const style = screenTag.match(/style="([^"]*)"/)?.[1];
  assert.ok(style);
  return Object.fromEntries(style.split(";").filter(Boolean).map((declaration) => {
    const separator = declaration.indexOf(":");
    return [declaration.slice(0, separator), declaration.slice(separator + 1)];
  }));
}

function percent(value: string): number {
  assert.match(value, /^\d+(?:\.\d+)?%$/);
  return Number.parseFloat(value) / 100;
}

for (const definitionId of ["iphone-17-pro-front", "iphone-17-front"]) {
  test(`${definitionId} keeps the Dynamic Island mask in frame coordinates`, () => {
    const definition = getMockupDefinition(definitionId);
    assert.ok(definition?.asset);
    const screen = definition.asset.screen;
    const style = renderScreenStyle(definitionId);
    assert.equal(style["mask-position"], "center");
    assert.equal(style["-webkit-mask-size"], style["mask-size"]);
    const [maskWidth, maskHeight] = style["mask-size"].split(" ").map(percent);
    const width = percent(style.width);
    const height = percent(style.height);
    // The image still covers the bezel; its cutout must retain the asset's bounds.
    assert.ok(width > screen.width);
    assert.ok(height > screen.height);
    const maskLeft = percent(style.left) + width * (1 - maskWidth) / 2;
    const maskTop = percent(style.top) + height * (1 - maskHeight) / 2;
    for (const [actual, expected] of [
      [maskLeft, screen.x],
      [maskTop, screen.y],
      [width * maskWidth, screen.width],
      [height * maskHeight, screen.height],
    ]) {
      assert.ok(Math.abs(actual - expected) < 1e-10, `${actual} should equal ${expected}`);
    }
  });
}

test("watch and perspective masks retain their existing placement", () => {
  for (const definitionId of ["apple-watch-ultra-trail-loop", "iphone-15-perspective"]) {
    const style = renderScreenStyle(definitionId);
    assert.equal(style["mask-size"], "100% 100%");
    assert.equal(style["-webkit-mask-size"], "100% 100%");
  }
});
