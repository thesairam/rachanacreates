#!/usr/bin/env node
/*
 Fetch latest Instagram media via Instagram Basic Display API and write to public/instagram.json
 Requires env var INSTAGRAM_TOKEN (User or Long-Lived Token)

 Docs: https://developers.facebook.com/docs/instagram-basic-display-api/reference/user/media
*/

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

// Lazy load dotenv only if present
let dotenvLoaded = false
try {
  const { config } = await import('dotenv')
  const envPath = path.resolve(process.cwd(), '.env.local')
  if (fs.existsSync(envPath)) {
    config({ path: envPath })
    dotenvLoaded = true
  } else if (fs.existsSync(path.resolve(process.cwd(), '.env'))) {
    config()
    dotenvLoaded = true
  }
} catch {}

const token = process.env.INSTAGRAM_TOKEN
if (!token) {
  console.error('INSTAGRAM_TOKEN not set. Create a .env.local with INSTAGRAM_TOKEN=...')
  process.exit(2)
}

const OUT_DIR = path.resolve(process.cwd(), 'public')
const OUT_FILE = path.join(OUT_DIR, 'instagram.json')

const FIELDS = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,children{media_type,media_url}'
const LIMIT = 12
const ENDPOINT = `https://graph.instagram.com/me/media?fields=${encodeURIComponent(FIELDS)}&limit=${LIMIT}&access_token=${token}`

async function main() {
  console.log('[instagram] Fetching latest media...')
  const res = await fetch(ENDPOINT)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Instagram API error ${res.status}: ${text}`)
  }
  const json = await res.json()
  const items = (json.data || []).map(item => {
    const images = []
    if (item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM') {
      if (item.media_url) images.push(item.media_url)
      if (item.children && Array.isArray(item.children.data)) {
        for (const c of item.children.data) {
          if (c.media_type === 'IMAGE' && c.media_url) images.push(c.media_url)
        }
      }
    } else if (item.media_type === 'VIDEO') {
      if (item.thumbnail_url) images.push(item.thumbnail_url)
    }
    return {
      id: item.id,
      caption: item.caption || '',
      permalink: item.permalink,
      timestamp: item.timestamp,
      media_type: item.media_type,
      images
    }
  }).filter(i => i.images.length > 0)

  // Sort newest first
  items.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

  fs.mkdirSync(OUT_DIR, { recursive: true })
  fs.writeFileSync(OUT_FILE, JSON.stringify({ fetchedAt: new Date().toISOString(), items }, null, 2))
  console.log(`[instagram] Wrote ${items.length} items to ${path.relative(process.cwd(), OUT_FILE)}`)
}

main().catch(err => {
  console.error('[instagram] Failed:', err.message)
  process.exit(1)
})
