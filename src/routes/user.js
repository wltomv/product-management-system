import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";

const router = Router();


router.get('/', getUsers);
router.get('/:id', getUser);

export { router };