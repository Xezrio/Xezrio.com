import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { getAuth } from "@/lib/auth";
import { requireAdmin } from "@/lib/auth-session";
import { banUser, unbanUser, updateUserRole } from "./actions";
import styles from "./admin.module.css";

export const metadata: Metadata = {
  title: "账号管理",
  description: "管理 xezrio.com 的注册账号。",
};

export const dynamic = "force-dynamic";

type AdminPageProps = {
  searchParams: Promise<{ notice?: string }>;
};

const notices: Record<string, string> = {
  "role-updated": "账号权限已经更新。",
  "user-banned": "账号已经停用，并退出了现有登录。",
  "user-unbanned": "账号已经恢复使用。",
  "invalid-action": "不能对当前账号执行这个操作。",
  "action-failed": "操作没有完成，请稍后再试。",
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const session = await requireAdmin();
  const { notice } = await searchParams;
  const result = await getAuth().api.listUsers({
    query: {
      limit: 100,
      sortBy: "createdAt",
      sortDirection: "desc",
    },
    headers: await headers(),
  });

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.heading} aria-labelledby="admin-title">
          <div>
            <p className={styles.eyebrow}>XEZRIO / ADMIN</p>
            <h1 id="admin-title">账号管理</h1>
            <p>查看注册账号、调整权限以及停用异常账号。</p>
          </div>
          <Link className={styles.backLink} href="/account">返回我的账号</Link>
        </section>

        {notice && notices[notice] ? (
          <p
            className={notice === "action-failed" || notice === "invalid-action" ? styles.errorNotice : styles.successNotice}
            role="status"
          >
            {notices[notice]}
          </p>
        ) : null}

        <section className={styles.users} aria-labelledby="users-title">
          <div className={styles.listHeading}>
            <h2 id="users-title">所有账号</h2>
            <span>{result.total} 个</span>
          </div>

          {result.users.length ? (
            <ul className={styles.userList}>
              {result.users.map((user) => {
                const username = getUsername(user);
                const role = user.role ?? "user";
                const isCurrentUser = user.id === session.user.id;

                return (
                  <li className={styles.userCard} key={user.id}>
                    <div className={styles.userSummary}>
                      <div>
                        <h3>{username}</h3>
                        <p>注册于 {formatDate(user.createdAt)}</p>
                      </div>
                      <div className={styles.badges}>
                        <span className={role === "admin" ? styles.adminBadge : styles.userBadge}>
                          {role === "admin" ? "管理员" : "普通用户"}
                        </span>
                        {user.banned ? <span className={styles.bannedBadge}>已停用</span> : null}
                        {isCurrentUser ? <span className={styles.currentBadge}>当前账号</span> : null}
                      </div>
                    </div>

                    {user.banned && user.banReason ? (
                      <p className={styles.banReason}>停用原因：{user.banReason}</p>
                    ) : null}

                    <div className={styles.actions}>
                      {isCurrentUser ? (
                        <p className={styles.selfHint}>管理员账号。</p>
                      ) : (
                        <>
                          <form action={updateUserRole}>
                            <input name="userId" type="hidden" value={user.id} />
                            <input name="role" type="hidden" value={role === "admin" ? "user" : "admin"} />
                            <button className={styles.secondaryButton} type="submit">
                              {role === "admin" ? "取消管理员" : "设为管理员"}
                            </button>
                          </form>

                          {user.banned ? (
                            <form action={unbanUser}>
                              <input name="userId" type="hidden" value={user.id} />
                              <button className={styles.primaryButton} type="submit">恢复账号</button>
                            </form>
                          ) : (
                            <form className={styles.banForm} action={banUser}>
                              <input name="userId" type="hidden" value={user.id} />
                              <label className={styles.srOnly} htmlFor={`reason-${user.id}`}>停用原因</label>
                              <input
                                id={`reason-${user.id}`}
                                name="reason"
                                type="text"
                                maxLength={160}
                                placeholder="停用原因（可选）"
                              />
                              <button className={styles.dangerButton} type="submit">停用账号</button>
                            </form>
                          )}
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className={styles.empty}>暂时没有可显示的账号。</p>
          )}
        </section>
      </div>
    </main>
  );
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

function getUsername(user: { name: string; username?: string | null }) {
  return user.username ?? user.name;
}
