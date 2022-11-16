import { pool } from '../config/db.js';
import { newUser, login, emailExists } from '../services/auth.service.js'
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
        res.status(200).send(responseUser)
    }
};


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

export { loginCtrl, registerCtrl, forgotPassword }