import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// INSERT user
router.post("/", async (req, res) => {
    const { username, email } = req.body;

    try {
        const result = await pool.query(
        "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *",
        [username, email]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
