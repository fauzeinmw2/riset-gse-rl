import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
    try {
        // Kueri SQL untuk menggabungkan Order, User, dan Product
        const sqlQuery = `
            SELECT
                o.id AS order_id,
                u.name AS user_name,
                p.name AS product_name,
                p.category AS product_category,
                o.quantity,
                o.total_price,
                o.created_at AS order_date
            FROM
                public.orders o
            JOIN
                public.users u ON o.user_id = u.id
            JOIN
                public.products p ON o.product_id = p.id
            ORDER BY
                o.created_at DESC;
        `;

        // Jalankan kueri menggunakan pool
        const result = await pool.query(sqlQuery);
        
        // Kirim hasil baris sebagai respons JSON
        res.json(result.rows);
    } catch (err) {
        // Tangani error dan kirim status 500
        console.error("Error fetching orders:", err);
        res.status(500).json({ 
            error: "Failed to retrieve order data", 
            details: err.message 
        });
    }
});

export default router;
