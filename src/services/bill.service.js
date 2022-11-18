import { pool } from "../config/db.js";


const saveBill = async (orderDetails) => {

    const query = "insert into bill (name, uuid, email, contactNumber, paymentMethod, total, productDetails, createdBy) values(?,?,?,?,?,?,?,?)";
    const [result] = await pool.query(query, [
        orderDetails.name,
        orderDetails.uuid,
        orderDetails.email,
        orderDetails.contactNumber,
        orderDetails.paymentMethod,
        orderDetails.totalAmount,
        JSON.stringify(orderDetails.productDetails),
        'email@gmail.com'
    ])

    return result
}

const getBillsDB = async () => {
    const [rows] = await pool.query("select *from bill order by id DESC;")
    return rows
}

const deleteBillDB = async (id) => {
    const query = "DELETE FROM bill  where id=?;"
    const [result] = await pool.query(query, [id])
    return result
}


export { saveBill, getBillsDB, deleteBillDB }
