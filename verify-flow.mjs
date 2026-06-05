import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1400, height: 950 } });
const page = await ctx.newPage();

// Default state
await page.goto('http://localhost:5173/?demo=default');
await page.waitForLoadState('networkidle');
await page.screenshot({ path: '/tmp/flow-s1-default.png' });
console.log('📸 S1 default — active substate highlighted');

// Single state via URL
await page.goto('http://localhost:5173/?demo=single');
await page.waitForLoadState('networkidle');
await page.screenshot({ path: '/tmp/flow-s1-single.png' });
console.log('📸 S1 single — Single substate active in flowchart');

// Empty state via URL
await page.goto('http://localhost:5173/?demo=empty');
await page.waitForLoadState('networkidle');
await page.screenshot({ path: '/tmp/flow-s1-empty.png' });
console.log('📸 S1 empty — Empty substate active');

// Click "Single" substate in flowchart — verify navigation
await page.goto('http://localhost:5173/');
await page.waitForLoadState('networkidle');
await page.locator('button:has-text("Single")').first().click();
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/flow-click-single.png' });
console.log('📸 After clicking Single in flowchart');
const url = page.url();
console.log('URL after click:', url);
const hasDemo = url.includes('demo=single');
console.log('URL has demo=single:', hasDemo);

// Per-worker conflict state via URL
await page.goto('http://localhost:5173/correction/3?demo=conflict');
await page.waitForLoadState('networkidle');
await page.screenshot({ path: '/tmp/flow-worker-conflict.png' });
console.log('📸 Per-worker conflict — Conflict substate active in flowchart');

// Per-worker dispute state via URL
await page.goto('http://localhost:5173/correction/3?demo=dispute');
await page.waitForLoadState('networkidle');
await page.screenshot({ path: '/tmp/flow-worker-dispute.png' });
console.log('📸 Per-worker dispute substate');

// Confirm partial
await page.goto('http://localhost:5173/confirm?demo=partial');
await page.waitForLoadState('networkidle');
await page.screenshot({ path: '/tmp/flow-confirm-partial.png' });
console.log('📸 Confirmation partial substate');

await browser.close();
console.log('DONE');
