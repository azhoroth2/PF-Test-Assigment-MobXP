import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 } });
const page = await ctx.newPage();

async function ss(name) {
  await page.screenshot({ path: `/tmp/ss-${name}.png` });
  console.log(`  📸 /tmp/ss-${name}.png`);
}

// S1 default
await page.goto('http://localhost:5173');
await page.waitForLoadState('networkidle');
console.log('S1 title:', await page.textContent('h1'));
console.log('S1 CTA:', await page.textContent('button:has-text("Review 3")'));
console.log('S1 Marco visible:', await page.locator('text=Marco T.').count() > 0);
await ss('1-shift-summary');

// Dev toggle
await page.click('button:has-text("[default]")');
await page.waitForTimeout(300);
console.log('S1 after toggle:', await page.textContent('button:has-text("[")'));
await page.click('button:has-text("[")');
await page.waitForTimeout(300);
await page.click('button:has-text("[")');
await page.waitForTimeout(300);
// should be back to [default]
await ss('1b-states-cycled');

// Navigate to corrections
await page.goto('http://localhost:5173');
await page.click('button:has-text("Review 3 corrections")');
await page.waitForURL('**/corrections');
console.log('\nS2a URL:', page.url());
await ss('2a-correction-flow');

console.log('S2a high-conf:', await page.locator('text=Ready to approve').count() > 0);
console.log('S2a low-conf:', await page.locator('text=Needs your check').count() > 0);
console.log('S2a Piotr visible:', await page.locator('text=Piotr W.').count() > 0);

// Bulk approve
await page.click('button:has-text("Approve 2")');
await page.waitForTimeout(400);
await ss('2a-after-approve');
console.log('S2a approved badge:', await page.locator('text=2 approved').count() > 0);
console.log('S2a Piotr still:', await page.locator('text=Piotr W.').count() > 0);

// Tap Piotr
await page.click('text=Piotr W.');
await page.waitForURL('**/correction/3');
console.log('\nS2b URL:', page.url());
await ss('2b-per-worker-conflict');

console.log('S2b AI suggestion visible:', await page.locator('text=AI suggestion').count() > 0);
console.log('S2b confidence bar:', await page.locator('text=/\\d+%/').first().textContent());
console.log('S2b conflict reasoning:', await page.locator('text=/usually leaves/').count() > 0);

// Dev toggle cycles on S2b
const toggleBtn = page.locator('button:has-text("[")');
const beforeToggle = await toggleBtn.textContent();
await toggleBtn.click();
await page.waitForTimeout(200);
const afterToggle = await toggleBtn.textContent();
console.log('S2b toggle before:', beforeToggle, '→ after:', afterToggle);
await ss('2b-state-cycled');

// Go back to conflict state (worker 3 starts in conflict)
await page.goto('http://localhost:5173/correction/3');
await page.waitForLoadState('networkidle');

// Confirm disabled without reason
const confirmDisabled = await page.locator('button:has-text("Confirm")').getAttribute('disabled');
console.log('Confirm disabled w/o reason:', confirmDisabled !== null);

// Select reason pill
await page.click('button:has-text("Schedule default")');
await page.waitForTimeout(200);
await ss('2b-reason-selected');

// Edit time - TimeStepper
await page.click('button:has-text("Edit time")');
await page.waitForTimeout(300);
console.log('TimeStepper label:', await page.locator('text=Adjust clock-out time').count() > 0);
const inputCount = await page.locator('input[type="text"], input:not([type])').count();
console.log('Text inputs on happy path (want 0):', inputCount);
await page.click('button:has-text("+5")');
await page.click('button:has-text("+5")');
await page.waitForTimeout(200);
await ss('2b-time-stepper-adjusted');

// Confirm
await page.click('button:has-text("Confirm")');
await page.waitForURL('**/confirm');
console.log('\nS3 URL:', page.url());
await ss('3-confirmation');
console.log('S3 title:', await page.textContent('h2'));
console.log('S3 Done btn:', await page.locator('button:has-text("Done")').count() > 0);

// Done → home
await page.click('button:has-text("Done")');
await page.waitForURL('http://localhost:5173/');
console.log('\nBack home:', page.url());

// Phone frame check
const frameEl = await page.locator('div[style*="40px"]').first().getAttribute('style');
console.log('Phone frame has border-radius 40px:', frameEl?.includes('40px') ?? false);

await browser.close();
console.log('\n✓ DONE');
