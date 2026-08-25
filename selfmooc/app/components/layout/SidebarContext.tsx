'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface SidebarContextType {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  closeMobile: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isMobileOpen: false,
  setIsMobileOpen: () => {},
  isCollapsed: false,
  setIsCollapsed: () => {},
  toggleSidebar: () => {},
  closeMobile: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // Đóng drawer trên mobile mỗi khi chuyển trang
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const toggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsMobileOpen(prev => !prev);
    } else {
      setIsCollapsed(prev => !prev);
    }
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  return (
    <SidebarContext.Provider
      value={{
        isMobileOpen,
        setIsMobileOpen,
        isCollapsed,
        setIsCollapsed,
        toggleSidebar,
        closeMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
