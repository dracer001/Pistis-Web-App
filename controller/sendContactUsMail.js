const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
    const { name, email, category, message } = req.body;

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
        to: "admin@pistisnetworkingacademy.com.ng", // Change this to your recipient email address
        subject: `New Message from ${name} - ${category}`, // Subject line
        html: `
            <h1>New Contact Form Submission</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        ` // HTML body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.toString());
            console.log("Mail error =>", error.toString());
            req.flash('error_msg', 'Failed to send email.');
            res.redirect('/project-showcase'); // Change to your actual view page route
        }
        console.log("Success mail =>", info.response);
        req.flash('success_msg', 'Email sent successfully!');
        res.redirect('/project-showcase'); // Change to your actual view page route
    });
};

module.exports = { sendEmail };
