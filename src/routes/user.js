import { Router } from "express";
import { pool } from "../config/db.js";
import { getUsers } from "../controllers/user.controller.js";

const router = Router();


router.get('/', getUsers);
router.get('/ping', async (req, res) => {
    const [result] = await pool.query('SELECT 1 +1 AS result')
    res.json(result[0])
})





export { router };