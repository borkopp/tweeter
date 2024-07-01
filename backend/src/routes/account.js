import express from 'express';
import pkg from 'pg';
import authenticateToken  from '../middleware/auth.js';

const { Pool } = pkg;

// TODO: Move to a .env file
const pool = new Pool({
    user: 'borko',
    host: 'database', 
    database: 'tweeter',
    password: 'borko',
    port: 5432,
});

const account = express.Router();

account.get("/:id", authenticateToken, async (req, res) => {
  const userId = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT id, name, username, email FROM users WHERE id = $1",
      [req.user.id]
    );
    client.release();

    if (result.rows.length === 0) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", result.rows[0]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
  
  export { account };