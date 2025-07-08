import { expect, test } from '@playwright/test';
import { render } from 'vitest-browser-svelte'
test('home page has expected h1', async ({ page }) => {
	render(page)
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();
});
