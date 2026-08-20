"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getAuth } from "@/lib/auth";
import { requireAdmin } from "@/lib/auth-session";

const userIdSchema = z.string().min(1);
const roleSchema = z.enum(["user", "admin"]);

export async function updateUserRole(formData: FormData) {
  const session = await requireAdmin();
  const userId = userIdSchema.safeParse(formData.get("userId"));
  const role = roleSchema.safeParse(formData.get("role"));

  if (!userId.success || !role.success || userId.data === session.user.id) {
    redirect("/admin?notice=invalid-action");
  }

  let notice = "role-updated";

  try {
    await getAuth().api.setRole({
      body: { userId: userId.data, role: role.data },
      headers: await headers(),
    });
  } catch {
    notice = "action-failed";
  }

  revalidatePath("/admin");
  redirect(`/admin?notice=${notice}`);
}

export async function banUser(formData: FormData) {
  const session = await requireAdmin();
  const userId = userIdSchema.safeParse(formData.get("userId"));
  const reason = String(formData.get("reason") ?? "").trim().slice(0, 160);

  if (!userId.success || userId.data === session.user.id) {
    redirect("/admin?notice=invalid-action");
  }

  let notice = "user-banned";

  try {
    await getAuth().api.banUser({
      body: {
        userId: userId.data,
        banReason: reason || "由管理员停用。",
      },
      headers: await headers(),
    });
  } catch {
    notice = "action-failed";
  }

  revalidatePath("/admin");
  redirect(`/admin?notice=${notice}`);
}

export async function unbanUser(formData: FormData) {
  await requireAdmin();
  const userId = userIdSchema.safeParse(formData.get("userId"));

  if (!userId.success) redirect("/admin?notice=invalid-action");

  let notice = "user-unbanned";

  try {
    await getAuth().api.unbanUser({
      body: { userId: userId.data },
      headers: await headers(),
    });
  } catch {
    notice = "action-failed";
  }

  revalidatePath("/admin");
  redirect(`/admin?notice=${notice}`);
}
