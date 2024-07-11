import express from "express";
import pkg from "pg";
import authenticateToken from "../middleware/auth.js";

const { Pool } = pkg;

const pool = new Pool({
  user: "borko",
  host: "database",
  database: "tweeter",
  password: "borko",
  port: 5432,
});

const tweets = express.Router();

tweets.post("/", authenticateToken, async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO tweets (user_id, content) VALUES ($1, $2) RETURNING *",
      [userId, content]
    );
    
    const userResult = await client.query(
      "SELECT username FROM users WHERE id = $1",
      [userId]
    );
    
    client.release();

    const tweetWithUsername = {
      ...result.rows[0],
      username: userResult.rows[0].username
    };

    res.status(201).json(tweetWithUsername);
  } catch (error) {
    console.error("Error creating tweet:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


tweets.get("/", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT 
        tweets.*, 
        users.username,
        COUNT(likes.id) AS likes_count,
        BOOL_OR(likes.user_id = $1) AS liked_by_user
      FROM tweets 
      JOIN users ON tweets.user_id = users.id
      LEFT JOIN likes ON tweets.id = likes.tweet_id
      GROUP BY tweets.id, users.username
      ORDER BY tweets.created_at DESC
    `, [userId]);
    client.release();

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching tweets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

tweets.delete('/:id', authenticateToken, async (req, res) => {
  const tweetId = req.params.id;
  const userId = req.user.id;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'DELETE FROM tweets WHERE id = $1 AND user_id = $2 RETURNING *',
      [tweetId, userId]
    );
    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tweet not found or not authorized' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error deleting tweet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

tweets.post('/:id/like', authenticateToken, async (req, res) => {
  const tweetId = req.params.id;
  const userId = req.user.id;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO likes (user_id, tweet_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *',
      [userId, tweetId]
    );
    client.release();

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Already liked' });
    }

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error liking tweet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

tweets.delete('/:id/unlike', authenticateToken, async (req, res) => {
  const tweetId = req.params.id;
  const userId = req.user.id;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'DELETE FROM likes WHERE user_id = $1 AND tweet_id = $2 RETURNING *',
      [userId, tweetId]
    );
    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Like not found or not authorized' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error unliking tweet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


export { tweets };
