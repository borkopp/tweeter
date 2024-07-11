import dotenv from 'dotenv';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import pkg from 'pg';
dotenv.config();

const auth = Router();
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const { TOKEN_SECRET = 'secret', TOKEN_EXPIRES = '3600' } = process.env;

/**
 * Handles user login by verifying the provided username and password.
 *
 * @param {Object} req - The Express request object.
 * @param {string} req.body.username - The username of the user attempting to log in.
 * @param {string} req.body.password - The password of the user attempting to log in.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the login process is complete.
 */
auth.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT check_password($1, $2) AS valid', [username, password]);
    const valid = result.rows[0].valid;
    client.release();

    if (!valid) {
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

/**
 * Handles user registration by creating a new user in the database.
 *
 * @param {Object} req - The Express request object.
 * @param {string} req.body.name - The name of the user to be registered.
 * @param {string} req.body.username - The username of the user to be registered.
 * @param {string} req.body.email - The email of the user to be registered.
 * @param {string} req.body.password - The password of the user to be registered.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the registration process is complete.
 */
auth.post('/register', async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, username, email, password]
    );
    client.release();
    res.status(201).json({ userId: result.rows[0].id });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



/**
 * Handles a request to check the current session authentication status.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} req.session - The user's session data.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the response is sent.
 */
auth.get('/session', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).send('Not authenticated');
  }
});



export { auth };