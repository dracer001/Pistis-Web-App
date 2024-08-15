require('dotenv').config()


// EXPRESS
const express = require('express')
const session = require('express-session');


// OTHER DEPENDENCIES
const path = require('path')
const bodyParser = require('body-parser')
const flash = require('connect-flash');


// CUSTOM MIDDLEWARE IMPORTS
const databaseWare = require('./middleware/database')
const authAdmin = require('./middleware/authAdmin')
const flashWare = require('./middleware/flash')


// ROUTES IMPORTS
const index_route = require('./routes/public/index')
const TS_route = require('./routes/public/TS')
// const adminRoute = require('./routes/admin');


// CONFIGS

const app = express();

// Session
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Flash Messages
app.use(flash());
app.use(flashWare)

//  Parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Views
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.set('view options', {delimiter: '?'});


app.use('/', index_route)

app.use(databaseWare)
app.use('/training-solution', TS_route)

// app.use(authAdmin)
// app.use('/admin-panel', adminRoute)



const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// mongoose.connection.once('open', ()=>{console.log('_____conncected to database____')})