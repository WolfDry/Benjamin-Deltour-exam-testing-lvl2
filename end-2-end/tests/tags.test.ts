import { test, expect } from '@playwright/test';

test('check tags link is returning a question', async ({ page }) => {
  await page.goto('https://rubrr.s3-main.oktopod.app/');
  await page.getByRole('link', { name: 'Uml' }).click();
  const tag = await page.locator('span').filter({ hasText: 'Uml' }).click();
  expect(tag).not.toBeNull();
});