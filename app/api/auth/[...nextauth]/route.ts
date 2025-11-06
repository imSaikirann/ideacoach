import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.sub = profile.sub; 
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.sub = token.sub; 
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
