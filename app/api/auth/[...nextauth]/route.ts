import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account, profile }) {
      // On first sign in
      if (account && profile) {
        token.sub = profile.sub;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        // expose user id on session
        (session.user as any).sub = token.sub;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
