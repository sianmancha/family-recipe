import { connect, disconnect } from '../../../utils/mongodb';
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
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (isPasswordValid) {
          disconnect();
          res.status(200).json({ success: true, message: 'Login successful', user: existingUser });
        } else {
          disconnect();
          res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
      } else {
        disconnect();
        res.status(400).json({ success: false, error: 'No account found with this email. Please create an account.' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
