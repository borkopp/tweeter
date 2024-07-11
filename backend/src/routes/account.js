import express from "express";
import pkg from "pg";
import authenticateToken from "../middleware/auth.js";

const { Pool } = pkg;

// TODO: Move to a .env file
const pool = new Pool({
  user: "borko",
  host: "database",
  database: "tweeter",
  password: "borko",
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

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

account.patch("/change-username", authenticateToken, async (req, res) => {
  const { newUsername } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      "UPDATE users SET username = $1 WHERE id = $2 RETURNING id, name, username, email",
      [newUsername, req.user.id]
    );
    client.release();

    if (result.rows.length === 0) {
      console.log("User not found for ID:", req.user.id);
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating username:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

account.patch("/change-name", authenticateToken, async (req, res) => {
  const { newName } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      "UPDATE users SET name = $1 WHERE id = $2 RETURNING id, name, username, email",
      [newName, req.user.id]
    );
    client.release();

    if (result.rows.length === 0) {
      console.log("User not found for ID:", req.user.id);
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating name:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


account.patch("/change-password", authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const client = await pool.connect();
    const userResult = await client.query(
      "SELECT username, password FROM users WHERE id = $1",
      [userId]
    );

    if (userResult.rows.length === 0) {
      client.release();
      return res.status(404).json({ message: "User not found" });
    }

    const { username } = userResult.rows[0];

    const validPasswordResult = await client.query(
      "SELECT check_password($1, $2) AS valid",
      [username, currentPassword]
    );

    if (!validPasswordResult.rows[0].valid) {
      client.release();
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    await client.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [newPassword, userId]
    );
    client.release();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { account };
