import dotenv from "dotenv";
import express from "express";
import pkg from "pg";
import authenticateToken from "../middleware/auth.js";
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const account = express.Router();

/**
 * Fetches the user information for the specified user ID.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} req.params - The route parameters.
 * @param {string} req.params.id - The ID of the user to fetch.
 * @param {Object} res - The Express response object.
 * @returns {Promise<Object>} - The user information, including id, name, username, and email.
 * @throws {Error} - If there is an error fetching the user information.
 */
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

/**
 * Updates the username for the authenticated user.
 *
 * @param {string} newUsername - The new username to set for the user.
 * @returns {Promise<Object>} - The updated user information, including id, name, username, and email.
 * @throws {Error} - If there is an error updating the username.
 */
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

/**
 * Updates the name for the authenticated user.
 *
 * @param {string} newName - The new name to set for the user.
 * @returns {Promise<Object>} - The updated user information, including id, name, username, and email.
 * @throws {Error} - If there is an error updating the name.
 */
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


/**
 * Updates the password for the authenticated user.
 *
 * @param {string} currentPassword - The user's current password.
 * @param {string} newPassword - The new password to set for the user.
 * @returns {Promise<Object>} - A success message indicating the password was updated successfully.
 * @throws {Error} - If there is an error updating the password, such as the current password being incorrect.
 */
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
