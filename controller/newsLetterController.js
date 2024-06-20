
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

        // req.flash('success_msg', 'Email subscribed successfully');
        res.json({'success': "Email Subsciibed Successful"});
    } catch (err) {
        console.error(err);
        res.json({'error': "Server Error"});
    }
}

module.exports = {
    createEmail,
    deleteEmail,
    getEmails
}