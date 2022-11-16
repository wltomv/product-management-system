import { newUser, login } from '../services/auth.service.js'
import { handleHttp } from '../utils/error.handle.js'

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

export { loginCtrl, registerCtrl }