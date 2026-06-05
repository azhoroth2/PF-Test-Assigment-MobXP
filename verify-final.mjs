import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 } });
const page = await ctx.newPage();

async function ss(name) {
  await page.screenshot({ path: `/tmp/ss-${name}.png` });
  console.log(`📸 /tmp/ss-${name}.png`);
}

// Direct to PerWorkerCard for Piotr (conflict state)
await page.goto('http://localhost:5173/correction/3');
await page.waitForSelector('text=AI suggestion');
console.log('S2b loaded. State toggle:', await page.locator('button:has-text("[")').textContent());
await ss('2b-conflict-state');

// Select reason
await page.click('button:has-text("Schedule default")');
await page.waitForTimeout(200);
await ss('2b-reason-selected');

// Edit time
await page.click('button:has-text("Edit time")');
await page.waitForSelector('text=Adjust clock-out time');
console.log('TimeStepper visible: true');
const inputs = await page.locator('input[type="text"], input:not([type])').count();
console.log('Text inputs (want 0):', inputs);
await page.click('button:has-text("+5")');
await page.click('button:has-text("+5")');
await page.waitForTimeout(150);
const timeDisp = await page.locator('span:has-text(":"):not(:has-text("shift"))').first().textContent();
console.log('Time after +10min:', timeDisp);
await ss('2b-stepper-adjusted');

// Confirm
await page.locator('button:has-text("Confirm 1")').click();
await page.waitForSelector('text=submitted');
console.log('S3 URL:', page.url());
await ss('3-confirmation');
console.log('S3 headline:', await page.textContent('h2'));

// Done → home
await page.click('button:has-text("Done")');
await page.waitForSelector('text=Shift summary');
console.log('Back home ✓');
await ss('1-back-home');

// Check partial confirm state
await page.goto('http://localhost:5173/confirm');
// navigate with state via JS
await page.evaluate(() => {
  window.history.pushState({ total: 3, submitted: 2, partial: true }, '', '/confirm');
  window.dispatchEvent(new PopStateEvent('popstate'));
});
await page.waitForTimeout(500);
await ss('3-partial-state');

await browser.close();
console.log('\n✓ ALL DONE');
