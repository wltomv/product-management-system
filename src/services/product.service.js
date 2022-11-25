

import { pool } from "../config/db.js";

const getProductsDB = async () => {
    const query = `SELECT p.id, p.product, p.description, p.price, p.status, c.id as category_id, c.category
    FROM product as p 
    INNER JOIN category as c 
    WHERE p.categoryId = c.id;
    `
    const [rows] = await pool.query(query)
    return rows
}

const getProductsByCategoryDB = async (id) => {
    const [rows] = await pool.query('SELECT id, product FROM product WHERE categoryId=? and status = 1 order by product asc;', [id])
    return rows
}
const getProductsByIdDB = async (id) => {
    const [rows] = await pool.query('SELECT * FROM product WHERE id=?;', [id])
    return rows[0]
}

const newProduct = async (product) => {
    const { name, categoryId, description, price } = product

    const [result] = await pool.query("INSERT INTO product (product, categoryId,description, price, status) values(?,?,?,?,1);", [
        name,
        categoryId,
        description,
        price
    ]);
    return { id: result.insertId, product: name }
}

const updateProductDB = async (product) => {
    const query = "update product set product=?, categoryId=?, description=?, price =? where id=?;"
    const [result] = await pool.query(query, [product.name, product.categoryId, product.description, product.price, product.id])
    return result
}

const updateProductStatusDB = async (product) => {
    const query = "update product set status=? where id=?;"
    const [result] = await pool.query(query, [product.status, product.id])
    return result
}


const deleteProductDB = async (id) => {
    const query = "DELETE FROM product  where id=?;"
    const [result] = await pool.query(query, [id])
    return result
}

export {
    getProductsDB,
    getProductsByIdDB,
    getProductsByCategoryDB,
    newProduct,
    updateProductDB,
    updateProductStatusDB,
    deleteProductDB
}