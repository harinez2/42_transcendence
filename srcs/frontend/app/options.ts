import type { NextAuthOptions } from "next-auth";
import FortyTwoProvider, {
  FortyTwoProfile,
} from "next-auth/providers/42-school";
import axios from "axios";
import { API_URL } from "@/config";

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
    jwt: async ({ token, profile }) => {
      if (profile) {
        try {
          const profile42 = profile as FortyTwoProfile;
          let { data } = await axios.get(
            `${API_URL}/users/42/${profile42.login}`,
          );
          if (!data) {
            const createUserDto = {
              username: profile42.login,
              email: profile42.email,
            };
            await axios.post(`${API_URL}/users`, createUserDto);
            const response = await axios.get(
              `${API_URL}/users/42/${profile42.login}`,
            );
            data = response.data;
          }
          token.id = data.id;
        } catch (error) {
          console.error("Error in jwt callback", error);
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as number;
      }
      console.log("session begin");
      console.log(session);
      console.log(token);
      console.log("session end");
      return session;
    },
  },
};
