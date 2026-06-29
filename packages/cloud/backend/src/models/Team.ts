type UUID = string;

export interface Team {
  id: UUID;
  name: string;
  slug: string;
  ownerId: UUID;
  description?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: UUID;
  teamId: UUID;
  userId: UUID;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  joinedAt: Date;
}
