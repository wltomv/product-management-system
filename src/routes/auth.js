import { Router } from "express";
import { changePassword, checkToken, forgotPassword, loginCtrl, registerCtrl } from "../controllers/auth.controller.js";
import { checkJWT } from "../middlewares/session.js";

const router = Router();

router.post('/signup', registerCtrl);
router.post('/login', loginCtrl);
router.get('/forgotpassword', forgotPassword);
router.patch('/changePassword', checkJWT, changePassword)
router.get('/checkToken', checkJWT, checkToken)

export { router };