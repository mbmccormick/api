var cache = require('memory-cache');
var async = require('async');

var facebook = require('./facebook');
var fitbit = require('./fitbit');
var strava = require('./strava');
var twitter = require('./twitter');
var github = require('./github');
var blog = require('./blog');
var automatic = require('./automatic');

module.exports = function(app, passport) {

    app.get('/', function(req, res, next) {

        res.render('index');
        
    });
    
    app.get('/v0/', function(req, res, next) {

        res.json({
            name: 'Personal API',
            description: 'A personal API for Matt McCormick',
            version: '0.1.0',
            project_url: 'http://github.com/mbmccormick/api',
            documentation_url: 'http://api.mbmccormick.com',
            author: 'mbmccormick',
            author_url: 'http://mbmccormick.com',
            process: {
                versions: process.versions,
                memoryUsage: process.memoryUsage()
            }
        });
        
    });
    
    app.get('/v0/profile/', function(req, res, next) {

        facebook.getProfile(next).then(function(data) {
            res.json(data);
        });
        
    });
    
    app.get('/v0/profile/education', function(req, res, next) {

        facebook.getEducation(next).then(function(data) {
            res.json(data);
        });
        
    });
    
    app.get('/v0/profile/employment', function(req, res, next) {

        facebook.getEmployment(next).then(function(data) {
            res.json(data);
        });
        
    });
    
    app.get('/v0/activity/', function(req, res, next) {

        async.parallel([
            
            function(callback) {
                fitbit.getStepsSummary(next).then(function(data) {
                    callback(null, data);
                });
            },
            
            function(callback) {
                fitbit.getSleepSummary(next).then(function(data) {
                    callback(null, data);
                });
            }
            
        ], function(err, results) {
            if (err) {
                next(err);
            }
        
            res.json({
                steps: results[0],
                sleep: results[1]
            });
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
    
    app.get('/v0/activity/workouts/', function(req, res, next) {

        strava.getActivities(next).then(function(data) {
            res.json(data);
        });
        
    });

    app.get('/v0/body/weight/', function(req, res, next) {

        fitbit.getWeight(next).then(function(data) {
            res.json(data);
        });
        
    });
    
    app.get('/v0/social/', function(req, res, next) {

        async.parallel([
            
            function(callback) {
                twitter.getTweetsSummary(next).then(function(data) {
                    callback(null, data);
                });
            },
            
            function(callback) {
                github.getActivitySummary(next).then(function(data) {
                    callback(null, data);
                });
            }
            
        ], function(err, results) {
            if (err) {
                next(err);
            }
        
            res.json({
                twitter: results[0],
                github: results[1]
            });
        });
        
    });
    
    app.get('/v0/social/twitter/', function(req, res, next) {

        twitter.getTweets(next).then(function(data) {
            res.json(data);
        });
        
    });
    
    app.get('/v0/social/github/', function(req, res, next) {

        github.getActivity(next).then(function(data) {
            res.json(data);
        });
        
    });
    
    app.get('/v0/blog/', function(req, res, next) {

        blog.getLatest(next).then(function(data) {
            res.json(data);
        });
        
    });
    
    app.get('/v0/driving/', function(req, res, next) {

        automatic.getTrips(next).then(function(data) {
            res.json(data);
        });
        
    });
    
    app.use(function(req, res, next) {
        
        res.status(404).end();

    });
    
    app.use(function(error, req, res, next) {
        
        console.error(error);

        res.status(500).end();

        next(error);

    });

};