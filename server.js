require('dotenv').config()

// OTHER DEPENDENCIES
const path = require('path')
const bodyParser = require('body-parser')
const flash = require('connect-flash');


// EXPRESS
const express = require('express')
const app = express();
const session = require('express-session');

//MONGO DB
const mongoose = require('mongoose')
const connectDB = require('./models/modelConfig')

//ROUTES
const publicRoute = require('./routes/public')
const trainingSolutionRoute = require('./routes/trainingSolution')
const adminRoute = require('./routes/admin');

const databaseWare = require('./middleware/database')
const authAdmin = require('./middleware/authAdmin')

// CONFIGS
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));
app.use(flash());


// Middleware to parse form data
// CONFIG
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.set('view options', {delimiter: '?'});

app.post('/submit-form', (req, res) => {
    // Process the form data
    const email = req.body.email;
    console.log(req.url)
    console.log(req.body)
    // Example response
    const response = {
        message: `Form data received:Email = ${email}`
    };
    console.log(response)
    // Respond with JSON
    return res.json(response);
});

app.use('/', publicRoute)

app.use(databaseWare)
app.use('/training-solutions', trainingSolutionRoute)

app.use((req, res, next) => {
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.use(authAdmin)
app.use('/admin-panel', adminRoute)



const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// mongoose.connection.once('open', ()=>{console.log('_____conncected to database____')})