import { Router } from "express";
import { deleteBill, getBills, getPdfBill, registerBill } from "../controllers/bill.controller.js";
import { checkJWT, checkRoleAuth } from "../middlewares/session.js";


const router = Router();

const ADMIN_ROLE = process.env.ADMIN_ROLE

router.post('/', checkJWT, checkRoleAuth([ADMIN_ROLE]), registerBill);
router.post('/getPdf', checkJWT, checkRoleAuth([ADMIN_ROLE]), getPdfBill);
router.get('/', checkJWT, checkRoleAuth([ADMIN_ROLE]), getBills);
router.delete('/:id', checkJWT, checkRoleAuth([ADMIN_ROLE]), deleteBill);

export { router };