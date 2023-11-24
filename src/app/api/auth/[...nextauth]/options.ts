import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google";



export const options: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      accessTokenUrl: 'https://oauth2.googleapis.com/token',
      authorization: {
        url: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.events',

        }
      }
    })

  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token = Object.assign({}, token, { access_token: account.access_token, refresh_token: account.refresh_token });
      }
      return token
    },
    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, { access_token: token.access_token, refresh: token.refresh_token })
      }
      return session
    }
  },
}