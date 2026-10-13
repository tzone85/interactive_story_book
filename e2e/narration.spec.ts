import { test, expect } from '@playwright/test';

const VOICESTUDIO = 'http://127.0.0.1:3900';
// Smallest valid MP3 frame header; enough for the audio element to accept the response.
const SILENT_MP3 = Buffer.from('//uQxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 'base64');

test.beforeEach(async ({ page }) => {
  await page.route(`${VOICESTUDIO}/.well-known/voicestudio-speech`, (route) =>
    route.fulfill({
      status: 200,
      headers: { 'access-control-allow-origin': '*' },
      json: { protocol: 'voicestudio.speech.v1' },
    }),
  );
  await page.route(`${VOICESTUDIO}/v1/audio/speech`, (route) =>
    route.fulfill({
      status: 200,
      headers: { 'access-control-allow-origin': '*', 'content-type': 'audio/mpeg' },
      body: SILENT_MP3,
    }),
  );
});

test('reader picks a storyteller and has the page read aloud through VoiceStudio', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Pholani').click();
  await expect(page).toHaveURL(/.*\/library/);

  await page.getByText('Studio Sam').click();
  await page.getByRole('button', { name: /quantum decision/i }).click();

  await expect(page.getByRole('region', { name: /story narration/i })).toContainText('Studio Sam');

  const request = page.waitForRequest(`${VOICESTUDIO}/v1/audio/speech`);
  await page.getByRole('button', { name: 'Listen' }).click();
  const body = (await request).postDataJSON();
  expect(body.instructions).toContain('male');
});

test('falls back gracefully when VoiceStudio is not running', async ({ page }) => {
  await page.unroute(`${VOICESTUDIO}/.well-known/voicestudio-speech`);
  await page.route(`${VOICESTUDIO}/**`, (route) => route.abort());

  await page.goto('/');
  await page.getByText('Pholani').click();
  await page.getByRole('button', { name: /quantum decision/i }).click();
  await page.getByRole('button', { name: 'Listen' }).click();

  // Either the browser voice takes over or a clear message is shown; never a silent dead button.
  await expect(page.getByText(/Browser voice|No voice is available/)).toBeVisible();
});
