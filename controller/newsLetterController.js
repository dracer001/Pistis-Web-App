const nodemailer = require('nodemailer');

// NEWS LETTER
const Newsletter = require('../models/newsletter');

// Function to get all email subscriptions
const getEmails = async (req, res) =>{
    try {
        const emails = await Newsletter.find();
        res.render('templates/admin/newsletters', { emails: emails });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Function to delete an email subscription
const deleteEmail = async (req, res, next)=>{
    try {
        const email = await Newsletter.findByIdAndDelete(req.params.id);
        if (!email) {
            return res.status(404).send('Email not found');
        }

        res.redirect('/admin-panel/newsletter/all');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


// Function to create a new email subscription
const createEmail = async(req, res) =>{
    try {
        const { email } = req.body;
        const existingEmail = await Newsletter.findOne({ email: email });
        if (existingEmail) {
            // req.flash('warning_msg', 'Email already subscribed');
            return res.json({'warning': 'Email already exists'});
        }

        // Create new email subscription
        const newEmail = new Newsletter({
            email: email
        });
        await newEmail.save();
        const email_resp = await sendEmail(req, res);
        console.log("email response", email_resp);
        // req.flash('success_msg', 'Email subscribed successfully');
        res.json({'success': "Email Subsciibed Successful"});
    } catch (err) {
        console.error(err);
        res.json({'error': "Server Error"});
    }
}

// Function to create a new email subscription
const checkEmail = async(req, res) =>{
    try {
        const { email } = req.body;
        const existingEmail = await Newsletter.findOne({ email: email });
        if (existingEmail) {
            // req.flash('warning_msg', 'Email already subscribed');
            return res.json({'exists': 'Email already exists'});
        }
        else{
            res.json({'message': "email not found"});
        }
        // req.flash('success_msg', 'Email subscribed successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json({'error': "Server Error"});
    }
}

const sendEmail = async (req, res)=>{
    const { email } = req.body;
    // Configure the transporter for your custom email provider
    const transporter = nodemailer.createTransport({
        host: process.env.NEWSLETTER_HOST, // Replace with your SMTP server
        port: 587, // Commonly used port for SMTP, but this may vary
        secure: false, // Use true for 465, false for other ports
        auth: {
            user: process.env.NEWSLETTER_EMAIL, // Your email address
            pass: process.env.NEWSLETTER_PASSWORD, // Your email password
        },
        tls: {
            rejectUnauthorized: false // Only use this if your SMTP server has a self-signed certificate
        }
    });

    const mailOptions = {
        from: process.env.NEWSLETTER_EMAIL, // Sender address
        to: email, // List of receivers
        subject: "Subscribed to news letter", // Subject line
        // text: text, // Plain text body
        html: '<b>This is to notify you that you have subscribed to our news leter</b>' // Optionally, you can send an HTML version
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.toString());
            console.log("mail error =>", error.toString())
        }
        console.log("success mail =>", info.response)
        res.status(200).send('Email sent: ' + info.response);
    });

}



module.exports = {
    createEmail,
    deleteEmail,
    getEmails,
    checkEmail,
    sendEmail
}