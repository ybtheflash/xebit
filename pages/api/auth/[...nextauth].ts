import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { getAppwriteConfig } from '../../../lib/appwrite'
import { Query } from 'node-appwrite'
import { withRateLimit } from '../../../lib/withRateLimit'
import jwt from 'jsonwebtoken';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        
        try {
          const { databases, DATABASE_ID, USERS_COLLECTION_ID } = getAppwriteConfig();
          
          const users = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [
            Query.equal('username', credentials.username)
          ]);

          if (users.documents.length === 0) return null;

          const user = users.documents[0];
          
          if (bcrypt.compareSync(credentials.password, user.password)) {
            return { id: user.$id, name: user.username, email: user.email, email_verified: user.email_verified }
          }
        } catch (error) {
          console.error('Error during authorization:', error);
        }
        return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        // token.exp = Math.floor(Date.now() / 1000) + (60 * 60);
        token.email_verified = user.email_verified;
        token.accessToken = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
      }
      return { ...token, email_verified: user?.email_verified ?? token.email_verified };
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email_verified = token.email_verified as boolean;
        session.accessToken = token.accessToken as string;
        // session.accessToken = jwt.sign(token, process.env.JWT_SECRET, { expiresIn: '1h' });
      }
      return session;
    },
  },
  pages: {
    signIn: '/accounts',
    error: '/accounts', // Redirect to accounts page on error
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export default withRateLimit(handler)
