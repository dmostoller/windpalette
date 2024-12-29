import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { redis } from "@/lib/redis";
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(redis),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
