import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth";

export const getCurrentSession = cache(async () => {
  return getAuth().api.getSession({
    headers: await headers(),
  });
});

export async function requireAdmin() {
  const session = await getCurrentSession();

  if (!session) redirect("/login");
  if (session.user.role !== "admin") redirect("/account");

  return session;
}
