// Снимает полные скриншоты страниц в двух ширинах и двух языках.
// Использование: npm run dev -- -p 3123, затем node scripts/screenshots.mjs <outDir>
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const outDir = process.argv[2]
if (!outDir) {
  console.error('Usage: node scripts/screenshots.mjs <outDir>')
  process.exit(1)
}
mkdirSync(outDir, { recursive: true })

const base = process.env.BASE_URL ?? 'http://localhost:3123'
const pages = [
  ['home', '/'],
  ['infra', '/cases/infrastructure-monitoring'],
  ['agro', '/cases/agro-platform'],
  ['contact', '/contact'],
]
const viewports = [
  [1440, 900],
  [390, 844],
]

const browser = await chromium.launch()
let failed = false

for (const language of ['ru', 'en']) {
  for (const [width, height] of viewports) {
    const context = await browser.newContext({ viewport: { width, height } })
    await context.addInitScript((lang) => localStorage.setItem('language', lang), language)
    const page = await context.newPage()
    for (const [name, path] of pages) {
      await page.goto(base + path, { waitUntil: 'networkidle' })
      await page.waitForTimeout(500)
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      const ok = scrollWidth <= width
      if (!ok) failed = true
      console.log(`${name} ${width} ${language}: scrollWidth ${scrollWidth} ${ok ? 'ok' : 'OVERFLOW'}`)
      await page.screenshot({ path: `${outDir}/${name}-${width}-${language}.png`, fullPage: true })
    }
    await context.close()
  }
}

await browser.close()
process.exit(failed ? 1 : 0)
