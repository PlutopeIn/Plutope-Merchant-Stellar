import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({

    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendMail = (toEmail, subject, emailBody) => {
    return new Promise(function (resolve, reject) {
        const mailing = {
            from: process.env.EMAIL_FROM,
            to: toEmail,
            subject: subject,
            html: emailBody,
        };
        transporter.sendMail(mailing, (err, data) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(1);
            }
        });
    });
};

export default sendMail