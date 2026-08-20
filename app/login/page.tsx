import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "登录",
  description: "登录 xezrio.com 账号。",
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
