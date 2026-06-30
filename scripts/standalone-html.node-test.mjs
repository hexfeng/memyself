import assert from "node:assert/strict";
import test from "node:test";
import { inlineStandaloneHtml } from "./standalone-html.mjs";

test("inlines generated assets and embeds the public background image", () => {
  const result = inlineStandaloneHtml({
    html: `<!doctype html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="/assets/site.css">
          <script type="module" src="/assets/site.js"></script>
        </head>
        <body><div id="root"></div></body>
      </html>`,
    css: `.hero { background-image: url("/images/mountain.jpg"); }`,
    javascript: `const image = "/images/mountain.jpg"; const replacementToken = "$&";`,
    imagePath: "/images/mountain.jpg",
    imageDataUri: "data:image/jpeg;base64,abc123"
  });

  assert.match(result, /<style>/);
  assert.match(result, /<script type="module">/);
  assert.match(result, /data:image\/jpeg;base64,abc123/);
  assert.match(result, /name="viewport" content="width=device-width, initial-scale=1.0"/);
  assert.doesNotMatch(result, /\/assets\/site\.(css|js)/);
  assert.doesNotMatch(result, /\/images\/mountain\.jpg/);
  assert.match(result, /replacementToken = "\$&"/);
});

test("escapes closing tags inside inlined assets", () => {
  const result = inlineStandaloneHtml({
    html: `<link rel="stylesheet" href="/assets/site.css"><script type="module" src="/assets/site.js"></script>`,
    css: `body::after { content: "</style>"; }`,
    javascript: `const marker = "</script>";`,
    imagePath: "/images/mountain.jpg",
    imageDataUri: "data:image/jpeg;base64,abc123"
  });

  assert.match(result, /<\\\/style>/);
  assert.match(result, /<\\\/script>/);
});
