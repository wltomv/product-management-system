import { getUsersDB } from "../services/user.service.js"
import { handleHttp } from "../utils/error.handle.js"


const getUsers = async (req, res) => {
    try {
        const response = await getUsersDB();
        res.send(response);
    } catch (e) {
        handleHttp(res, 'ERROR GET USERS')
    }
}

export { getUsers }
