import NextAuth from "next-auth"
import FortyTwoProvider from "next-auth/providers/42-school";

export const authOptions = {
  providers: [
    FortyTwoProvider({
      clientId: process.env.FORTY_TWO_CLIENT_ID,
      clientSecret: process.env.FORTY_TWO_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session, token }: any) {
      session.user.accessToken = token.accessToken;
      return session // The return type will match the one returned in `useSession()`
    },
    async jwt({ token, account }: any) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token
    }
  },
};


export default NextAuth(authOptions);
