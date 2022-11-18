import { Router } from "express";
import { getDashboardData } from "../controllers/dashboard.controller.js";
import { checkJWT, checkRoleAuth } from "../middlewares/session.js";


const router = Router();

router.get('/', checkJWT, getDashboardData);


export { router };