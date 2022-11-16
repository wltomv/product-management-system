import { getUsersByIdDB, getUsersDB } from "../services/user.service.js"
import { handleHttp } from "../utils/error.handle.js"


const getUsers = async (req, res) => {
    try {

        const response = await getUsersDB();
        res.send(response);
    } catch (e) {
        handleHttp(res, 'ERROR GET USERS')
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


export { getUsers, getUser }
