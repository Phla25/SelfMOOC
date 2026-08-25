'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

export interface AntiCheatOptions {
  enabled: boolean;
  maxViolations?: number;
  onViolation?: (count: number, reason: string) => void;
  onDisqualify?: (reason: string) => void;
}

export interface AntiCheatState {
  violationCount: number;
  lastReason: string;
  isDisqualified: boolean;
  isFullscreen: boolean;
  requestFullscreen: () => Promise<void>;
  resetViolations: () => void;
}

export function useAntiCheat({
  enabled,
  maxViolations = 3,
  onViolation,
  onDisqualify,
}: AntiCheatOptions): AntiCheatState {
  const [violationCount, setViolationCount] = useState(0);
  const [lastReason, setLastReason] = useState('');
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const violationCountRef = useRef(violationCount);
  const isDisqualifiedRef = useRef(isDisqualified);

  useEffect(() => {
    violationCountRef.current = violationCount;
  }, [violationCount]);

  useEffect(() => {
    isDisqualifiedRef.current = isDisqualified;
  }, [isDisqualified]);

  const lastViolationTimeRef = useRef<number>(0);

  const triggerViolation = useCallback(
    (reason: string) => {
      if (!enabled || isDisqualifiedRef.current) return;

      // Debounce violations occurring within 800ms (e.g. key repeat or combined blur+visibility)
      const now = Date.now();
      if (now - lastViolationTimeRef.current < 800) return;
      lastViolationTimeRef.current = now;

      const newCount = violationCountRef.current + 1;
      setViolationCount(newCount);
      setLastReason(reason);

      if (newCount >= maxViolations) {
        setIsDisqualified(true);
        if (onDisqualify) {
          onDisqualify(reason);
        }
      } else {
        if (onViolation) {
          onViolation(newCount, reason);
        }
      }
    },
    [enabled, maxViolations, onViolation, onDisqualify]
  );

  const requestFullscreen = useCallback(async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch {
      // Browser permissions or user gesture restriction
    }
  }, []);

  const resetViolations = useCallback(() => {
    setViolationCount(0);
    setLastReason('');
    setIsDisqualified(false);
  }, []);

  // 1. Chặn phím tắt DevTools (F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S, Ctrl+P)
  useEffect(() => {
    if (!enabled || isDisqualified) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        triggerViolation('Cố gắng mở công cụ phát triển (F12)');
        return false;
      }

      // Ctrl + Shift + I, J, C, K
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        ['i', 'j', 'c', 'k', 'I', 'J', 'C', 'K'].includes(e.key)
      ) {
        e.preventDefault();
        e.stopPropagation();
        triggerViolation('Cố gắng sử dụng tổ hợp phím kiểm tra mã nguồn (Inspect DevTools)');
        return false;
      }

      // Ctrl + U (View Source), Ctrl + S (Save Page), Ctrl + P (Print)
      if (
        (e.ctrlKey || e.metaKey) &&
        ['u', 's', 'p', 'U', 'S', 'P'].includes(e.key)
      ) {
        e.preventDefault();
        e.stopPropagation();
        triggerViolation('Cố gắng xem mã nguồn hoặc lưu/in trang thi');
        return false;
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [enabled, isDisqualified, triggerViolation]);

  // 2. Chặn chuột phải (Context Menu)
  useEffect(() => {
    if (!enabled || isDisqualified) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerViolation('Cố gắng mở menu chuột phải trong phòng thi');
      return false;
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, [enabled, isDisqualified, triggerViolation]);

  // 3. Chặn Copy / Cut / Paste & Drag
  useEffect(() => {
    if (!enabled || isDisqualified) return;

    const handleCopyCutPaste = (e: ClipboardEvent) => {
      // Allow pasting in textarea if permitted, but block copying question texts
      const target = e.target as HTMLElement;
      if (target.tagName !== 'TEXTAREA' && target.tagName !== 'INPUT') {
        e.preventDefault();
        triggerViolation('Cố gắng sao chép nội dung câu hỏi bài thi');
      }
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    document.addEventListener('copy', handleCopyCutPaste);
    document.addEventListener('cut', handleCopyCutPaste);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('copy', handleCopyCutPaste);
      document.removeEventListener('cut', handleCopyCutPaste);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, [enabled, isDisqualified, triggerViolation]);

  // 4. Theo dõi chuyển tab (Visibility Change) & Mất tiêu điểm (Blur)
  useEffect(() => {
    if (!enabled || isDisqualified) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerViolation('Chuyển sang tab hoặc cửa sổ ứng dụng khác');
      }
    };

    const handleBlur = () => {
      triggerViolation('Mất tiêu điểm màn hình làm bài thi');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [enabled, isDisqualified, triggerViolation]);

  // 5. Theo dõi trạng thái Fullscreen
  useEffect(() => {
    if (!enabled || isDisqualified) return;

    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [enabled, isDisqualified]);

  // 6. Phát hiện mở DevTools thông qua chênh lệch kích thước cửa sổ
  useEffect(() => {
    if (!enabled || isDisqualified) return;

    const interval = setInterval(() => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;

      if (widthThreshold || heightThreshold) {
        triggerViolation('Phát hiện cửa sổ DevTools mở bên cạnh trình duyệt');
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [enabled, isDisqualified, triggerViolation]);

  return {
    violationCount,
    lastReason,
    isDisqualified,
    isFullscreen,
    requestFullscreen,
    resetViolations,
  };
}
