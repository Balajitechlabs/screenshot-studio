import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { guideCover, guides } from "../lib/seo/guides";

test("every guide has a cover image", () => {
  for (const guide of guides) {
    assert.ok(
      existsSync(join("public", guideCover(guide.slug))),
      `missing ${guideCover(guide.slug)}`,
    );
  }
});
