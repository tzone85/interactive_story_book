import { test, expect } from '@playwright/test';

test('complete story reading flow', async ({ page }) => {
  await page.goto('/');
  
  // Select a reader
  await page.getByText('Pholani').click();
  
  // Verify navigation to library
  await expect(page).toHaveURL(/.*\/library/);
  await expect(page.getByText('Welcome, Pholani!')).toBeVisible();
  
  // Find and click on a story
  const storyTitle = 'The Quantum Decision';
  await page.getByText(storyTitle).click();
  
  // Verify story content is displayed
  await expect(page.getByText('Late one night in your university', { exact: false })).toBeVisible();
  
  // Make a choice
  await page.getByText('Focus on preventing the catastrophe').click();
  
  // Verify next scene is displayed
  await expect(page.getByText('The catastrophic timeline weighs heavily on your mind', { exact: false })).toBeVisible();
});