import { createPool } from 'mysql2/promise'

const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DATABASE } = process.env

export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DATABASE
})
