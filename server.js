require('dotenv').config()
const path = require('path')

// EXPRESS
const express = require('express')
const app = express();

//MONGO DB
const mongoose = require('mongoose')
const connectDB = require('./models/modelConfig')

const bodyParser = require('body-parser')
const publicRoute = require('./routes/public')
const trainingSolutionRoute = require('./routes/trainingSolution')
const adminRoute = require('./routes/admin');
const databaseWare = require('./middleware/database');
const PORT = process.env.PORT || 5500;

// connectDB(); //CONNECT TO MONGO DB

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.set('view options', {delimiter: '?'});

app.use('/', publicRoute)

// app.use(databaseWare)
app.use('/training-solutions', trainingSolutionRoute)
app.use('/admin-panel-xyz')

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// mongoose.connection.once('open', ()=>{console.log('_____conncected to database____')})