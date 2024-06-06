const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const publicRoute = require('./routes/public') 
const PORT = process.env.PORT || 5500;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

app.use('/', publicRoute)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});