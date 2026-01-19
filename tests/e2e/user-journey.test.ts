import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '@/app.js';
import { authService } from '@/modules/auth/auth.service.js';

// Mock the auth service to avoid DB dependency in generic E2E flow
vi.mock('@/modules/auth/auth.service.js', () => ({
    authService: {
        register: vi.fn(),
        login: vi.fn(),
        getProfile: vi.fn(),
    },
}));

describe('E2E: User Journey', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const mockToken = 'mock-jwt-token';

    it('should register a new user', async () => {
        // Arrange
        (authService.register as any).mockResolvedValue(mockUser);

        // Act
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            });

        // Assert
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.email).toBe('test@example.com');
    });

    it('should login and return token', async () => {
        // Arrange
        (authService.login as any).mockResolvedValue({ user: mockUser, token: mockToken });

        // Act
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.data.token).toBe(mockToken);
    });

    it('should get user profile with token', async () => {
        // Arrange
        // We need to verify auth middleware works. Auth middleware uses jwt.verify.
        // Since we are mocking authService, we might need to mock jwt or middleware too if we want full isolation.
        // However, for this E2E, let's assumes middleware checks the token.
        // IF we mock jwt verify, we can pass.
        // Or we can just use a real token if we have the secret.
        // `vitest.config.ts` sets JWT_SECRET='test-secret...'.

        // Let's create a real signed token using the mocked env secret?
        // Or simpler: Mock the middleware? No, we want to test the middleware integration.

        // We'll use jsonwebtoken to sign a token with the test secret.
        const jwt = await import('jsonwebtoken');
        const validToken = jwt.default.sign(
            { userId: mockUser.id, role: mockUser.role },
            process.env.JWT_SECRET || 'test-secret-must-be-at-least-32-chars-long-example',
            { expiresIn: '1h' }
        );

        (authService.getProfile as any).mockResolvedValue(mockUser);

        // Act
        const response = await request(app)
            .get('/api/auth/me')
            .set('Authorization', `Bearer ${validToken}`);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(mockUser.id);
    });
});
