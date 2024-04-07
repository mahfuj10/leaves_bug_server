const { sendEmailWithNodeMailer } = require("../services/email.service");
 

const sendEmail = async(req, res, next) => {
    try {
        const { email, template, subject } = req.body;

        await sendEmailWithNodeMailer(email, subject,  template)

        return res.status(200).send('Email sent.')
    }catch(err){
        return next(err)
    }
};


module.exports = {
    sendEmail
};