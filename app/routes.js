var cache = require('memory-cache');

var facebook = require('./facebook');
var fitbit = require('./fitbit');
var twitter = require('./twitter');
var github = require('./github');
var blog = require('./blog');

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
    
    app.use(function(req, res, next) {
        
        res.status(404);

    });
    
    app.use(function(error, req, res, next) {
        
        console.error(error);

        res.status(500);

        next(error);

    });

};