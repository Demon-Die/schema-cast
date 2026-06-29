import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2024-04-10',
});

export async function createCheckoutSession(userId: string, priceId: string) {
  // Mock logic
  return { url: 'https://checkout.stripe.com/mock' };
}

export async function handleStripeWebhook(event: any) {
  // Mock logic
}

export async function getSubscription(stripeCustomerId: string) {
  // Mock logic
  return { plan: 'free', status: 'active' };
}

export async function cancelSubscription(stripeCustomerId: string) {
  // Mock logic
}

export async function updatePaymentMethod(userId: string) {
  // Mock logic
}
