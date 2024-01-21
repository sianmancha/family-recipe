// pages/api/auth/[...nextauth].ts

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connect, disconnect } from '../../../utils/mongodb';

interface User {
  id: string;
  name: string;
  email: string;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials, req) => {
        try {
            if (!credentials || !credentials.username || !credentials.password) {
              return Promise.resolve(null);
            }
        
            const connection = await connect();
            const usersCollection = connection.db('family-recipes').collection('users');
        
            const existingUser = await usersCollection.findOne({ email: credentials.username });
        
            if (!existingUser) {
              const newUser = {
                name: req.body && req.body.name ? req.body.name : '',
                email: credentials.username,
                password: credentials.password,
              };
        
              // Insert the new user into the database
              const result = await usersCollection.insertOne(newUser);
        
              if (result.acknowledged) {
                disconnect();
                const user: User = { id: result.insertedId.toString(), email: newUser.email, name: newUser.name };
                return Promise.resolve(user);
              } else {
                disconnect();
                return Promise.resolve(null);
              }
            } else {
              // User already exists, check credentials for login
              if (existingUser.password === credentials.password) {
                disconnect();
                const user: User = { id: existingUser._id.toString(), email: existingUser.email, name: existingUser.name};
                return Promise.resolve(user);
              } else {
                disconnect();
                return Promise.resolve(null);
              }
            }
          } catch (error) {
            console.error('Error during authentication:', error);
            return Promise.resolve(null);
          }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl + '/profile'
    }
  },
});
