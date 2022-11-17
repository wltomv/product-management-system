
import { pool } from "../config/db.js";

const getUsersDB = async () => {
    const [rows] = await pool.query("select id, name, email, contactNumber,status from user where role ='user'")
    return rows
}

const getUsersByIdDB = async (id) => {
    const [rows] = await pool.query('SELECT name, contactNumber, email, status FROM user WHERE id=?;', [id])
    return rows[0]
}

const updateUserStatusDB = async (user) => {
    const query = "update user set status=? where id=?;"
    const [result] = await pool.query(query, [user.status, user.id])
    return result
}

export { getUsersDB, getUsersByIdDB, updateUserStatusDB }