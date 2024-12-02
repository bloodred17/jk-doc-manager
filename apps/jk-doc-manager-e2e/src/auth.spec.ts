import { test, expect } from '@playwright/test';
import { config } from '../config';

test('Login', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[formcontrolname="email"]', config.email);
  await page.fill('input[formcontrolname="password"]', config.password);
  await page.click('input[formcontrolname="rememberMe"]');
  await page.click('button:has-text("Login")');
  await page.waitForSelector('span.font-inter.text-2xl');
  // Expect h1 to contain a substring.
  expect(await page.innerText('span.font-inter.text-2xl')).toContain(
    'Start by uploading a document'
  );
});

test('No Login', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[formcontrolname="email"]', config.email);
  await page.fill('input[formcontrolname="password"]', 'abcd12345');
  await page.click('input[formcontrolname="rememberMe"]');
  await page.click('button:has-text("Login")');
  await page.waitForTimeout(5000);
  expect(await page.locator('button:has-text("Login")').innerText()).toContain(
    'Login'
  );
});

test('Logout', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[formcontrolname="email"]', config.email);
  await page.fill('input[formcontrolname="password"]', config.password);
  await page.click('input[formcontrolname="rememberMe"]');
  await page.click('button:has-text("Login")');
  await page.waitForSelector('span.font-inter.text-2xl');
  await page.locator('.navbar-end .dropdown > div').click();
  await page.locator('.navbar-end .dropdown .menu li').nth(1).click();
  expect(await page.locator('button:has-text("Login")').innerText()).toContain(
    'Login'
  );
});
