import { z } from 'zod';

export const createBookSchema = z.object({
  title: z.string().min(2, { message: 'Tiêu đề sách phải có ít nhất 2 kí tự' }),
  author: z.string().min(1, { message: 'Tên tác giả không được để trống' }),
  price: z.number().positive({ message: 'Giá sách phải lớn hơn 0' }),
  publishedYear: z.number().int().min(1000).max(new Date().getFullYear()),
});

export type CreateBookDto = z.infer<typeof createBookSchema>;
