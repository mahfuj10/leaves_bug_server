const User = require('../models/user.model');
const admin = require('../config/firebase');
const { sendEmailWithNodeMailer } = require('../services/email.service');

 
 const create = async(req, res, next) => {
    try {
        const user = new User(req.body);

        await user.save()
      

        return res.status(201).send('user created.')
    }catch(err){
        return next(err)
    }
};


const check_user = async(req, res, next) => {
    try {
        const { email } = req.query;
         
        const user = await User.findOne({ email });

        if (user) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserById = async(req, res, next) => {
    try {
        const { uid } = req.query;

        const user = await User.findOne({ uid });

        return res.status(200).send(user)
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const resetPassword = async(req, res, next) => {
    try {
        const { email } = req.body;

        const actionCodeSettings = {
            url: `${process.env.CLIENT_BASE_URL}/login`,
            handleCodeInApp: true
        };

        const resetPasswordLink = await admin.auth().generatePasswordResetLink(email, actionCodeSettings);

        await sendEmailWithNodeMailer(email, '🔑 Reset Your Password for LeavesBug 🍃', `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #007bff;
              text-align: center;
            }
            p {
              margin-bottom: 20px;
            }
            a {
              color: #007bff;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Reset Your Password</h1>
            <p>Hello,</p>
            <p>You've requested to reset your password for <strong>LeavesBug</strong>. Please click the link below to reset your password:</p>
            <p><a href=${resetPasswordLink} target="_blank">Reset Password</a></p>
            <p>If you didn't request a password reset, you can ignore this email.</p>
            <p>Thank you,<br> The LeavesBug Team</p>
          </div>
        </body>
        </html>
        `)

        return res.status(200).send('Email sent...')
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    create,
    check_user,
    getUserById,
    resetPassword
};