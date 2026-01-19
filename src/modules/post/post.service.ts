import { eq } from 'drizzle-orm';
import { HttpError } from '../../common/utils/index.js';
import { db, type Post, posts } from '../../db/index.js';
import type { CreatePostInput, UpdatePostInput } from './post.schema.js';

export const postService = {
  async getAll(): Promise<Post[]> {
    return db.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      with: {
        author: {
          columns: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  },

  async getById(id: string): Promise<Post> {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, id),
      with: {
        author: {
          columns: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!post) {
      throw HttpError.notFound('Post not found');
    }

    return post;
  },

  async create(userId: string, input: CreatePostInput): Promise<Post> {
    const slug = input.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    // Check for duplicate slug
    const existing = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });

    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const [post] = await db
      .insert(posts)
      .values({
        ...input,
        slug: finalSlug,
        authorId: userId,
      })
      .returning();

    if (!post) {
      throw HttpError.internal('Failed to create post');
    }

    return post;
  },

  async update(id: string, userId: string, input: UpdatePostInput): Promise<Post> {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, id),
    });

    if (!post) {
      throw HttpError.notFound('Post not found');
    }

    if (post.authorId !== userId) {
      throw HttpError.forbidden('You can only update your own posts');
    }

    // Filter out undefined values manually to satisfy exactOptionalPropertyTypes
    const { published, ...rest } = input;
    const updateData: Partial<typeof posts.$inferInsert> = {
      updatedAt: new Date(),
    };

    if (rest.title !== undefined) updateData.title = rest.title;
    if (rest.content !== undefined) updateData.content = rest.content;
    if (rest.excerpt !== undefined) updateData.excerpt = rest.excerpt;
    if (published !== undefined) {
      updateData.published = published ? new Date() : null;
    }

    const [updatedPost] = await db
      .update(posts)
      .set(updateData)
      .where(eq(posts.id, id))
      .returning();

    if (!updatedPost) {
      throw HttpError.notFound('Post not found');
    }

    return updatedPost;
  },

  async delete(id: string, userId: string): Promise<void> {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, id),
    });

    if (!post) {
      throw HttpError.notFound('Post not found');
    }

    if (post.authorId !== userId) {
      throw HttpError.forbidden('You can only delete your own posts');
    }

    await db.delete(posts).where(eq(posts.id, id));
  },
};
