import { Router } from "express";
import { forgotPassword, loginCtrl, registerCtrl } from "../controllers/auth.controller.js";

const router = Router();

router.post('/signup', registerCtrl);
router.get('/login', loginCtrl);
router.get('/forgotpassword', forgotPassword);

export { router };