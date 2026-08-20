"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import {
  loginFormSchema,
  normalizeUsername,
  registerFormSchema,
  toInternalEmail,
} from "@/lib/auth-constraints";
import styles from "./auth-form.module.css";

type AuthFormProps = {
  mode: "login" | "register";
};

type AuthError = {
  code?: string;
  message?: string;
  status?: number;
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isRegister = mode === "register";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const schema = isRegister ? registerFormSchema : loginFormSchema;
    const result = schema.safeParse({
      username: formData.get("username"),
      password: formData.get("password"),
    });

    if (!result.success) {
      setMessage(result.error.issues[0]?.message ?? "请检查填写内容。");
      return;
    }

    const username = normalizeUsername(result.data.username);
    setPending(true);

    try {
      const response = isRegister
        ? await authClient.signUp.email({
            email: toInternalEmail(username),
            name: username,
            password: result.data.password,
            username,
          })
        : await authClient.signIn.username({
            username,
            password: result.data.password,
          });

      if (response.error) {
        setMessage(getAuthErrorMessage(response.error));
        return;
      }

      router.push("/account");
      router.refresh();
    } catch {
      setMessage("暂时无法连接登录服务，请稍后再试。");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="auth-title">
        <p className={styles.eyebrow}>XEZRIO / ACCOUNT</p>
        <h1 id="auth-title">{isRegister ? "创建账号" : "欢迎回来"}</h1>
        <p className={styles.intro}>
          {isRegister
            ? "只需用户名和密码，无须验证。"
            : "回到你的个人空间。"}
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label htmlFor="username">用户名</label>
          <input
            id="username"
            name="username"
            type="text"
            minLength={3}
            maxLength={20}
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            required
          />

          <label htmlFor="password">密码</label>
          <div className={styles.passwordField}>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              minLength={8}
              maxLength={128}
              autoComplete={isRegister ? "new-password" : "current-password"}
              required
            />
            <button
              className={styles.passwordToggle}
              type="button"
              aria-label={showPassword ? "隐藏密码" : "显示密码"}
              aria-pressed={showPassword}
              title={showPassword ? "隐藏密码" : "显示密码"}
              onClick={() => setShowPassword((visible) => !visible)}
            >
              {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
            </button>
          </div>

          {message ? <p className={styles.error} role="alert">{message}</p> : null}

          <button type="submit" disabled={pending}>
            {pending ? "请稍候…" : isRegister ? "注册并登录" : "登录"}
          </button>
        </form>

        {isRegister ? (
          <p className={styles.notice}>本站注册暂不收集邮箱，若密码遗失请联系站长 Xezrio 找回。</p>
        ) : null}

        <p className={styles.switchLink}>
          {isRegister ? "已经有账号？" : "还没有账号？"}{" "}
          <Link href={isRegister ? "/login" : "/register"}>
            {isRegister ? "直接登录" : "创建账号"}
          </Link>
        </p>
      </section>
    </main>
  );
}

function getAuthErrorMessage(error: AuthError) {
  if (error.status === 429) return "尝试次数太多，请一分钟后再试。";

  switch (error.code) {
    case "USERNAME_IS_ALREADY_TAKEN":
    case "USER_ALREADY_EXISTS":
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
      return "这个用户名已经被注册。";
    case "INVALID_USERNAME_OR_PASSWORD":
    case "INVALID_EMAIL_OR_PASSWORD":
      return "用户名或密码不正确。";
    case "USERNAME_TOO_SHORT":
      return "用户名至少需要 3 个字符。";
    case "USERNAME_TOO_LONG":
      return "用户名最多只能有 20 个字符。";
    case "INVALID_USERNAME":
      return "用户名只能包含英文字母、数字和下划线。";
    case "PASSWORD_TOO_SHORT":
      return "密码至少需要 8 个字符。";
    default:
      return error.message ?? "操作失败，请稍后再试。";
  }
}
