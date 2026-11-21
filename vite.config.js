import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {
  parseFrontmatter,
  parsePostDate,
  slugFromPath,
  toTagList,
} from './src/lib/frontmatter.js'

const BLOG_DIR = path.resolve('content/blog')
const SITE_TITLE = 'Mohammed Inamul Hassan M — Blog'
const SITE_DESCRIPTION =
  'Notes and thoughts by Mohammed Inamul Hassan M.'

// Absolute links in the feed need the live domain. Set SITE_URL to override;
// on Vercel, VERCEL_PROJECT_PRODUCTION_URL is provided automatically at build.
const siteUrl = () => {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '')
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  return 'http://localhost:5173'
}

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

// Publish dates are calendar days; report them as midnight UTC
const toUtcMidnight = (date) =>
  new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))

const buildRss = () => {
  const base = siteUrl()
  const files = fs.existsSync(BLOG_DIR)
    ? fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))
    : []

  const items = files
    .map((file) => {
      const { data } = parseFrontmatter(
        fs.readFileSync(path.join(BLOG_DIR, file), 'utf8'),
      )
      const date = parsePostDate(data.date)
      if (!data.title || !date) return null
      return { ...data, slug: slugFromPath(file), date }
    })
    .filter(Boolean)
    .sort((a, b) => b.date - a.date)
    .map((post) => {
      const url = `${base}/blog/${post.slug}`
      const categories = toTagList(post.tags)
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join('\n')
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${toUtcMidnight(post.date).toUTCString()}</pubDate>`,
        post.description &&
          `      <description>${escapeXml(post.description)}</description>`,
        categories,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n')
    })

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${base}/blog</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
${items.join('\n')}
  </channel>
</rss>
`
}

// Writes /rss.xml into the build output and serves it in dev
const rssFeed = () => ({
  name: 'blog-rss-feed',
  configureServer(server) {
    server.middlewares.use('/rss.xml', (_req, res) => {
      res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
      res.end(buildRss())
    })
  },
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'rss.xml', source: buildRss() })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), rssFeed()],
  server: {
    proxy: {
      '/api/github-streak': {
        target: 'https://github-readme-streak-stats.herokuapp.com',
        changeOrigin: true,
        rewrite: (path) => {
          // Extract username from query params and construct the proxy URL
          const url = new URL(path, 'http://localhost');
          const username = url.searchParams.get('username');
          return `/?user=${username}&type=json`;
        },
      },
    },
  },
})
