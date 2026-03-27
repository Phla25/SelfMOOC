import { z } from 'zod';

// Định nghĩa các vai trò hợp lệ
export const RoleEnum = z.enum(['teacher', 'student', 'parent']);
export type UserRole = z.infer<typeof RoleEnum>;

// Tạo cái "Khuôn" (Schema) kiểm tra dữ liệu đầu vào
export const loginSchema = z.discriminatedUnion('role', [
  // Trường hợp 1: Học sinh
  z.object({
    role: z.literal('student'),
    student_code: z.string({ message: 'Vui lòng nhập mã học sinh' }).min(1, 'Mã học sinh không được để trống'),
    password_raw: z.string({ message: 'Vui lòng nhập mật khẩu' }),
  }),
  
  // Trường hợp 2: Giáo viên
  z.object({
    role: z.literal('teacher'),
    email: z.string({ message: 'Vui lòng nhập email' }).email('Định dạng email không hợp lệ'),
    password_raw: z.string({ message: 'Vui lòng nhập mật khẩu' }).min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  }),
  
  // Trường hợp 3: Phụ huynh (Code y hệt giáo viên nhưng role khác)
  z.object({
    role: z.literal('parent'),
    email: z.string({ message: 'Vui lòng nhập email' }).email('Định dạng email không hợp lệ'),
    password_raw: z.string({ message: 'Vui lòng nhập mật khẩu' }).min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  }),
]);

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