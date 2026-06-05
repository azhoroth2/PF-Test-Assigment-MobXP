import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1400, height: 950 } });
const page = await ctx.newPage();

await page.goto('http://localhost:5173');
await page.waitForLoadState('networkidle');
await page.screenshot({ path: '/tmp/layout-s1.png' });
console.log('📸 S1 with flowchart');

await page.goto('http://localhost:5173/confirm');
await page.waitForLoadState('networkidle');
await page.screenshot({ path: '/tmp/layout-confirm-success.png' });
console.log('📸 Confirm success (button position)');

await page.goto('http://localhost:5173/corrections');
await page.waitForLoadState('networkidle');
await page.screenshot({ path: '/tmp/layout-corrections.png' });
console.log('📸 Corrections');

await page.goto('http://localhost:5173/correction/3');
await page.waitForLoadState('networkidle');
await page.screenshot({ path: '/tmp/layout-perworker.png' });
console.log('📸 Per-worker (flowchart active node)');

await browser.close();
console.log('DONE');
