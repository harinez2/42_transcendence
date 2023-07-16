import type { NextAuthOptions } from "next-auth";
import FortyTwoProvider from "next-auth/providers/42-school";

export const options: NextAuthOptions = {
	debug: true,
	session: { strategy: "jwt" },
	providers: [
		FortyTwoProvider({
			clientId: process.env.FORTY_TWO_CLIENT_ID,
			clientSecret: process.env.FORTY_TWO_CLIENT_SECRET,
		}),
	],
	callbacks: {
		jwt: async ({ token, user, account }) => {
			if (user) {
				token.user = user;
				const u = user as any
				token.role = u.role;
			}
			if (account) {
				token.accessToken = account.access_token
			}
			return token;
		},
		session: ({ session, token }) => {
			token.accessToken
			return {
				...session,
				user: {
					...session.user,
					role: token.role,
				},
			};
		},
	}
};
