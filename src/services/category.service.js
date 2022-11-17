

import { pool } from "../config/db.js";

const getCategoriesDB = async () => {
    const [rows] = await pool.query("select * from category order by category")
    return rows
}

const newCategory = async (category) => {
    const { name } = category

    const [result] = await pool.query("INSERT INTO category (category) values(?);", [
        name
    ]);
    return { id: result.insertId, category: name }
}

const updateCategoryDB = async (category) => {
    const query = "update category set category=? where id=?;"
    const [result] = await pool.query(query, [category.name, category.id])
    return result
}

export { getCategoriesDB, newCategory, updateCategoryDB }