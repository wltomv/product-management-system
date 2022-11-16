import { pool } from '../config/db.js'
import { generateToken } from '../utils/jwt.handle.js';

const newUser = async (user) => {
    const { name, contactNumber, email, password } = user

    const [rows] = await pool.query("INSERT INTO user (name, contactNumber, email,password,status,role) values(?,?,?,?,0,'user');", [
        name, contactNumber, email, password
    ]);
    return { id: rows.insertId, name, email }
}

const login = async (user) => {
    const query = "SELECT email, password, role, status FROM user WHERE email=?;"

    const [rows] = await pool.query(query, [user.email])
    if (rows.length == 0) return { status: false, message: "Incorrect user" }
    if (rows[0].password !== user.password) return { status: false, message: "Incorrect password" }
    if (rows[0].status == 0) return { status: false, message: "Wait for admin approval" }

    const { email, rol } = rows[0]
    const token = await generateToken({ email, rol })

    return { status: true, token };

}

const emailExists = async (email) => {
    const query = "SELECT email, password from user where email =?;"
    const [rows] = await pool.query(query, [email])
    console.log(rows);
    if (rows.length <= 0) return false
    return true
}
export { newUser, login, emailExists }