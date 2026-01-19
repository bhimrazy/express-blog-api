import { eq } from 'drizzle-orm';
import { HttpError } from '../../common/utils/index.js';
import { db, type User, users } from '../../db/index.js';
import type { UpdateUserInput } from './user.schema.js';

export const userService = {
  async getAll(): Promise<Omit<User, 'password'>[]> {
    const allUsers = await db.query.users.findMany({
      orderBy: (users, { desc }) => [desc(users.createdAt)],
    });

    return allUsers.map(({ password: _, ...user }) => user);
  },

  async getById(id: string): Promise<Omit<User, 'password'>> {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      throw HttpError.notFound('User not found');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  async update(id: string, input: UpdateUserInput): Promise<Omit<User, 'password'>> {
    const [updatedUser] = await db
      .update(users)
      .set({ ...input, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    if (!updatedUser) {
      throw HttpError.notFound('User not found');
    }

    const { password: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  },

  async delete(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));

    // Drizzle doesn't return count by default in all drivers, but for PG checking existence first is safer or assuming success if no error thrown
    // For simplicity, we assume if no error, it's done.
    // In production, might want to check if row existed.
  },
};
