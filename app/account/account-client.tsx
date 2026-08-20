"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { passwordSchema } from "@/lib/auth-constraints";
import styles from "./account.module.css";

type AccountClientProps = {
  username: string;
  isAdmin: boolean;
};

export function AccountClient({ username, isAdmin }: AccountClientProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [pending, setPending] = useState(false);

  async function handlePasswordChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsError(false);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const currentPassword = String(formData.get("currentPassword") ?? "");
    const newPassword = String(formData.get("newPassword") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");
    const result = passwordSchema.safeParse(newPassword);

    if (!currentPassword) {
      setIsError(true);
      setMessage("请输入当前密码。");
      return;
    }

    if (!result.success) {
      setIsError(true);
      setMessage(result.error.issues[0]?.message ?? "请检查新密码。");
      return;
    }

    if (newPassword !== confirmPassword) {
      setIsError(true);
      setMessage("两次输入的新密码不一致。");
      return;
    }

    setPending(true);

    try {
      const response = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });

      if (response.error) {
        setIsError(true);
        setMessage(
          response.error.code === "INVALID_PASSWORD"
            ? "当前密码不正确。"
            : response.error.message ?? "密码修改失败，请稍后再试。",
        );
        return;
      }

      form.reset();
      setMessage("密码已经更新，其他设备上的登录已退出。");
    } catch {
      setIsError(true);
      setMessage("暂时无法连接登录服务，请稍后再试。");
    } finally {
      setPending(false);
    }
  }

  async function handleSignOut() {
    setPending(true);
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.profile} aria-labelledby="account-title">
          <p className={styles.eyebrow}>XEZRIO / ACCOUNT</p>
          <h1 id="account-title">{username}</h1>
          <p>你的账号已经登录。本站暂不收集邮箱，请妥善保管密码。</p>
          <div className={styles.accountActions}>
            {isAdmin ? <Link className={styles.adminLink} href="/admin">管理后台</Link> : null}
            <button className={styles.secondaryButton} type="button" onClick={handleSignOut} disabled={pending}>
              退出登录
            </button>
          </div>
        </section>

        <section className={styles.passwordCard} aria-labelledby="password-title">
          <h2 id="password-title">修改密码</h2>
          <form className={styles.form} onSubmit={handlePasswordChange}>
            <label htmlFor="currentPassword">当前密码</label>
            <input id="currentPassword" name="currentPassword" type="password" autoComplete="current-password" required />

            <label htmlFor="newPassword">新密码</label>
            <input id="newPassword" name="newPassword" type="password" minLength={8} maxLength={128} autoComplete="new-password" required />

            <label htmlFor="confirmPassword">再次输入新密码</label>
            <input id="confirmPassword" name="confirmPassword" type="password" minLength={8} maxLength={128} autoComplete="new-password" required />

            {message ? (
              <p className={isError ? styles.error : styles.success} role="status">{message}</p>
            ) : null}

            <button className={styles.primaryButton} type="submit" disabled={pending}>
              {pending ? "请稍候…" : "保存新密码"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
