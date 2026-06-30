import { mkdir, readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const distDirectory = path.join(projectRoot, "dist");
const exportDirectory = path.join(projectRoot, "exports");
const outputPath = path.join(exportDirectory, "xiaoyu-feng-portfolio.html");
const publicImagePath = "/images/mountain-background-web.jpg";

function escapeClosingTag(content, tagName) {
  return content.replaceAll(`</${tagName}`, `<\\/${tagName}`);
}

export function inlineStandaloneHtml({
  html,
  css,
  javascript,
  imagePath,
  imageDataUri
}) {
  const embeddedCss = escapeClosingTag(css.replaceAll(imagePath, imageDataUri), "style");
  const embeddedJavascript = escapeClosingTag(
    javascript.replaceAll(imagePath, imageDataUri),
    "script"
  );

  const withInlineStyles = html.replace(
    /<link\b[^>]*rel=["']stylesheet["'][^>]*href=["'][^"']+["'][^>]*>/i,
    () => `<style>${embeddedCss}</style>`
  );

  return withInlineStyles.replace(
    /<script\b[^>]*type=["']module["'][^>]*src=["'][^"']+["'][^>]*><\/script>/i,
    () => `<script type="module">${embeddedJavascript}</script>`
  );
}

async function buildStandaloneHtml() {
  const html = await readFile(path.join(distDirectory, "index.html"), "utf8");
  const stylesheetHref = html.match(
    /<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/i
  )?.[1];
  const scriptSource = html.match(
    /<script\b[^>]*type=["']module["'][^>]*src=["']([^"']+)["'][^>]*><\/script>/i
  )?.[1];

  if (!stylesheetHref || !scriptSource) {
    throw new Error("Could not locate the generated stylesheet and module script.");
  }

  const resolveDistAsset = (assetUrl) =>
    path.join(distDirectory, assetUrl.replace(/^\.?\//, ""));

  const [css, javascript, imageBytes] = await Promise.all([
    readFile(resolveDistAsset(stylesheetHref), "utf8"),
    readFile(resolveDistAsset(scriptSource), "utf8"),
    readFile(path.join(projectRoot, "public", publicImagePath.replace(/^\//, "")))
  ]);

  const imageDataUri = `data:image/jpeg;base64,${imageBytes.toString("base64")}`;
  const standaloneHtml = inlineStandaloneHtml({
    html,
    css,
    javascript,
    imagePath: publicImagePath,
    imageDataUri
  });

  await mkdir(exportDirectory, { recursive: true });
  await writeFile(outputPath, standaloneHtml, "utf8");
  console.log(`Standalone HTML created: ${outputPath}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await buildStandaloneHtml();
}
