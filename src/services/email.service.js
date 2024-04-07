const nodemailer = require('nodemailer');

const sendEmailWithNodeMailer = async (reciever_email, subject, template) => {
    try {
        // Create a transporter object using SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_SENDER_MAIL,
                pass: process.env.NODEMAILER_SENDER_MAIL_PASS
            }
        });

        // Email message options
        let mailOptions = {
            from: process.env.NODEMAILER_SENDER_MAIL,
            to: reciever_email,
            subject: subject,
            html: template
        };

        // Send email using await
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        return transporter;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


module.exports = {
    sendEmailWithNodeMailer,
};