import { Router } from "express";
import { changePassword, forgotPassword, loginCtrl, registerCtrl } from "../controllers/auth.controller.js";
import { checkJWT } from "../middlewares/session.js";

const router = Router();

router.post('/signup', registerCtrl);
router.get('/login', loginCtrl);
router.get('/forgotpassword', forgotPassword);
router.patch('/changePassword', checkJWT, changePassword)

export { router };