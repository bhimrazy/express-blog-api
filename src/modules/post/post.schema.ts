import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(10),
  excerpt: z.string().optional(),
});

export const updatePostSchema = z.object({
  title: z.string().min(5).optional(),
  content: z.string().min(10).optional(),
  excerpt: z.string().optional(),
  published: z.boolean().optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
