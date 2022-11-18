
import { v1 as uuidv1 } from 'uuid';
import { deleteBillDB, getBillsDB, saveBill } from '../services/bill.service.js';

const registerBill = async (req, res) => {
    try {
        const uuid = uuidv1();
        const orderDetails = req.body;

        const result = await saveBill({ uuid, ...orderDetails })
        if (result.affectedRows === 0)
            return res.status(500).json({ status: false, message: "Error saving, please try again later" });

        res.json({ status: true, message: 'Saved bill', uuid });
    } catch (error) {
        return handleHttp(res, "ERROR SAVE BILL", error)
    }
}


const getBills = async (req, res) => {
    try {
        const response = await getBillsDB();
        res.send(response);
    } catch (e) {
        handleHttp(res, 'ERROR GET BILLS', e)
    }
}

const deleteBill = async (req, res) => {
    try {
        const { id } = req.params
        const result = await deleteBillDB(id);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Bill not found" });

        res.json({ status: true, message: 'Bill deleted' });
    } catch (error) {
        return handleHttp(res, "ERROR DELETE BILL", error)
    }
}


export { registerBill, getBills, deleteBill }