var cache = require('memory-cache');

var facebook = require('./facebook');
var fitbit = require('./fitbit');
var twitter = require('./twitter');

module.exports = function(app, passport) {

    app.get('/', function(req, res, next) {

        // TODO: do something
        
    });
	
	app.get('/v0/', function(req, res, next) {

        facebook.getProfile(next).then(function(data) {                                        
			res.json(data);
		});
        
    });

    app.get('/v0/activity/steps/', function(req, res, next) {

        fitbit.getSteps(next).then(function(data) {                                        
			res.json(data);
		});
        
    });
    
    app.get('/v0/activity/sleep/', function(req, res, next) {

        fitbit.getSleep(next).then(function(data) {                                        
			res.json(data);
		});
        
    });

    app.get('/v0/body/weight/', function(req, res, next) {

        fitbit.getWeight(next).then(function(data) {                                        
			res.json(data);
		});
        
    });
    
    app.get('/v0/social/twitter/', function(req, res, next) {

        twitter.getTweets(next).then(function(data) {                                        
			res.json(data);
		});
        
    });
    
    app.get('/v0/body/github/', function(req, res, next) {

        // TODO: do something
        
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