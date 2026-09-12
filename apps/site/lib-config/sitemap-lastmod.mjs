// Builds a Map<pathname, ISO date string> from content/ frontmatter so the
// sitemap's <lastmod> reflects real edit dates instead of just "whenever the
// site was last built". Runs from astro.config.mjs, which executes as plain
// Node outside Vite/Astro's content-layer pipeline (same reason
// scripts/generate-llms.astro-site.mjs parses frontmatter by hand instead of
// importing astro:content) — duplicated here rather than shared because the
// two scripts' output shapes don't overlap enough to be worth a shared module.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseToml } from "smol-toml";

const FRONTMATTER_RE = /^\+\+\+\r?\n([\s\S]*?)\r?\n\+\+\+\r?\n?([\s\S]*)$/;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.isFile() && entry.name.endsWith(".md") ? [full] : [];
  });
}

function slugFor(dir, file) {
  const rel = path.relative(dir, file).split(path.sep).join("/");
  return rel.endsWith("/index.md") ? rel.slice(0, -"/index.md".length) : rel.slice(0, -".md".length);
}

function readEntries(typeDir) {
  return walk(typeDir)
    .map((file) => {
      const raw = fs.readFileSync(file, "utf8");
      const match = raw.match(FRONTMATTER_RE);
      if (!match) return null;
      return { slug: slugFor(typeDir, file), frontmatter: parseToml(match[1]) };
    })
    .filter(Boolean);
}

function isoOrNull(value) {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.valueOf()) ? null : d.toISOString();
}

export function buildLastmodMap(contentDir) {
  const map = new Map();

  for (const entry of readEntries(path.join(contentDir, "writings"))) {
    if (entry.frontmatter.draft) continue;
    const lastmod = isoOrNull(entry.frontmatter.updated ?? entry.frontmatter.date);
    if (lastmod) map.set(`/writings/${entry.slug}/`, lastmod);
  }

  for (const entry of readEntries(path.join(contentDir, "bookshelf"))) {
    const lastmod = isoOrNull(entry.frontmatter.date_finished ?? entry.frontmatter.date_started);
    if (lastmod) map.set(`/bookshelf/${entry.slug}/`, lastmod);
  }

  return map;
}

export function resolveContentDir(configFileUrl) {
  return path.join(path.dirname(fileURLToPath(configFileUrl)), "..", "..", "content");
}
