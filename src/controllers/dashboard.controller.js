import { DashboardData } from '../services/dashboard.service.js';
import { handleHttp } from '../utils/error.handle.js'

const getDashboardData = async (req, res) => {
    try {
        const responseData = await DashboardData()
        res.json({ status: true, ...responseData });
    } catch (error) {
        return handleHttp(res, "ERROR OBTAINING DATA", error)
    }
}

export { getDashboardData }