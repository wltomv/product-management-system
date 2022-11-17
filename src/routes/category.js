import { Router } from "express";
import { getCategories, registerCategory, updateCategory } from '../controllers/category.controller.js'


import { checkJWT, checkRoleAuth } from "../middlewares/session.js";

const router = Router();

const ADMIN_ROLE = process.env.ADMIN_ROLE

router.get('/', checkJWT, checkRoleAuth([ADMIN_ROLE]), getCategories);
router.post('/', checkJWT, checkRoleAuth([ADMIN_ROLE]), registerCategory);
router.patch('/update', checkJWT, checkRoleAuth([ADMIN_ROLE]), updateCategory);

export { router }; 