
import { pool } from "../config/db.js";

const getUsersDB = async () => {
    const [rows] = await pool.query('SELECT * FROM user;')
    return rows
}

const getUsersByIdDB = async (id) => {
    const [rows] = await pool.query('SELECT * FROM user WHERE id=?;', [id])
    return rows[0]
}


export { getUsersDB, getUsersByIdDB }