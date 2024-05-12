import { expect, test } from '@playwright/test';

test('about page has expected h1', async ({ page }) => {
	await page.goto('/login');
	await expect(page.getByRole('heading', { name: 'BCBC Workstand Login' })).toBeVisible();
});
