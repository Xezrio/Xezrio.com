import { z } from "zod";

const reservedUsernames = new Set([
  "admin",
  "administrator",
  "moderator",
  "official",
  "root",
  "support",
  "system",
  "xezrio",
]);

export const usernameFormatSchema = z
  .string()
  .trim()
  .min(3, "用户名至少需要 3 个字符。")
  .max(20, "用户名最多只能有 20 个字符。")
  .regex(/^[a-zA-Z0-9_]+$/, "用户名只能包含英文字母、数字和下划线。");

export const usernameSchema = usernameFormatSchema
  .refine((username) => !reservedUsernames.has(username.toLowerCase()), "这个用户名不能注册。");

export const passwordSchema = z
  .string()
  .min(8, "密码至少需要 8 个字符。")
  .max(128, "密码最多只能有 128 个字符。");

export const loginFormSchema = z.object({
  username: usernameFormatSchema,
  password: passwordSchema,
});

export const registerFormSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export function normalizeUsername(username: string) {
  return username.trim().toLowerCase();
}

export function toInternalEmail(username: string) {
  return `${normalizeUsername(username)}@users.xezrio.invalid`;
}
