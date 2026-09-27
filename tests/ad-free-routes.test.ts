import assert from "node:assert/strict";
import test from "node:test";
import { isAdFreePath } from "../components/AdSenseScript";

test("editor workspaces are ad free with or without a locale prefix", () => {
  for (const path of ["/editor", "/code/", "/tweet", "/store-screenshots", "/de/editor", "/ja/store-screenshots"]) {
    assert.equal(isAdFreePath(path), true, path);
  }
});

test("content pages that share a prefix with an editor route still carry ads", () => {
  for (const path of ["/", "/de", "/features/code-snippets", "/guides/editor-tips", "/code-snippets", "/xx/editor", "/editor/extra"]) {
    assert.equal(isAdFreePath(path), false, path);
  }
});
