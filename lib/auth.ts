import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { admin, username } from "better-auth/plugins";
import {
  normalizeUsername,
  toInternalEmail,
  usernameFormatSchema,
  usernameSchema,
} from "@/lib/auth-constraints";

type SignUpBody = {
  email?: unknown;
  name?: unknown;
  username?: unknown;
};

export function getAuth() {
  const { env } = getCloudflareContext();
  const baseURL = env.BETTER_AUTH_URL ?? "http://localhost:3000";
  const additionalTrustedOrigins = env.BETTER_AUTH_TRUSTED_ORIGINS
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];

  if (!env.AUTH_DB) {
    throw new Error("AUTH_DB is not configured.");
  }

  if (!env.BETTER_AUTH_SECRET) {
    throw new Error("BETTER_AUTH_SECRET is not configured.");
  }

  return betterAuth({
    appName: "xezrio.com",
    baseURL,
    secret: env.BETTER_AUTH_SECRET,
    database: env.AUTH_DB,
    trustedOrigins: [baseURL, ...additionalTrustedOrigins],
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      requireEmailVerification: false,
      minPasswordLength: 8,
      maxPasswordLength: 128,
    },
    rateLimit: {
      enabled: true,
      storage: "database",
      window: 60,
      max: 30,
      customRules: {
        "/sign-up/email": { window: 60, max: 5 },
        "/sign-in/username": { window: 60, max: 10 },
      },
    },
    advanced: {
      ipAddress: {
        ipAddressHeaders: ["cf-connecting-ip"],
      },
    },
    hooks: {
      before: createAuthMiddleware(async (context) => {
        if (context.path !== "/sign-up/email") return;

        const body = context.body as SignUpBody;
        const result = usernameSchema.safeParse(body.username);

        if (!result.success) {
          throw APIError.from("BAD_REQUEST", {
            code: "INVALID_USERNAME",
            message: result.error.issues[0]?.message ?? "用户名无效。",
          });
        }

        const normalizedUsername = normalizeUsername(result.data);
        body.username = normalizedUsername;
        body.name = normalizedUsername;
        body.email = toInternalEmail(normalizedUsername);
      }),
    },
    disabledPaths: [
      "/sign-in/email",
      "/request-password-reset",
      "/reset-password",
      "/change-email",
    ],
    plugins: [
      username({
        minUsernameLength: 3,
        maxUsernameLength: 20,
        displayUsername: false,
        immutableUsername: true,
        usernameValidator: (value) => usernameFormatSchema.safeParse(value).success,
      }),
      admin({
        defaultRole: "user",
        adminRoles: ["admin"],
        defaultBanReason: "由管理员停用。",
        bannedUserMessage: "这个账号已被停用。",
      }),
    ],
  });
}
