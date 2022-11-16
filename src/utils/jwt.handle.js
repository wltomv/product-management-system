import jwt from 'jsonwebtoken';
const { sign, verify } = jwt
const JWT_SECRET = process.env.JWT_SECRET || "11110000"


const generateToken = async (user) => {
    const jwt = await sign(user, JWT_SECRET, {
        expiresIn: "2h"
    });
    return jwt;
}

const verifyToken = (jwt) => {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk;
}

export { generateToken, verifyToken }