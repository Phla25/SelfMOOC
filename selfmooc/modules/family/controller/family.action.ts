'use server';

import { cookies } from 'next/headers';
import { linkChildService, getMyChildrenService } from '../services/family.service';
import { revalidatePath } from 'next/cache';

type ChildRow = {
  student_id: number;
  name?: string;
  student_name?: string;
  avatar_url?: string | null;
  student_avatar?: string | null;
  [key: string]: unknown;
};

// Hàm lấy User từ Token (Nên chuyển ra một file utility dùng chung)
function getUserFromToken(token: string) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'));
  } catch {
    return null;
  }
}

// ACTION 1: KẾT NỐI VỚI CON
export async function linkChildAction(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  if (!token) return { success: false, message: 'Chưa đăng nhập' };

  const user = getUserFromToken(token);
  if (!user || user.role !== 'parent') return { success: false, message: 'Chỉ phụ huynh mới được dùng tính năng này' };

  const studentCode = formData.get('student_code') as string;
  const relationship = formData.get('relationship') as string;

  if (!studentCode) return { success: false, message: 'Vui lòng nhập Mã học sinh' };
  if (!['mother', 'father', 'guardian'].includes(relationship)) return { success: false, message: 'Vai trò không hợp lệ' };

  try {
    const student = await linkChildService(user.id, studentCode, relationship);
    revalidatePath('/family'); // Làm mới lại trang để hiện bé lên danh sách
    return { success: true, message: `🎉 Đã nhận bé ${student.name} thành công!` };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Lỗi hệ thống',
    };
  }
}

// ACTION 2: LẤY DANH SÁCH CON CÁI ĐỂ HIỆN LÊN UI
export async function getMyChildrenAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  if (!token) return { success: false, data: [] };

  const user = getUserFromToken(token);
  if (!user || user.role !== 'parent') return { success: false, data: [] };

  try {
    const children = await getMyChildrenService(user.id);
    return {
      success: true,
      data: (children as ChildRow[]).map((child) => ({
        ...child,
        student_name: child.student_name ?? child.name,
        student_avatar: child.student_avatar ?? child.avatar_url,
      })),
    };
  } catch {
    return { success: false, data: [] };
  }
}
