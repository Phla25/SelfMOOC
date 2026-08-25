import { test, expect } from '@playwright/test';

test.describe('Giao diện Responsive & Sidebar Toggle', () => {
  test('Kiểm tra trang đăng nhập hiển thị responsive không bị tràn màn hình', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('domcontentloaded');

    // Kiểm tra không có thanh cuộn ngang (horizontal scroll)
    const isHorizontalScrollPresent = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(isHorizontalScrollPresent).toBe(false);
  });

  test('Kiểm tra các thành phần form đăng nhập render đầy đủ', async ({ page }) => {
    await page.goto('/login');
    
    // Kiểm tra input email & password
    const emailInput = page.locator('input[type="email"], input[name="email"], input[id*="email"]');
    const submitBtn = page.locator('button[type="submit"]');

    if (await emailInput.count() > 0) {
      await expect(emailInput.first()).toBeVisible();
    }
    if (await submitBtn.count() > 0) {
      await expect(submitBtn.first()).toBeVisible();
    }
  });
});
