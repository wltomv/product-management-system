import { getCategoriesDB, newCategory, updateCategoryDB } from '../services/category.service.js'
import { handleHttp } from '../utils/error.handle.js'
const getCategories = async (req, res) => {
    try {
        const { id } = req.params
        const response = await getCategoriesDB(id);
        res.send(response);
    } catch (e) {
        handleHttp(res, 'ERROR GET CATEGORIES')
    }
}

const registerCategory = async (req, res) => {
    try {
        const { body } = req
        const response = await newCategory(body);
        res.json({ message: 'Successfully registered', ...response });
    } catch (e) {
        console.log(e.error);
        handleHttp(res, 'ERROR REGISTERING CATEGORY', e)
    }
}
const updateCategory = async (req, res) => {
    try {
        const category = req.body
        const result = await updateCategoryDB(category);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Category not found" });

        res.json({ status: true, message: 'Category updated', category });
    } catch (error) {
        return handleHttp(res, "ERROR UPDATE USER", error)
    }
}


export { getCategories, registerCategory, updateCategory }
