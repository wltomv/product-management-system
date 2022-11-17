import { getUsersByIdDB, getUsersDB, updateUserStatusDB } from "../services/user.service.js"
import { handleHttp } from "../utils/error.handle.js"

const getUsers = async (req, res) => {
    try {
        const response = await getUsersDB();
        res.send(response);
    } catch (e) {
        handleHttp(res, 'ERROR GET USERS', e)
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const response = await getUsersByIdDB(id);
        res.send(response);
    } catch (e) {
        handleHttp(res, 'ERROR GET USERS')
    }
}

const updateUserStatus = async (req, res) => {
    try {
        let user = req.body;
        const result = await updateUserStatusDB(user);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "User not found" });

        const userResponse = await getUsersByIdDB(user.id)
        res.json(userResponse);
    } catch (error) {
        return handleHttp(res, "ERROR UPDATE USER", error)
    }
}

export { getUsers, getUser, updateUserStatus }
