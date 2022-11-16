import nodemailer from 'nodemailer'

const {
    SERVICE_MAIL,
    MAIL_SENDER,
    PASS_MAIL_SENDER
} = process.env

const mailer = (mailOptions) => {
    const transporter = nodemailer.createTransport({
        service: SERVICE_MAIL,
        secure: false,
        ssl: true,
        port: 3000,
        auth: {
            user: MAIL_SENDER,
            pass: PASS_MAIL_SENDER
        }
    });
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                resolve(false);
            } else {
                console.log('Email sent: ' + info.response);
                resolve(true);
            }
        });
    })
}




const sendMail = async (subject, message, mail) => {
    const mailOptions = {
        from: MAIL_SENDER, // sender address
        to: mail, // list of receivers
        subject: subject + " 👻✔", // Subject line
        text: message, // plain text body
    }

    return await mailer(mailOptions)
}

export { sendMail }
