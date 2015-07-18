var strava = require('strava-v3');

var q = require('q');

var cache = require('memory-cache');
var MAX_CACHE_AGE = 24 * 60 * 1000; // 24 hours

exports.getActivities = function(next) {
    
    var cachedResult = cache.get('strava.getActivities');
    if (cachedResult) {
        return q.fcall(function() {
            return cachedResult;
        });
    }
    
    var deferred = q.defer();
    
    strava.athlete.listActivities({ 'access_token': process.env.STRAVA_ACCESS_TOKEN }, function(err, response) {
        if (err) {
            deferred.reject(next(new Error('Failed to retrieve Strava activities')));
        }
        
        var payload = response;
        
        var data = [];
        for (var i = 0; i < payload.length; i++)
        {
            var item = payload[i];
            
            data.push({
                dateTime: new Date(item['start_date']),
                name: item['name'],
                type: item['type'],
                distance: item['distance'],
                duration: item['moving_time']
            });
        }
        
        cache.put('strava.getActivities', data, MAX_CACHE_AGE);

        deferred.resolve(data);
    });
    
    return deferred.promise;
}
