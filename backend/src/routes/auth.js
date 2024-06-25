import { Router } from 'express';
import jwt from 'jsonwebtoken';
import pkg from 'pg';

const auth = Router();
const { Pool } = pkg;

// TODO: Move to a .env file
const pool = new Pool({
  user: 'borko',
  host: 'database', 
  database: 'tweeter',
  password: 'borko',
  port: 5432,
});

const { TOKEN_SECRET = 'secret', TOKEN_EXPIRES = '3600' } = process.env;

auth.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt with username:', username, 'and password:', password);
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT check_password($1, $2) AS valid', [username, password]);
    const valid = result.rows[0].valid;
    client.release();

    if (!valid) {
      console.log('Invalid credentials for user:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userResult = await client.query('SELECT id FROM users WHERE username = $1', [username]);
    const user = userResult.rows[0];

    const token = jwt.sign({ id: user.id }, TOKEN_SECRET, { expiresIn: parseInt(TOKEN_EXPIRES) });
    res.json({ token, userId: user.id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

auth.post('/register', async (req, res) => {
  const { name, username, email, password } = req.body;
  console.log('Register attempt with username:', username);
  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, username, email, password]
    );
    client.release();
    console.log('User registered with ID:', result.rows[0].id);
    res.status(201).json({ userId: result.rows[0].id });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

auth.get('/accounts/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT id, name, username, email FROM users WHERE id = $1', [userId]);
    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { auth };