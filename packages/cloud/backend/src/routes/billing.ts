import { Router, Request, Response } from 'express';

export const billingRouter = Router();

// GET /api/billing/subscription - Get current subscription
billingRouter.get('/subscription', async (_req: Request, res: Response) => {
  // TODO: Fetch from DB using authenticated user
  res.json({ plan: 'free', status: 'active', currentPeriodEnd: null });
});

// POST /api/billing/checkout - Create Stripe checkout session
billingRouter.post('/checkout', async (req: Request, res: Response) => {
  const { priceId } = req.body;
  // TODO: Create Stripe checkout session
  res.json({ url: 'https://checkout.stripe.com/mock' });
});

// POST /api/billing/cancel - Cancel subscription
billingRouter.post('/cancel', async (_req: Request, res: Response) => {
  // TODO: Cancel via Stripe, update DB
  res.json({ message: 'Subscription will cancel at period end' });
});

// PUT /api/billing/payment-method - Update payment card
billingRouter.put('/payment-method', async (_req: Request, res: Response) => {
  // TODO: Create Stripe setup intent
  res.json({ message: 'Payment method updated' });
});

// GET /api/billing/invoices - List invoices
billingRouter.get('/invoices', async (_req: Request, res: Response) => {
  // TODO: Fetch from Stripe
  res.json({ invoices: [] });
});

// GET /api/billing/usage - Get usage stats
billingRouter.get('/usage', async (_req: Request, res: Response) => {
  // TODO: Fetch from DB
  res.json({ generationsToday: 0, schemasCount: 0, apiCallsToday: 0 });
});

// POST /api/webhooks/stripe - Stripe webhook handler
billingRouter.post('/webhooks/stripe', async (req: Request, res: Response) => {
  const event = req.body;
  
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      // TODO: Update subscription in DB
      break;
    case 'payment_intent.succeeded':
      // TODO: Record successful payment
      break;
    case 'payment_intent.payment_failed':
      // TODO: Handle failed payment
      break;
    default:
      console.log(`Unhandled Stripe event: ${event.type}`);
  }
  
  res.json({ received: true });
});
