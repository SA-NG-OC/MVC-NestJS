import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_URL: z.url().optional(),
});

export type EnvConfig = z.infer<typeof envSchema>;

export default () => {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error(JSON.stringify(result.error.format(), null, 2));
    throw new Error('Lỗi khi cấu hình .env');
  }
  return result.data;
};
