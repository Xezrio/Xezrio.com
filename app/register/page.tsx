import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "注册",
  description: "创建 xezrio.com 账号。",
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
