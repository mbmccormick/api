var tripit = require('tripit-node');

var q = require('q');

var cache = require('memory-cache');
var MAX_CACHE_AGE = 60 * 60 * 1000; // 1 hour

exports.getTrips = function(next) {
    
    var cachedResult = cache.get('tripit.getTrips');
    if (cachedResult) {
        return q.fcall(function() {
            return cachedResult;
        });
    }
    
    var client = new tripit(process.env.TRIPIT_CONSUMER_KEY, process.env.TRIPIT_CONSUMER_SECRET);

    return client.requestResource('/list/trip', 'GET', process.env.TRIPIT_ACCESS_TOKEN, process.env.TRIPIT_TOKEN_SECRET).then(function(response) {
        if (response[1].statusCode != 200) {
            return next(new Error('Failed to retrieve TripIt trips'));
        }

        var payload = JSON.parse(response[0]);
        
        var data = payload;
        
        cache.put('tripit.getTrips', data, MAX_CACHE_AGE);

        return data;
    });
}
