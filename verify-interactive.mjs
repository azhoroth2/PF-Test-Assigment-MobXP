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

// --- Screen 1: no dev toggle ---
await page.goto('http://localhost:5173/');
await page.waitForLoadState('networkidle');
const toggleOnS1 = await page.locator('button:has-text("[default]"), button:has-text("[single]"), button:has-text("[empty]")').count();
check('S1: no dev toggle button', toggleOnS1 === 0);
await page.screenshot({ path: '/tmp/int-s1-default.png' });

// --- Flowchart: click Single substate ---
await page.locator('button:has-text("Single")').click();
await page.waitForTimeout(300);
check('Click Single → URL has demo=single', page.url().includes('demo=single'));
const singleCount = await page.locator('text=1 worker needs a clock-out').count();
check('Single state shows 1 worker', singleCount > 0);
await page.screenshot({ path: '/tmp/int-s1-single.png' });

// --- Flowchart: click Empty substate ---
await page.locator('button:has-text("Empty")').click();
await page.waitForTimeout(300);
check('Click Empty → URL has demo=empty', page.url().includes('demo=empty'));
const allClear = await page.locator('text=All clear').count();
check('Empty state shows All clear', allClear > 0);
await page.screenshot({ path: '/tmp/int-s1-empty.png' });

// --- Flowchart: click Default substate ---
await page.locator('button:has-text("Default")').click();
await page.waitForTimeout(300);
check('Click Default → URL has demo=default', page.url().includes('demo=default'));
const threeWorkers = await page.locator('text=3 workers need a clock-out').count();
check('Default state shows 3 workers', threeWorkers > 0);

// --- Flowchart: click Corrections node ---
await page.locator('button:has-text("Bulk approve")').click();
await page.waitForTimeout(300);
check('Click Bulk approve → /corrections', page.url().includes('/corrections'));
await page.screenshot({ path: '/tmp/int-corrections.png' });

// --- Flowchart: click High-confidence substate ---
await page.locator('button:has-text("High-confidence")').click();
await page.waitForTimeout(300);
check('Click High-confidence → /correction/', page.url().includes('/correction/'));
check('High-confidence URL param', page.url().includes('demo=high-confidence'));
const confText = await page.locator('text=/94%/').count();
check('Shows 94% confidence', confText > 0);
await page.screenshot({ path: '/tmp/int-worker-high.png' });

// --- No dev toggle on PerWorkerCard ---
const toggleOnWorker = await page.locator('button:has-text("[")').count();
check('PerWorkerCard: no dev toggle', toggleOnWorker === 0);

// --- Flowchart: click Conflict substate ---
await page.locator('button:has-text("Conflict")').click();
await page.waitForTimeout(300);
check('Click Conflict → demo=conflict', page.url().includes('demo=conflict'));
const conflictText = await page.locator('text=/usually leaves/').count();
check('Conflict state: conflict reasoning shown', conflictText > 0);
const confBar = await page.locator('text=/58%/').count();
check('Conflict state: 58% bar', confBar > 0);
await page.screenshot({ path: '/tmp/int-worker-conflict.png' });

// --- Flowchart: click Dispute ---
await page.locator('button:has-text("Dispute")').click();
await page.waitForTimeout(300);
check('Click Dispute → demo=dispute', page.url().includes('demo=dispute'));
const submitDispute = await page.locator('button:has-text("Submit dispute")').count();
check('Dispute state: Submit dispute CTA', submitDispute > 0);
await page.screenshot({ path: '/tmp/int-worker-dispute.png' });

// --- Flowchart: click Success substate ---
await page.locator('button:has-text("Success")').click();
await page.waitForTimeout(300);
check('Click Success → /confirm', page.url().includes('/confirm'));
const submitted = await page.locator('text=/submitted/').count();
check('Confirmation screen shows submitted text', submitted > 0);
await page.screenshot({ path: '/tmp/int-confirm-success.png' });

// --- Flowchart: click Partial substate ---
await page.locator('button:has-text("Partial")').click();
await page.waitForTimeout(300);
check('Click Partial → demo=partial', page.url().includes('demo=partial'));
const partialText = await page.locator('text=/still need/').count();
check('Partial state shown', partialText > 0);
await page.screenshot({ path: '/tmp/int-confirm-partial.png' });

await browser.close();
console.log(`\n${pass} passed · ${fail} failed`);
