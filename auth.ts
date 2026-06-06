import NextAuth from "next-auth"

import authConfig from "./auth.config"
import { db } from "./lib/db";
import { getUserById } from "./modules/auth/actions";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      try {
        let dbUser = await db.user.findUnique({ where: { email: user.email } });

        if (!dbUser) {
          dbUser = await db.user.create({
            data: {
              name: user.name,
              email: user.email,
              image: user.image,
            },
          });
        }

        if (account) {
          const existingAccount = await db.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
          });

          if (!existingAccount) {
            await db.account.create({
              data: {
                userId: dbUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                accessToken: account.access_token ?? null,
                refreshToken: account.refresh_token ?? null,
                expiresAt: account.expires_at ?? null,
                tokenType: account.token_type ?? null,
                scope: account.scope ?? null,
                idToken: account.id_token ?? null,
              },
            });
          }
        }

        user.id = dbUser.id;
      } catch (error) {
        console.error("[signIn] DB error:", error);
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
      }

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  ...authConfig,
})
