import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { siteConfig } from "../site.config";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(context: APIContext) {
  const site = (context.site ?? new URL(siteConfig.baseUrl)).href.replace(/\/$/, "");

  const writings = (
    await getCollection("writings", ({ data }) => !data.draft)
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const updated = writings[0]?.data.updated ?? writings[0]?.data.date ?? new Date();

  const entries = writings
    .map((entry) => {
      const url = `${site}/writings/${entry.id}/`;
      const published = entry.data.date.toISOString();
      const entryUpdated = (entry.data.updated ?? entry.data.date).toISOString();
      const categories = (entry.data.taxonomies?.tags ?? [])
        .map((tag) => `<category term="${escapeXml(tag)}" />`)
        .join("");
      return `
  <entry>
    <title>${escapeXml(entry.data.title)}</title>
    <link href="${url}" />
    <id>${url}</id>
    <published>${published}</published>
    <updated>${entryUpdated}</updated>
    ${entry.data.description ? `<summary>${escapeXml(entry.data.description)}</summary>` : ""}
    <author><name>${escapeXml(entry.data.author ?? siteConfig.author)}</name></author>
    ${categories}
  </entry>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(siteConfig.title)}</title>
  <subtitle>${escapeXml(siteConfig.description)}</subtitle>
  <link href="${site}/atom.xml" rel="self" />
  <link href="${site}/" />
  <id>${site}/</id>
  <updated>${updated.toISOString()}</updated>
  ${entries}
</feed>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
  });
}
