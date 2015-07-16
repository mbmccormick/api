var cache = require('memory-cache');

var facebook = require('./facebook');
var fitbit = require('./fitbit');

module.exports = function(app, passport) {

    app.get('/', function(req, res, next) {

        // TODO: do something
        
    });
	
	app.get('/v0/', function(req, res, next) {

        facebook.getProfile(next).then(function(data) {                                        
			res.json(data);
		});
        
    });

    app.get('/v0/steps/', function(req, res, next) {

        fitbit.getSteps(next).then(function(data) {                                        
			res.json(data);
		});
        
    });

    app.get('/v0/weight/', function(req, res, next) {

        fitbit.getWeight(next).then(function(data) {                                        
			res.json(data);
		});
        
    });
    
    app.get('/v0/sleep/', function(req, res, next) {

        fitbit.getSleep(next).then(function(data) {                                        
			res.json(data);
		});
        
    });
    
    app.use(function(req, res, next) {
        
        res.status(404);

    });
    
    app.use(function(error, req, res, next) {
        
        console.error(error);

        res.status(500);

        next(error);

    });

};