import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

const CredProv = CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: 'Credentials',
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials, req) {
        if (!credentials) return null
        if (!req) return null

        const { username, password } = credentials
        // Fetch user and password hash from your database

        // Add logic here to look up the user from the credentials supplied
        const user = {
            id: 1,
            name: 'J Smith',
            email: 'jsmith@example.com',
            image: 'https://i.pravatar.cc/150?u=jsmith@example.com',
        }
        if (username === 'aa' && password === 'aa') {
            // Any object returned will be saved in `user` property of the JWT
            return user
        }
        // If you return null then an error will be displayed advising the user to check their details.
        return null
    },
})

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_SECRET_ID as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET_ID as string,
        }),
        CredProv,
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
