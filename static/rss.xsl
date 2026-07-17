<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> — RSS Feed</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          :root {
            --bg-color: #e9e9e2;
            --surface-color: #dedecf;
            --text-color: #17181c;
            --text-muted: #68675f;
            --accent-color: #b42318;
            --accent-hover: #8e1b12;
            --border-color: rgba(23, 24, 28, 0.16);

            --font-sans: Georgia, 'Source Serif 4', serif;
            --font-display: Georgia, 'IBM Plex Serif', serif;
            --font-mono: ui-monospace, 'JetBrains Mono', 'SFMono-Regular', Menlo, monospace;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --bg-color: #131311;
              --surface-color: #1b1a17;
              --text-color: #e9e7de;
              --text-muted: #8b8a80;
              --accent-color: #ff5a46;
              --accent-hover: #ff7c6b;
              --border-color: rgba(233, 231, 222, 0.14);
            }
          }
          * {
            box-sizing: border-box;
          }
          body {
            font-family: var(--font-sans);
            background-color: var(--bg-color);
            color: var(--text-color);
            line-height: 1.6;
            margin: 0;
            padding: 3rem 1.5rem;
          }
          .wrap {
            max-width: 720px;
            margin: 0 auto;
          }
          a {
            color: var(--accent-color);
            text-decoration: none;
          }
          a:hover {
            color: var(--accent-hover);
            text-decoration: underline;
          }
          .header {
            margin-bottom: 2.5rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--border-color);
          }
          .header h1 {
            font-family: var(--font-display);
            font-size: 2rem;
            font-weight: 700;
            margin: 0 0 0.5rem 0;
            color: var(--text-color);
          }
          .header p {
            font-size: 1.05rem;
            margin: 0;
            color: var(--text-muted);
          }
          .notice {
            background: var(--surface-color);
            padding: 1rem 1.25rem;
            border-left: 4px solid var(--accent-color);
            margin-bottom: 2.5rem;
            font-size: 0.9rem;
          }
          .notice strong {
            font-family: var(--font-mono);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: 0.8rem;
            display: block;
            margin-bottom: 0.35rem;
            color: var(--accent-color);
          }
          .item {
            padding: 1.75rem 0;
            border-bottom: 1px solid var(--border-color);
          }
          .item:first-child {
            padding-top: 0;
          }
          .item .meta {
            font-family: var(--font-mono);
            font-size: 0.8rem;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: var(--text-muted);
            margin-bottom: 0.5rem;
          }
          .item h2 {
            font-family: var(--font-display);
            font-size: 1.4rem;
            font-weight: 700;
            margin: 0 0 0.5rem 0;
          }
          .item h2 a {
            color: var(--text-color);
          }
          .item h2 a:hover {
            color: var(--accent-color);
            text-decoration: none;
          }
          .item .excerpt {
            color: var(--text-muted);
            margin-bottom: 1rem;
          }
          .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.4rem 0.9rem;
            border: 1px solid var(--accent-color);
            border-radius: 2px;
            font-family: var(--font-mono);
            font-size: 0.8rem;
            letter-spacing: 0.03em;
            color: var(--accent-color);
          }
          .btn:hover {
            background: var(--accent-color);
            color: var(--bg-color);
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="header">
            <h1><xsl:value-of select="/rss/channel/title"/></h1>
            <p><xsl:value-of select="/rss/channel/description"/></p>
          </div>

          <div class="notice">
            <strong>RSS Feed</strong>
            This is a feed, not a normal web page. Copy the URL from your address bar into a feed reader to subscribe.
          </div>

          <div class="items">
            <xsl:for-each select="/rss/channel/item">
              <div class="item">
                <div class="meta">Published <xsl:value-of select="pubDate"/></div>
                <h2>
                  <a href="{link}">
                    <xsl:value-of select="title"/>
                  </a>
                </h2>
                <div class="excerpt">
                  <xsl:value-of select="substring(description, 1, 220)"/>&#8230;
                </div>
                <a href="{link}" class="btn">Read article &#x2192;</a>
              </div>
            </xsl:for-each>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
