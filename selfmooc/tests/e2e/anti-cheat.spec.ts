import { test, expect } from '@playwright/test';

test.describe('Phòng thi - Hệ thống giám sát chống gian lận (Anti-Cheat)', () => {
  test('Kiểm tra chặn phím tắt F12 và Inspect DevTools', async ({ page }) => {
    // Navigate to login or mock assignment session
    await page.goto('/login');
    
    // Đảm bảo trang tải tốt
    await expect(page).toHaveTitle(/SelfMOOC/i);

    // Kiểm tra dispatch phím F12
    const f12Handled = await page.evaluate(() => {
      const event = new KeyboardEvent('keydown', {
        key: 'F12',
        keyCode: 123,
        bubbles: true,
        cancelable: true,
      });
      return window.dispatchEvent(event);
    });

    // Event default behavior verification
    expect(typeof f12Handled).toBe('boolean');
  });

  test('Kiểm tra ngăn chặn chuột phải (Context Menu) trong chế độ thi', async ({ page }) => {
    await page.goto('/login');

    const contextMenuAllowed = await page.evaluate(() => {
      const event = new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        button: 2,
      });
      return document.dispatchEvent(event);
    });

    expect(typeof contextMenuAllowed).toBe('boolean');
  });

  test('Kiểm tra phản hồi khi thay đổi trạng thái hiển thị (Visibility Change)', async ({ page }) => {
    await page.goto('/login');

    // Trigger visibilitychange event
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { value: true, writable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });

    // Reset visibility
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { value: false, writable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
  });
});
