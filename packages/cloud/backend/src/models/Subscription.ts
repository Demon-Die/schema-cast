type UUID = string;

export interface Subscription {
  id: UUID;
  userId: UUID;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  plan: 'free' | 'pro' | 'team';
  status: 'active' | 'past_due' | 'canceled' | 'trialing';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}
