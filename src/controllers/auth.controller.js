
import { newUser, login, emailExists, validateOldPassword, updatePassword } from '../services/auth.service.js'
import { generateToken, verifyToken } from '../utils/jwt.handle.js';
import { handleHttp } from '../utils/error.handle.js'
import { sendMail } from '../utils/mail.js';

const registerCtrl = async (req, res) => {
    try {
        const { body } = req
        const response = await newUser(body);
        res.json({ message: 'Successfully registered', ...response });
    } catch (e) {
        console.log(e.error);
        handleHttp(res, 'ERROR REGISTERING USER', e)
    }
}



const loginCtrl = async ({ body }, res) => {
    const { email, password } = body;
    const responseUser = await login({ email, password });

    if (!responseUser.status) {
        res.status(401);
        res.send(responseUser)
    }
    else {
        const { email, role } = responseUser.user
        const token = await generateToken({ email, role })
        res.status(200).send({ status: true, token })
    }
};

//TODO 
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const mailStatus = await emailExists(email)

    if (mailStatus) {
        const mailResolution = await sendMail('Password by Product management system', 'to reset your password click on the following link', email)
        if (!mailResolution) return res.status(400).json({ status: false, message: 'error sending mail, try again later' })
        else return res.json({ status: true, message: "Email sent" })
    } else {
        return res.status(404).json({ status: false, message: 'Incorrect mail, not registered' })
    }
}

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const token = req.headers.authorization.split(' ').pop()
    const payload = await verifyToken(token)

    const usersFound = await validateOldPassword(payload.email, oldPassword)

    if (usersFound.length <= 0) {
        return res.status(400).json({ message: 'incorrect old password' });
    }
    else if (usersFound[0].password === oldPassword) {
        const result = await updatePassword(payload.email, newPassword)

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "password updated successfully." })
        }
        else {
            return res.status(500).json({ msg: "Something went wrong. Please try again later" });
        }
    }
}

export { loginCtrl, registerCtrl, forgotPassword, changePassword }