import { pool } from '../config/db.js'

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

    return { status: true, user: rows[0] };

}

const emailExists = async (email) => {
    const query = "SELECT email, password from user where email =?;"
    const [rows] = await pool.query(query, [email])
    console.log(rows);
    if (rows.length <= 0) return false
    return true
}

const validateOldPassword = async (email, oldPassword) => {
    let query = 'select * from user where email = ? and password = ?;'
    const [rows] = await pool.query(query, [email, oldPassword])

    return rows;
}

const updatePassword = async (email, newPassword) => {
    const query = "update user set password = ? where email = ?;"
    const [result] = await pool.query(query, [newPassword, email])
    return result
}

export { newUser, login, emailExists, validateOldPassword, updatePassword }