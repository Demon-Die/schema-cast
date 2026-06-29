import { Router, Request, Response } from 'express';

export const authRouter = Router();

// POST /auth/signup
authRouter.post('/signup', async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  // TODO: Hash password, create user in DB
  res.status(201).json({ message: 'User created', userId: 'mock-uuid' });
});

// POST /auth/signin
authRouter.post('/signin', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // TODO: Verify credentials, generate JWT
  res.json({ token: 'mock-jwt-token', refreshToken: 'mock-refresh-token' });
});

// POST /auth/refresh
authRouter.post('/refresh', async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  // TODO: Validate refresh token, issue new access token
  res.json({ token: 'mock-new-jwt-token' });
});

// POST /auth/logout
authRouter.post('/logout', async (_req: Request, res: Response) => {
  // TODO: Invalidate session/token
  res.json({ message: 'Logged out' });
});

// POST /auth/forgot-password
authRouter.post('/forgot-password', async (req: Request, res: Response) => {
  const { email } = req.body;
  // TODO: Send password reset email
  res.json({ message: 'Reset email sent' });
});

// POST /auth/reset-password
authRouter.post('/reset-password', async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  // TODO: Validate token, update password
  res.json({ message: 'Password reset successful' });
});

// POST /auth/verify-email
authRouter.post('/verify-email', async (req: Request, res: Response) => {
  const { token } = req.body;
  // TODO: Verify email token
  res.json({ message: 'Email verified' });
});
