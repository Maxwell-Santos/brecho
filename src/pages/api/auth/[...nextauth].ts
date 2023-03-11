import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),

    CredentialsProvider({
      name: "Credenciais",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "maxdsantos"},
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials, req) {
        const user = { id: "1", username: "max", password: "123", name: "Maxwell ADM"}
  
        if ( credentials?.username == user.username && credentials?.password == user.password ) {
          // Any object returned will be saved in `user` property of the JWT
          return user
          
        } else return null
      }
    })
  ],
  // pages: {
  //   signIn: "/login"
  // },
  theme: {
    colorScheme: "light",
    buttonText: "entrar com o Google"
  },
  secret: process.env.JWT_SECRET
}

export default NextAuth(authOptions)