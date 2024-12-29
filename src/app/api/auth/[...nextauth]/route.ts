import NextAuth from "next-auth";
import { authOptions } from "../../../../lib/auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;

      name?: string | null;

      email?: string | null;

      image?: string | null;
    };
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
