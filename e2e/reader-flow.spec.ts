import { test, expect } from '@playwright/test';

test('complete reader selection flow', async ({ page }) => {
  await page.goto('/');
  
  // Verify all readers are displayed
  for (const name of ['Pholani', 'Minenhle', 'Ahlumile', 'Qhama']) {
    await expect(page.getByText(name)).toBeVisible();
  }

  // Select a reader
  await page.getByText('Pholani').click();

  // Verify navigation to library
  await expect(page).toHaveURL(/.*\/library/);
  await expect(page.getByText('Welcome, Pholani!')).toBeVisible();
});