import { Router } from "express";
import { getProducts, registerProduct, updateProduct, getProductsByCategory, getProductsById, deleteProduct } from '../controllers/product.controller.js'


import { checkJWT, checkRoleAuth } from "../middlewares/session.js";

const router = Router();

const ADMIN_ROLE = process.env.ADMIN_ROLE

router.get('/', checkJWT, checkRoleAuth([ADMIN_ROLE]), getProducts);
router.get('/category/:id', checkJWT, checkRoleAuth([ADMIN_ROLE]), getProductsByCategory);
router.get('/:id', checkJWT, checkRoleAuth([ADMIN_ROLE]), getProductsById);
router.post('/', checkJWT, checkRoleAuth([ADMIN_ROLE]), registerProduct);
router.patch('/update', checkJWT, checkRoleAuth([ADMIN_ROLE]), updateProduct);
router.delete('/:id', checkJWT, checkRoleAuth([ADMIN_ROLE]), deleteProduct);

export { router }; 