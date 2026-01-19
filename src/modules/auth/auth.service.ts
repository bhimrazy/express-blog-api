import argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from '@/common/middleware/index.js';
import { env, HttpError } from '@/common/utils/index.js';
import { db, type User, users } from '@/db/index.js';
import type { LoginInput, RegisterInput } from './auth.schema.js';

export const authService = {
  async register(input: RegisterInput): Promise<Omit<User, 'password'>> {
    // Check if user already exists
    const existing = await db.query.users.findFirst({
      where: eq(users.email, input.email.toLowerCase()),
    });

    if (existing) {
      throw HttpError.conflict('Email already registered');
    }

    // Hash password
    const hashedPassword = await argon2.hash(input.password);

    // Create user
    const [user] = await db
      .insert(users)
      .values({
        name: input.name,
        email: input.email.toLowerCase(),
        password: hashedPassword,
        role: 'user',
      })
      .returning();

    if (!user) {
      throw HttpError.internal('Failed to create user');
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  async login(input: LoginInput): Promise<{ user: Omit<User, 'password'>; token: string }> {
    // Find user
    const user = await db.query.users.findFirst({
      where: eq(users.email, input.email.toLowerCase()),
    });

    if (!user) {
      throw HttpError.unauthorized('Invalid email or password');
    }

    // Verify password
    const isValidPassword = await argon2.verify(user.password, input.password);

    if (!isValidPassword) {
      throw HttpError.unauthorized('Invalid email or password');
    }

    // Generate JWT
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role as 'admin' | 'user',
    };

    const token = jwt.sign(payload, env.JWT_SECRET as jwt.Secret, {
      expiresIn: env.JWT_EXPIRES_IN as any,
    });

    // Return user without password and token
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  },

  async getProfile(userId: string): Promise<Omit<User, 'password'> | null> {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
};
