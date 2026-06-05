import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1400, height: 950 } });
const page = await ctx.newPage();

let pass = 0, fail = 0;
function check(label, val) {
  const ok = !!val;
  console.log(`${ok ? '✅' : '❌'} ${label}`);
  ok ? pass++ : fail++;
}

// Already on conflict state — click Dispute in flowchart (title="Go to Dispute")
await page.goto('http://localhost:5173/correction/3?demo=conflict');
await page.waitForLoadState('networkidle');

// Use title attr to target flowchart button specifically
await page.locator('button[title="Go to Dispute"]').click();
await page.waitForTimeout(300);
check('Click Dispute → demo=dispute', page.url().includes('demo=dispute'));
const submitDispute = await page.locator('button:has-text("Submit dispute")').count();
check('Dispute state: Submit dispute CTA', submitDispute > 0);
await page.screenshot({ path: '/tmp/int-worker-dispute.png' });

// Click Success in flowchart
await page.locator('button[title="Go to Success"]').click();
await page.waitForTimeout(300);
check('Click Success → /confirm', page.url().includes('/confirm'));
const submitted = await page.locator('text=/submitted/').count();
check('Confirmation screen shows submitted text', submitted > 0);
await page.screenshot({ path: '/tmp/int-confirm-success.png' });

// Click Partial in flowchart
await page.locator('button[title="Go to Partial"]').click();
await page.waitForTimeout(300);
check('Click Partial → demo=partial', page.url().includes('demo=partial'));
const partialText = await page.locator('text=/still need/').count();
check('Partial state shown', partialText > 0);
await page.screenshot({ path: '/tmp/int-confirm-partial.png' });

await browser.close();
console.log(`\n${pass} passed · ${fail} failed`);
