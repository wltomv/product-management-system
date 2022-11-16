import { Router } from "express";
import { loginCtrl, registerCtrl } from "../controllers/auth.controller.js";

const router = Router();

router.post('/signup', registerCtrl);
router.get('/login', loginCtrl);

export { router };