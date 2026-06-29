type UUID = string;

export interface User {
  id: UUID;
  email: string;
  passwordHash: string;
  name: string;
  avatarUrl?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  stripeCustomerId?: string;
}
