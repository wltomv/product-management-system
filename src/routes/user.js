import { Router } from "express";
import { getUser, getUsers, updateUserStatus } from "../controllers/user.controller.js";
import { checkJWT, checkRoleAuth } from "../middlewares/session.js";

const router = Router();

const ADMIN_ROLE = process.env.ADMIN_ROLE

router.get('/', checkJWT, checkRoleAuth([ADMIN_ROLE]), getUsers);
router.get('/:id', checkJWT, checkRoleAuth([ADMIN_ROLE]), getUser);
router.patch('/update', checkJWT, checkRoleAuth([ADMIN_ROLE]), updateUserStatus);

export { router };