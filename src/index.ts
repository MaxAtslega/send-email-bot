import dotenv from "dotenv"
import * as cron from "node-cron";
import * as mailer from "nodemailer";

dotenv.config();

//Config
let mailURL = process.env.MAIL_URL;

let mailFrom = process.env.MAIL_FROM;
let mailTo = process.env.MAIL_TO;
let mailSubject = process.env.MAIL_SUBJECT;
let mailText = process.env.MAIL_TEXT;

let cronExpression = process.env.CRON_EXPRESSION || "* * * * *";

//Cron Job
cron.schedule(cronExpression, async () => {
    console.log("---------------------");
    console.log("Running Cron Job");

    const transporter = mailer.createTransport(mailURL)

    await transporter.verify(async function(error, success) {
        if (error) {
            console.log(error);
        } else {
            await transporter.sendMail({
                from: mailFrom,
                to: mailTo,
                subject: mailSubject,
                text: mailText
            }, function(error, info) {
                if (error) {
                    throw error;
                } else {
                    console.log("E-Mail successfully sent!");
                }});
        }
    });

    console.log("---------------------");
});