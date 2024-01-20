import { connect, disconnect } from '../../../utils/mongodb'
const bcrypt = require('bcrypt');


import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const connection = await connect();
      const { email, password } = req.body;
      const usersCollection = connection.db().collection('users');
      const existingUser = await usersCollection.findOne({ email });

      if (existingUser) {
        disconnect();
        res.status(400).json({ success: false, error: 'An account with this email already exists.' });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await usersCollection.insertOne({ email, password: hashedPassword });
        disconnect();
        res.status(201).json({ success: true, message: 'Account created successfully' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
