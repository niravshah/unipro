require('dotenv').config();

var express = require('express');
var path = require('path');
var http = require('http');
var cors = require('cors');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-hbs');
var app = express();

var index = require('./routes/index');
var auth = require('./routes/auth');
var upload = require('./routes/upload');
var schema = require('./routes/schema');
var location = require('./routes/location');
var goods = require('./routes/goods');
var stock = require('./routes/stock');
var supplier = require('./routes/supplier');
var options = require('./routes/options');

var mongoose = require('mongoose');

var url = "mongodb://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@mongodb/" + process.env.MONGODB_DATABASE
if (process.env.NODE_ENV == "dev") {
    url = process.env.MONGODB_URL + process.env.MONGODB_DATABASE
}
console.log("Connecting to MongoDB URL: " + url);

mongoose.connect(url, {useNewUrlParser: true})
    .then(() => {
        console.log('mongo connection successful');
    })
    .catch((err) => console.error(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.express4({
    defaultLayout: __dirname + '/views/default'
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(function (req, res, next) {
    if (req.subdomains[0]) {
        next();
    } else {
        var err = new Error('No valid domains founds');
        err.status = 404;
        next(err)
    }
});

app.use('/', index);
app.use('/api/auth', auth);
app.use('/api/options', options);
app.use('/api/upload', upload);
app.use('/api/schema', schema);
app.use('/api/locations', location);
app.use('/api/goods', goods);
app.use('/api/stock', stock);
app.use('/api/suppliers', supplier);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    res.status(500).json({status: err.status, message: err.message});
});

var port = process.env.PORT || '5002';
app.set('port', port);

var server = http.createServer(app);

server.listen(port, function () {
    console.log('Uniprocure API running on port: ' + port)
});

