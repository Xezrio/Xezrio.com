import { randomBytes } from "node:crypto";
import { spawnSync } from "node:child_process";
import { hashPassword } from "better-auth/crypto";

const args = process.argv.slice(2);
const scope = args.includes("--remote") ? "--remote" : "--local";
const usernameInput = args.find((argument) => !argument.startsWith("--"));

if (!usernameInput) {
  fail("请提供用户名，例如：npm run admin:create:local -- Xezrio");
}

const username = usernameInput.trim().toLowerCase();

if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
  fail("用户名需要是 3–20 个英文字母、数字或下划线。");
}

let existing;

try {
  existing = runD1(
    `SELECT "id", "username", "role" FROM "user" WHERE "username" = ${sqlValue(username)} LIMIT 1`,
  );
} catch (error) {
  fail(getErrorMessage(error));
}

if (existing[0]?.results?.length) {
  fail(`账号 ${username} 已经存在；请在后台提权，不要重复创建。`);
}

const password = await readHidden("输入密码（至少 8 位）：");

if (password.length < 8 || password.length > 128) {
  fail("密码长度需要在 8–128 位之间。");
}

const confirmation = await readHidden("再次输入密码：");

if (password !== confirmation) {
  fail("两次输入的密码不一致。");
}

const userId = randomBytes(16).toString("hex");
const accountId = randomBytes(16).toString("hex");
const email = `${username}@users.xezrio.invalid`;
const now = Date.now();
const passwordHash = await hashPassword(password);
const insertSql = `
INSERT INTO "user" (
  "id", "name", "email", "emailVerified", "image", "createdAt", "updatedAt",
  "username", "role", "banned", "banReason", "banExpires"
) VALUES (
  ${sqlValue(userId)}, ${sqlValue(username)}, ${sqlValue(email)}, 0, NULL, ${now}, ${now},
  ${sqlValue(username)}, 'admin', 0, NULL, NULL
);
INSERT INTO "account" (
  "id", "issuer", "accountId", "providerId", "userId", "password", "createdAt", "updatedAt"
) VALUES (
  ${sqlValue(accountId)}, 'local:credential', ${sqlValue(userId)}, 'credential',
  ${sqlValue(userId)}, ${sqlValue(passwordHash)}, ${now}, ${now}
);`;

try {
  runD1(insertSql);
} catch (error) {
  cleanupPartialAccount(userId, accountId);
  fail(getErrorMessage(error));
}

console.log(`管理员账号 ${username} 已创建。`);
console.log(scope === "--remote" ? "目标：线上 D1" : "目标：本地 D1");

function runD1(sql) {
  const executable = process.platform === "win32" ? "wrangler.cmd" : "wrangler";
  const result = spawnSync(
    executable,
    ["d1", "execute", "AUTH_DB", scope, "--json", "--command", sql],
    {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "inherit"],
    },
  );

  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error("D1 操作失败，请先确认数据库配置和迁移已经完成。");
  }

  let output;

  try {
    output = JSON.parse(result.stdout);
  } catch {
    throw new Error("无法读取 D1 返回结果。");
  }

  if (!Array.isArray(output) || output.some((entry) => !entry.success)) {
    throw new Error("D1 没有完成全部操作。");
  }

  return output;
}

function cleanupPartialAccount(userId, accountId) {
  try {
    runD1(
      `DELETE FROM "account" WHERE "id" = ${sqlValue(accountId)}; DELETE FROM "user" WHERE "id" = ${sqlValue(userId)};`,
    );
  } catch {
    console.error("自动清理失败，请检查数据库中是否留下了不完整账号。");
  }
}

function sqlValue(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function getErrorMessage(error) {
  return error instanceof Error ? error.message : "操作失败。";
}

function readHidden(label) {
  if (!process.stdin.isTTY || !process.stdout.isTTY || !process.stdin.setRawMode) {
    fail("这个命令需要在可交互的终端中运行，密码不会显示在屏幕上。");
  }

  return new Promise((resolve, reject) => {
    let value = "";
    process.stdout.write(label);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    function finish() {
      process.stdin.off("data", onData);
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdout.write("\n");
    }

    function onData(chunk) {
      for (const character of chunk) {
        if (character === "\u0003") {
          finish();
          reject(new Error("已取消。"));
          return;
        }

        if (character === "\r" || character === "\n") {
          finish();
          resolve(value);
          return;
        }

        if (character === "\u007f" || character === "\b") {
          value = value.slice(0, -1);
          continue;
        }

        if (character >= " ") value += character;
      }
    }

    process.stdin.on("data", onData);
  });
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
