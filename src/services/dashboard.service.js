import { pool } from "../config/db.js";

const DashboardData = async () => {
    let query = 'SELECT count(id) as categoryCount from category';
    const [categoryCount] = await pool.query(query)

    query = 'SELECT count(id) as productCount from product;'
    const [productCount] = await pool.query(query)

    query = 'SELECT counT(id) as billCount from bill;'
    const [billCount] = await pool.query(query)

    return { ...categoryCount[0], ...productCount[0], ...billCount[0] }
}


export { DashboardData }