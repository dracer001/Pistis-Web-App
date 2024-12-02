const nodemailer = require('nodemailer');

const index = (req, res)=>{
    res.render('public/index')
}

const esHome = (req, res)=>{
    res.render('public/future', {title: "ENERGY SOLUTIONS"})
}

const trainingSolutionHome = (req, res)=>{
    res.render('public/trainingSol', {title: "Pistis Training Solutions"})
}

const itSolutionHome = (req, res)=>{
    res.render('public/itSol', {title: "IT SOLUTIONS"})
}

const sendCourseMail = async (req, res)=>{
    const { email, name, phoneNumber, course, message } = req.body;
    if (!email || !name || !phoneNumber || !course) {
        req.flash("error_msg", "Incomplete form submited")
        res.redirect("/training-solution")
      }
      
    // Configure the transporter for your custom email provider
    const transporter = nodemailer.createTransport({
        host: process.env.WEB_MAIL_HOST, // Replace with your SMTP server
        port: 587, // Commonly used port for SMTP, but this may vary
        secure: false, // Use true for 465, false for other ports
        auth: {
            user: process.env.WEB_MAIL, // Your email address
            pass: process.env.WEB_MAIL_PASSWORD, // Your email password
        },
        tls: {
            rejectUnauthorized: false // Only use this if your SMTP server has a self-signed certificate
        }
    });

    const mailOptions = {
        from: process.env.WEB_MAIL, // Sender address
        to: "updates@pistisnetworkingacademy.com.ng", // List of receivers
        subject: "Course Registration", // Subject line
        // text: text, // Plain text body
        html: `<h1>Course Registration</h1>
        <h3>Details:</h3>
        <ul>
            <li>Name: ${name}</li>
            <li>Email: ${email}</li>
            <li>Phone Number: ${phoneNumber}</li>
            <li>Course: ${course}</li>
            <li>Message(optional): ${message}</li>
        </ul>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("mail error =>", error.toString())
            req.flash("error_msg", "an error occured, could not send mail! please try again or contact us via whatsapp")
            return res.redirect("/training-solution")
        }
        const mailOptions = {
            from: process.env.WEB_MAIL, // Sender address
            to: email, // List of receivers
            subject: "Course Registration", // Subject line
            // text: text, // Plain text body
            html: `<h1>Course Registration</h1>
                <p> dear ${name} you have registered for a ${course} at <a href="https://pistisnetworkingacademy.com.ng"> Pistis Solutions</a>
                <p> A message would be sent to you shortly on how to proceed </p>
                <p> please ignore if this isn't you </p>`
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("mail error =>", error.toString())
            } else{
                console.log("success mail =>", info.response)
            }
        })
        req.flash("success_msg", "Your course registration has been recieved successfully! a follow up email will be sent to you shortly")
        res.redirect("/training-solution")
    });

}


module.exports = {
    index,
    esHome,
    trainingSolutionHome,
    itSolutionHome,
    sendCourseMail
}