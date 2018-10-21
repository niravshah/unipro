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
var stock = require('./routes/stock');
var item = require('./routes/item');
var supplier = require('./routes/supplier');
var catalogue = require('./routes/catalogue');
var users = require('./routes/users');
var sequelize = require('./routes/sequelize');

var Sequelize = require('./sequelize/models');
Sequelize.sequelize.sync().then(function () {
    console.log('Sequelize Sync Successful')
}).catch(function (err) {
    console.log('Sequelize Sync Error: ', err)
});

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

var tenantFinder = require('./middleware/tenantFinder');
app.use(tenantFinder);

app.use('/', index);
app.use('/api/auth', auth);
app.use('/api/upload', upload);
app.use('/api/schema', schema);
app.use('/api/locations', location);
app.use('/api/stock', stock);
app.use('/api/item', item);
app.use('/api/suppliers', supplier);
app.use('/api/catalogue', catalogue);
app.use('/api/users', users);
app.use('/api/sequelize', sequelize);

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