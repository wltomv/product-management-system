import { verifyToken } from "../utils/jwt.handle.js";

const checkJWT = (req, res, next) => {
    try {
        const jwtByUser = req.headers.authorization || null;
        const jwt = jwtByUser?.split(" ").pop();

        if (jwt == null) return res.sendStatus(401);

        const isUser = verifyToken(`${jwt}`);
        if (!isUser) {
            res.status(401);
            res.send('JWT INVALID')
        } else {
            next();
        }

    } catch (e) {
        res.status(400);
        res.send("INVALID SESSION")
    }
}

const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)

        if ([].concat(roles).includes(tokenData.role) && tokenData != null) {
            next()
        } else {
            res.status(403)
            res.send({ error: 'The user role does not have the required permissions' })
        }
    } catch (e) {
        res.status(403)
        res.send({ error: 'No authorization' })
    }

}
export { checkJWT, checkRoleAuth }