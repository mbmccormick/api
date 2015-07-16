// setup =======================================================================
var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

// configuration ===============================================================
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
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
