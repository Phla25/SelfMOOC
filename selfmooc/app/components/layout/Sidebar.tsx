'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logoutAction } from '@/modules/auth/controller/auth.action';
import { useSidebar } from './SidebarContext';

const MENUS = {
  student: [
    { name: 'Bảng Của Tớ', icon: '🏠', path: '/' },
    { name: 'Lớp học', icon: '📚', path: '/classes' },
    { name: 'Lịch Học', icon: '📅', path: '/schedule' },
    { name: 'Nhật Ký', icon: '📝', path: '/diary' },
    { name: 'Hồ Sơ', icon: '🪪', path: '/profile' },
  ],
  teacher: [
    { name: 'Trang chủ', icon: '🏠', path: '/' },
    { name: 'Lớp Học', icon: '🏫', path: '/classes' },
    { name: 'Lịch Dạy', icon: '📅', path: '/schedule' },
    { name: 'Khóa Học', icon: '📚', path: '/courses' },
    { name: 'Chấm Bài', icon: '✅', path: '/grading' },
    { name: 'Nhắn tin', icon: '💬', path: '/chats' },
    { name: 'Hồ Sơ', icon: '🪪', path: '/profile' },
  ],
  parent: [
    { name: 'Tổng Quan', icon: '👁️', path: '/' },
    { name: 'Gia Đình', icon: '👨‍👩‍👧‍👦', path: '/family' },
    { name: 'Nhắn Tin', icon: '💬', path: '/chats' },
    { name: 'Hồ Sơ', icon: '🪪', path: '/profile' },
  ],
};

const ROLE_NAMES = {
  student: 'Học sinh',
  teacher: 'Giáo viên',
  parent: 'Phụ huynh',
};

export default function Sidebar({ role = 'student' }: { role?: 'student' | 'teacher' | 'parent' }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobileOpen, isCollapsed, closeMobile, toggleSidebar } = useSidebar();
  const currentMenu = MENUS[role] || MENUS.student;

  const handleLogout = async () => {
    await logoutAction();
    router.push('/login');
    router.refresh();
  };

  return (
    <>
      {/* 1. Backdrop mờ cho Mobile / Tablet */}
      {isMobileOpen && (
        <div
          data-testid="sidebar-backdrop"
          onClick={closeMobile}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* 2. Sidebar Container */}
      <aside
        data-testid="main-sidebar"
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          bg-white border-r-4 border-sky-100 flex flex-col p-4 shadow-xl
          transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
          w-64
        `}
      >
        {/* Header / Logo */}
        <div className="flex flex-col items-center justify-center gap-1 mb-6 mt-2 relative">
          <div className="flex items-center gap-2">
            <span className="text-3xl animate-bounce">🚀</span>
            {!isCollapsed && (
              <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 transition-opacity">
                SelfMOOC
              </h1>
            )}
          </div>
          
          {!isCollapsed && (
            <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mt-1">
              Phân quyền: {ROLE_NAMES[role]}
            </span>
          )}

          {/* Nút đóng drawer trên Mobile */}
          <button
            type="button"
            onClick={closeMobile}
            className="lg:hidden absolute -top-1 -right-1 p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"
            aria-label="Đóng menu"
          >
            ✕
          </button>
        </div>

        {/* Nút thu gọn / mở rộng nhanh trên Desktop */}
        <button
          type="button"
          onClick={toggleSidebar}
          className="hidden lg:flex items-center justify-center mb-4 py-1.5 px-2 bg-sky-50 hover:bg-sky-100 text-sky-600 rounded-xl text-xs font-bold transition-colors"
          title={isCollapsed ? 'Mở rộng thanh điều hướng' : 'Thu nhỏ thanh điều hướng'}
        >
          {isCollapsed ? '➡️' : '◀️ Thu gọn'}
        </button>

        {/* Danh sách Menu */}
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {currentMenu.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path} onClick={closeMobile} title={item.name}>
                <div
                  className={`flex items-center gap-4 px-3.5 py-3.5 rounded-2xl font-bold transition-all transform hover:-translate-y-0.5 hover:shadow-sm ${
                    isCollapsed ? 'justify-center' : ''
                  } ${
                    isActive
                      ? 'bg-blue-500 text-white shadow-[0_4px_0_rgb(37,99,235)]'
                      : 'bg-gray-50 text-gray-600 hover:bg-blue-50'
                  }`}
                >
                  <span className="text-2xl drop-shadow-sm shrink-0">{item.icon}</span>
                  {!isCollapsed && <span className="text-base truncate">{item.name}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Nút Đăng xuất */}
        <div className="mt-auto pt-4 border-t-4 border-gray-100">
          <button
            onClick={handleLogout}
            title="Thoát ra"
            className={`flex w-full items-center justify-center gap-2 px-3 py-3.5 bg-rose-50 text-rose-600 font-bold rounded-2xl hover:bg-rose-100 hover:-translate-y-0.5 hover:shadow-sm transition-all ${
              isCollapsed ? 'px-0' : ''
            }`}
          >
            <span className="text-xl shrink-0">🚪</span>
            {!isCollapsed && <span className="truncate">Thoát ra</span>}
          </button>
        </div>
      </aside>
    </>
  );
}