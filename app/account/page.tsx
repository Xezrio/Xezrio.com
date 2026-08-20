import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AccountClient } from "./account-client";
import { getAuth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "账号",
  description: "管理你的 xezrio.com 账号。",
};

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await getAuth().api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  return (
    <AccountClient
      username={session.user.username ?? session.user.name}
      isAdmin={session.user.role === "admin"}
    />
  );
}
