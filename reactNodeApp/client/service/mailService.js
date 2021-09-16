const nodemailer = require("nodemailer");

class MailService {

    constructor() {

        this.transporter = nodemailer.createTransport({
            service:"gmail",
            // auth: {
            //     user: 'stoilo098@mail.ru',
            //     pass: 'yourpassword'
            //   }
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        });
    }

    async sendActivationMail(email, activationLink) {

        this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Активация аккаунта" + process.env.DIRECTORY_URL,
            text: "Некоторый текст в сообщении!",
            html: `
                <div>
                    <h1>
                        Для активации перейдите по ссылке
                    </h1>
                    <a href="${activationLink}">${activationLink}</a>
                </div>
            `
        }, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

module.exports = new MailService();