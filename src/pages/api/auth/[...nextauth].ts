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
        email: { label: "Email", type: "text", placeholder: "user123"},
        password: { label: "Senha", type: "password" },
      },
      
      async authorize(credentials, req) {
        const user = { id: "1", email: "ste@gmail.com", password: "123", name: "Maxwell ADM"}
        const user2 = { id: "2", email: "jose@gmail.com", password: "123", name: "Jose"}
  
        if ( credentials?.email == user2.email && credentials?.password == user2.password ) {
          // Any object returned will be saved in `user` property of the JWT
          return user2
          
        } else return null
      }
    })
  ],

  theme: {
    colorScheme: "light",
    buttonText: "entrar com o Google"
  },
  secret: process.env.JWT_SECRET
}

export default NextAuth(authOptions)