import z from 'zod';
import { createBookSchema } from './create-book.dto';

export const updateBookSchema = createBookSchema.partial();

export type UpdateBookDto = z.infer<typeof updateBookSchema>;
