import { getProductsDB, getProductsByCategoryDB, getProductsByIdDB, newProduct, updateProductDB, updateProductStatusDB, deleteProductDB } from '../services/product.service.js'
import { handleHttp } from '../utils/error.handle.js'

const getProducts = async (req, res) => {
    try {
        const { id } = req.params
        const response = await getProductsDB(id);
        res.send(response);
    } catch (e) {
        handleHttp(res, 'ERROR GET PRODUCTS', e)
    }
}

const getProductsByCategory = async (req, res) => {
    try {
        const { id } = req.params
        const response = await getProductsByCategoryDB(id);
        res.send(response);
    } catch (e) {
        handleHttp(res, 'ERROR GET PRODUCTS', e)
    }
}

const getProductsById = async (req, res) => {
    try {
        const { id } = req.params
        const response = await getProductsByIdDB(id);
        res.send(response);
    } catch (e) {
        handleHttp(res, 'ERROR GET PRODUCT', e)
    }
}

const registerProduct = async (req, res) => {
    try {
        const { body } = req
        const response = await newProduct(body);
        res.json({ message: 'Successfully registered', ...response });
    } catch (e) {
        console.log(e.error);
        handleHttp(res, 'ERROR REGISTERING PRODUCT', e)
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = req.body
        const result = await updateProductDB(product);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Product not found" });

        res.json({ status: true, message: 'Product updated', product });
    } catch (error) {
        return handleHttp(res, "ERROR UPDATE PRODUCT", error)
    }
}

const updateProductStatus = async (req, res) => {
    try {
        let product = req.body;
        const result = await updateProductStatusDB(product);

        if (result.affectedRows === 0)
            return res.status(404).json({ status: false, message: "Product not found" });

        res.json({ status: true, message: "Product status updated" });
    } catch (error) {
        return handleHttp(res, "ERROR UPDATE PRODUCT", error)
    }
}


const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const result = await deleteProductDB(id);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Product not found" });

        res.json({ status: true, message: 'Product deleted' });
    } catch (error) {
        return handleHttp(res, "ERROR DELETE PRODUCT", error)
    }
}



export { getProducts, registerProduct, updateProduct, updateProductStatus, getProductsByCategory, getProductsById, deleteProduct }
