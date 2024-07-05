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
    client.release();

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating tweet:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

tweets.get("/", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT tweets.*, users.username FROM tweets JOIN users ON tweets.user_id = users.id ORDER BY created_at DESC"
    );
    client.release();

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching tweets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { tweets };
