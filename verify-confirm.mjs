import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 } });
const page = await ctx.newPage();

// Navigate via React Router with state — need to go through the flow
await page.goto('http://localhost:5173/corrections');
await page.waitForLoadState('networkidle');
await page.click('button:has-text("Approve 2")');
await page.waitForTimeout(300);
// Now click Piotr
await page.click('text=Piotr W.');
await page.waitForSelector('text=AI suggestion');
await page.click('button:has-text("Schedule default")');
await page.waitForTimeout(100);
await page.locator('button:has-text("Confirm 1")').click();
await page.waitForSelector('text=submitted');
const headline = await page.textContent('h2');
console.log('Confirmation headline:', headline);
await page.screenshot({ path: '/tmp/ss-3-success.png' });
console.log('📸 /tmp/ss-3-success.png');
await browser.close();
