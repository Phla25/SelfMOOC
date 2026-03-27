import { z } from 'zod';

// Định nghĩa các vai trò hợp lệ
export const RoleEnum = z.enum(['teacher', 'student', 'parent']);
export type UserRole = z.infer<typeof RoleEnum>;

// Tạo cái "Khuôn" (Schema) kiểm tra dữ liệu đầu vào
export const loginSchema = z.object({
  email: z
    .string({ message: 'Vui lòng nhập email' })
    .email('Định dạng email không hợp lệ (ví dụ: name@domain.com)'),
  password_raw: z
    .string({ message: 'Vui lòng nhập mật khẩu' })
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  role: RoleEnum,
});

// Zod tự động biến Schema thành TypeScript Interface cho bạn! 
// (Giống hệt cái LoginPayload lúc trước nhưng xịn hơn)
export type LoginPayload = z.infer<typeof loginSchema>;

// Thông tin trả về sau khi đăng nhập (giữ nguyên)
export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  avatar_url?: string | null;
}

// Bộ luật cho Form Đăng ký (Chỉ cho phép Teacher và Parent)
export const registerSchema = z.object({
  name: z
    .string({ message: 'Vui lòng nhập họ và tên' })
    .min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z
    .string({ message: 'Vui lòng nhập email' })
    .email('Định dạng email không hợp lệ'),
  password_raw: z
    .string({ message: 'Vui lòng nhập mật khẩu' })
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  role: z.enum(['teacher', 'parent'], { 
    message: 'Chỉ Giảng viên và Phụ huynh mới được phép đăng ký' 
  }),
});

export type RegisterPayload = z.infer<typeof registerSchema>;