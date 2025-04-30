import { test, expect } from '@playwright/test';

test('check links are accessible', async ({ page }) => {
  await page.goto('https://rubrr.s3-main.oktopod.app/');

  const links = await page.$$eval('a', anchors => anchors.map(anchor => anchor.href));

  for (const link of links) {
    const response = await page.goto(link);

    expect(response?.status()).toBe(200);
  }
});