export type AiAccessUser = {
  id: string;
  createdAt: string | Date;
  plan?: "free" | "pro" | "team" | "custom" | null;
  dailyAiUses?: number;
  lastAiUseDate?: string | null;
};

export type AiAccessResult =
  | {
      allowed: true;
      mode: "trial" | "paid" | "free";
      remaining?: number;
      updatedUser: AiAccessUser;
    }
  | {
      allowed: false;
      reason: string;
      updatedUser?: AiAccessUser;
    };

function getDateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

export function checkAiAccess(user: AiAccessUser | null): AiAccessResult {
  if (!user) {
    return {
      allowed: false,
      reason: "Please create an account or sign in to use Shynvo AI.",
    };
  }

  const now = new Date();
  const createdAt = new Date(user.createdAt);
  const diffMs = now.getTime() - createdAt.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays <= 7) {
    return {
      allowed: true,
      mode: "trial",
      updatedUser: user,
    };
  }

  const paidPlans = new Set(["pro", "team", "custom"]);
  if (user.plan && paidPlans.has(user.plan)) {
    return {
      allowed: true,
      mode: "paid",
      updatedUser: user,
    };
  }

  const today = getDateKey();
  const isNewDay = user.lastAiUseDate !== today;
  const dailyAiUses = isNewDay ? 0 : user.dailyAiUses ?? 0;
  const remaining = Math.max(0, 5 - dailyAiUses);

  if (remaining <= 0) {
    return {
      allowed: false,
      reason: "You have reached your free AI limit for today. Upgrade to continue.",
      updatedUser: {
        ...user,
        dailyAiUses,
        lastAiUseDate: today,
      },
    };
  }

  return {
    allowed: true,
    mode: "free",
    remaining,
    updatedUser: {
      ...user,
      dailyAiUses,
      lastAiUseDate: today,
    },
  };
}