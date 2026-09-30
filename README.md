# andwati.com

Personal site: about, writing, reading and portfolio. Next.js (App Router) with Tailwind CSS v4, exported as static files and served by [static-web-server](https://static-web-server.net/).

## Develop

```sh
pnpm install
pnpm dev
```

## Content

Everything lives in `content/` as markdown with YAML frontmatter:

- `content/about.md` is the home page
- `content/writing/*.md` are posts (`title`, `description`, `date`, `tags`)
- `content/reading/*.md` are books and papers
- `content/portfolio/*.md` are projects

Covers go in `public/covers/<slug>.jpg`. Math (`$...$`), code fences, callouts and YouTube embeds are supported.

## Checks

```sh
pnpm check           # Biome (code) + Prettier and cspell (content)
pnpm format:content  # format markdown
```

A pre-commit hook runs these on staged files. Add project words to `.cspell/words.txt`.

## Analytics

Umami is loaded when both variables are set **at build time**:

```
PUBLIC_UMAMI_SCRIPT_URL=https://analytics.andwati.com/script.js
PUBLIC_UMAMI_WEBSITE_ID=...
```

## Deploy

```sh
docker build -t andwati-site \
  --build-arg PUBLIC_UMAMI_SCRIPT_URL=... \
  --build-arg PUBLIC_UMAMI_WEBSITE_ID=... .
```

The image builds the static export (`out/`) and serves it with `sws.toml` (security headers, clean URLs, `.well-known`). In Dokploy, pass the two Umami variables as build args.
