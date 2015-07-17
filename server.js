// setup =======================================================================
var express = require('express');
var path = require('path');
var logger = require('morgan');
var ejs = require('ejs');
var partials = require('express-partials');

var app = express();

// configuration ===============================================================
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(partials());
app.use(express.static(path.join(__dirname, 'public')));

app.set('json spaces', 4);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

// routes ======================================================================
require('./app/routes')(app);

// listen ======================================================================
app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
