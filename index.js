const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

let url = 'mongodb+srv://pedrogarcia8:THEO(123)PJGl@ex2-fluke.v6glk.gcp.mongodb.net/ex2?retryWrites=true&w=majority';

mongoose.connect(url);
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error'));

const userRoute = require('./routes/user.route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Credentials', "*");
    res.header('Access-Control-Expose-Headers', 'x-access-token');
    next();
});

app.use(userRoute);

app.listen(8000, () => {
    console.log('Server running in the port 8000');
});

