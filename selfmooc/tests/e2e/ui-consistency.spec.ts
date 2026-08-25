import { test, expect } from '@playwright/test';

test.describe('Đồng bộ Giao diện & Design System', () => {
  test('Kiểm tra giao diện và các vai trò trên trang Đăng nhập', async ({ page }) => {
    await page.goto('/login');
    
    // Kiểm tra tiêu đề chính hoặc các tab vai trò
    const roleButtons = page.locator('button');
    await expect(roleButtons.first()).toBeVisible();
    
    // Kiểm tra có các lựa chọn vai trò: Học sinh / Giáo viên / Phụ huynh
    const studentRole = page.locator('text=Học sinh');
    await expect(studentRole.first()).toBeVisible();
  });

  test('Kiểm tra nút bấm chính có bo góc rounded-2xl và style 3D shadow đồng bộ', async ({ page }) => {
    await page.goto('/login');

    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeVisible();

    const classNames = (await submitBtn.getAttribute('class')) || '';
    expect(classNames).toContain('rounded-2xl');
    expect(classNames).toContain('shadow-');
  });
});
