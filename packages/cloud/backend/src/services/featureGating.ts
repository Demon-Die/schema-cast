type UUID = string;

interface FeatureLimits {
  free: { maxSchemas: number, generationsPerDay: number, teamMembers: number }
  pro: { maxSchemas: number, generationsPerDay: number, teamMembers: number }
  team: { maxSchemas: number, generationsPerDay: number, teamMembers: number }
}

const featureLimits: FeatureLimits = {
  free: { maxSchemas: 10, generationsPerDay: 100, teamMembers: 0 },
  pro: { maxSchemas: 500, generationsPerDay: 10000, teamMembers: 3 },
  team: { maxSchemas: Infinity, generationsPerDay: Infinity, teamMembers: Infinity }
};

// Mocks for DB calls
async function getSubscription(userId: UUID): Promise<{ plan: 'free' | 'pro' | 'team' }> {
  return { plan: 'free' };
}

async function getUsageToday(userId: UUID): Promise<number> {
  return 0;
}

export async function checkFeatureAccess(userId: UUID, feature: string): Promise<boolean> {
  const subscription = await getSubscription(userId);
  
  switch(feature) {
    case 'team_collaboration':
      return subscription.plan !== 'free';
    case 'audit_logs':
      return subscription.plan === 'team';
    case 'api_access':
      return subscription.plan !== 'free';
    default:
      return false;
  }
}

export async function checkRateLimit(userId: UUID): Promise<boolean> {
  const subscription = await getSubscription(userId);
  const todayUsage = await getUsageToday(userId);
  const limit = featureLimits[subscription.plan].generationsPerDay;
  
  return todayUsage < limit;
}
