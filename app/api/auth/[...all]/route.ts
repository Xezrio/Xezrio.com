import { getAuth } from "@/lib/auth";

async function authHandler(request: Request) {
  return getAuth().handler(request);
}

export { authHandler as GET, authHandler as POST };
