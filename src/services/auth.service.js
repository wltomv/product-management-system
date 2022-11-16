import { pool } from '../config/db.js'

const newUser = async (user) => {
    const { name, contactNumber, email, password, status, role } = user

    const [rows] = await pool.query('INSERT INTO user (name, contactNumber, email,password,status,role) values(?,?,?,?,?,?);', [
        name, contactNumber, email, password, status, role
    ]);
    return { id: rows.insertId, name, contactNumber, email, status }
}

const login = async ({ email, password }) => {
    const query = "SELECT email, password, role, status FROM user WHERE email=?;"

    const [rows] = await pool.query(query, [email])
    if (rows.length == 0) return { status: false, message: "Incorrect user" }
    if (rows[0].password !== password) return { status: false, message: "Incorrect password" }
    if (rows[0].status == 0) return { status: false, message: "Wait for admin approval" }

    return { status: true, user: rows[0] };

}


export { newUser, login }