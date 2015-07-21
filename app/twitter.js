var twitter = require('twitter-node-client').Twitter;

var q = require('q');

var cache = require('memory-cache');
var MAX_CACHE_AGE = 5 * 1000; // 5 minutes

exports.getTweets = function(next) {
    
    var cachedResult = cache.get('twitter.getTweets');
    if (cachedResult) {
        return q.fcall(function() {
            return cachedResult;
        });
    }
    
    var client = new twitter({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        accessToken: process.env.TWITTER_ACCESS_TOKEN,
        accessTokenSecret: process.env.TWITTER_TOKEN_SECRET
    });
    
    var deferred = q.defer();
    
    client.getUserTimeline({ screen_name: 'mbmccormick', count: 30, trim_user: true }, function(err, response, body) {
        deferred.reject(next(new Error('Failed to retrieve Twitter tweets')));
    }, function(response) {
        var payload = JSON.parse(response);
        
        var data = [];
        for (var i = 0; i < payload.length; i++)
        {
            var item = payload[i];
            
            data.push({
                dateTime: new Date(item['created_at']),
                text: item['text']
            });
        }
        
        cache.put('twitter.getTweets', data, MAX_CACHE_AGE);

        deferred.resolve(data);
    });
    
    return deferred.promise;
}

exports.getTweetsSummary = function(next) {
    
    var cachedResult = cache.get('twitter.getTweetsSummary');
    if (cachedResult) {
        return q.fcall(function() {
            return cachedResult;
        });
    }
    
    var client = new twitter({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        accessToken: process.env.TWITTER_ACCESS_TOKEN,
        accessTokenSecret: process.env.TWITTER_TOKEN_SECRET
    });
    
    var deferred = q.defer();
    
    client.getUser({ screen_name: 'mbmccormick', count: 30, trim_user: true }, function(err, response, body) {
        deferred.reject(next(new Error('Failed to retrieve Twitter tweets summary')));
    }, function(response) {
        var payload = JSON.parse(response);
        
        var data = {
            tweets: payload['statuses_count'],
            followers: payload['followers_count'],
            following: payload['friends_count'],
            favorited: payload['favourites_count']
        };
        
        cache.put('twitter.getTweetsSummary', data, MAX_CACHE_AGE);

        deferred.resolve(data);
    });
    
    return deferred.promise;
}