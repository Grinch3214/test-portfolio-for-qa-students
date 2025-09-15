import { pool } from '../db.js';
import jwt from 'jsonwebtoken';

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    if (password !== user.password) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const token = jwt.sign(
      { username: user.email, id: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
        // expiresIn: '1m',
      }
    );

    res.json({ token, id: user.id });
  } catch (error) {
    console.error('Error login:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export { login };
