import { test, expect } from '@playwright/test';

test('As user, I want to be able to make an order', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/New Pet Store/);

  const cardElements = page.locator('[data-testid^="card-"]');

  const count = await cardElements.count();
  expect(count).toBe(10);

  await cardElements.nth(1).click();

  const title = await page.title();
  expect(title).toBe("New Pet Store");

  const addToCart = await page.locator('[data-testid="add-to-cart"]');
  expect(addToCart).toBeVisible();

  await addToCart.click();
  await page.goto('/cart');
});