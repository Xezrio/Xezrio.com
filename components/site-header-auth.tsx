"use client";

import { authClient } from "@/lib/auth-client";
import { SiteHeader } from "./site-header";

export function SiteHeaderAuth() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user
    ? {
        name: session.user.username ?? session.user.name,
        avatar: session.user.image ?? undefined,
      }
    : null;

  return <SiteHeader user={user} isAuthPending={isPending} />;
}
