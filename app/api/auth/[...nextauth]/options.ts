import { BASE_HTTP } from "@/utils/constants";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
interface IUser {
  name: string;
  email: string;
  password: string;
}
export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENTID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        name: { label: "Name", type: "text", placeholder: "my name" },
        password: { label: "Password", type: "password" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@email.com",
        },
      },
      async authorize(credentials, req): Promise<any> {
        console.log("credentials, req");
        console.log(credentials, req);
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        console.log(req.body);
        const res = await fetch(`${BASE_HTTP}/auth/signin`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        // console.log(res.json());
        const data = await res.json();
        console.log(data);
        const { user, tokens } = data;
        // If no error and we have user data, return it
        if (res.ok && user) {
          return {
            name: user.name,
            email: user.email,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          };
        }
        return null; //if user data could not be retrieved
        // return { id: 1, name: "J Smith", email: "jsmith@example.com" };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account }) {
      console.log({ account });
      console.log({ token });
      console.log({ user });

      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;

      return session;
    },
  },
  pages: {
    signIn: "/registrar",
  },
};
