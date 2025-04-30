import { test, expect } from '@playwright/test';

test('check if it handle a response correctly', async ({ page }) => {
  await page.goto('https://rubrr.s3-main.oktopod.app/');
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('Une réponse');
  await page.getByRole('button', { name: 'Répondre' }).click();
  const response = await page.getByRole('heading', { name: 'Réponse corrigée :' }).click();
  expect(response).not.toBeNull();
});