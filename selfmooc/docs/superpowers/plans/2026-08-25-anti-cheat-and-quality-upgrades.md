# Anti-Cheat, Playwright Testing, Responsive Layout & CI/CD Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Triển khai nâng cấp hệ thống Anti-Cheat (chống F12, chuột phải, devtools, fullscreen, chuyển tab), hoàn thiện Responsive Sidebar & Design System đồng bộ, thiết lập bộ kiểm thử Playwright toàn diện và cài đặt CI/CD Pipeline GitHub Actions theo đúng quy trình Git Flow.

**Architecture:** Sử dụng Custom React Hook (`useAntiCheat`) đóng gói toàn bộ event listener phòng thi; tái cấu trúc Sidebar + Layout sang kiến trúc responsive drawer/collapsible; xây dựng cấu hình và bộ test suites Playwright E2E; tạo workflow CI/CD tự động trên GitHub Actions.

**Tech Stack:** Next.js 16 (App Router), React 19, TailwindCSS v4, TypeScript, @playwright/test, GitHub Actions.

---

### Task 1: Tạo Git Branch `feat/anti-cheat-and-quality-upgrades`
**Files:**
- Repository Branching

- [ ] **Step 1: Tạo và chuyển sang branch mới**
```bash
git checkout -b feat/anti-cheat-and-quality-upgrades
```
- [ ] **Step 2: Xác minh branch**
```bash
git branch --show-current
```

---

### Task 2: Triển khai Hook Chống Gian Lận Toàn Diện (`useAntiCheat`)
**Files:**
- Create: `modules/assignments/hooks/useAntiCheat.ts`
- Modify: `app/(dashboard)/assignments/[assignmentId]/page.tsx`

- [ ] **Step 1: Tạo file `modules/assignments/hooks/useAntiCheat.ts`**
Cung cấp các cơ chế: chặn F12, Ctrl+Shift+I/J/C, Ctrl+U/S; chặn chuột phải `contextmenu`; chặn copy/paste/cut; theo dõi `visibilitychange` & `blur`; kiểm tra fullscreen; bộ đếm cảnh báo vi phạm tối đa 3 lần.

- [ ] **Step 2: Tích hợp hook vào `app/(dashboard)/assignments/[assignmentId]/page.tsx`**
Thay thế logic event listener cũ bằng `useAntiCheat`, bổ sung hiển thị lý do vi phạm cụ thể trên modal cảnh báo và watermark bảo vệ màn hình.

- [ ] **Step 3: Kiểm tra biên dịch TypeScript**
```bash
npx tsc --noEmit
```

---

### Task 3: Nâng cấp Sidebar Responsive & Đảm bảo Layout Không Lệch
**Files:**
- Modify: `app/components/layout/Sidebar.tsx`
- Modify: `app/components/layout/Header.tsx`
- Modify: `app/(dashboard)/layout.tsx`

- [ ] **Step 1: Cập nhật Sidebar để hỗ trợ thu gọn (Collapsible) & Drawer Mobile**
Thêm state mở/đóng, responsive breakpoint, backdrop overlay khi ở mobile và transition mượt mà.

- [ ] **Step 2: Bổ sung nút Toggle Sidebar trên Header**
Thêm nút hamburger menu trên Header cho mobile/tablet và nút collapse trên Desktop.

- [ ] **Step 3: Điều chỉnh Dashboard Layout**
Đảm bảo container `main` co dãn tự động không có thanh cuộn ngang ngoài ý muốn (`overflow-x: hidden`).

- [ ] **Step 4: Kiểm tra Lint & Typecheck**
```bash
npm run lint
```

---

### Task 4: Cài đặt và Cấu hình Bộ Kiểm Thử Playwright E2E
**Files:**
- Modify: `package.json`
- Create: `playwright.config.ts`
- Create: `tests/e2e/anti-cheat.spec.ts`
- Create: `tests/e2e/sidebar-responsive.spec.ts`
- Create: `tests/e2e/ui-consistency.spec.ts`

- [ ] **Step 1: Cài đặt Playwright Test**
```bash
npm install -D @playwright/test
npx playwright install --with-deps chromium
```

- [ ] **Step 2: Tạo cấu hình `playwright.config.ts`**
Cấu hình đa viewport: Mobile (375x667), Tablet (768x1024), Desktop (1440x900) cùng webServer Next.js.

- [ ] **Step 3: Viết test suites E2E**
  * `tests/e2e/anti-cheat.spec.ts`: Test chặn F12, chặn chuột phải, phát hiện 3 lần chuyển tab -> ban 0đ.
  * `tests/e2e/sidebar-responsive.spec.ts`: Test mở/đóng sidebar trên 3 kích thước màn hình, kiểm tra không bị xô lệch layout.
  * `tests/e2e/ui-consistency.spec.ts`: Test màu sắc, font chữ và các thành phần giao diện đồng bộ.

- [ ] **Step 4: Chạy test Playwright**
```bash
npx playwright test
```

---

### Task 5: Thiết lập CI/CD Pipeline (GitHub Actions)
**Files:**
- Create: `.github/workflows/ci-cd.yml`

- [ ] **Step 1: Tạo tệp `.github/workflows/ci-cd.yml`**
Bao gồm các jobs: `lint-and-typecheck`, `unit-and-integration-tests`, `playwright-e2e-tests`, `build-and-deploy`.

- [ ] **Step 2: Xác minh cấu trúc workflow**
Kiểm tra cú pháp yaml hợp lệ.

---

### Task 6: Nghiệm thu Toàn Diện & Đóng Gói
- [ ] **Step 1: Chạy toàn bộ lint, typecheck và build**
```bash
npm run lint
npx tsc --noEmit
npm run build
```
- [ ] **Step 2: Commit các thay đổi và thông báo sẵn sàng merge**
