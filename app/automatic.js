var automatic = require('automatic-api');

var q = require('q');

var cache = require('memory-cache');
var MAX_CACHE_AGE = 60 * 1000; // 1 hour

exports.getTrips = function(next) {
    
    var cachedResult = cache.get('automatic.getTrips');
    if (cachedResult) {
        return q.fcall(function() {
            return cachedResult;
        });
    }
    
    var client = new automatic.AutomaticAPI({
        clientID: process.env.AUTOMATIC_CONSUMER_KEY,
        clientSecret: process.env.AUTOMATIC_CONSUMER_SECRET
    });
    
    client.setState({
        accessToken: process.env.AUTOMATIC_ACCESS_TOKEN
    });
    
    var deferred = q.defer();
    
    client.roundtrip('GET', '/trip/?limit=30', null, function(err, response) {
        if (err) {
            deferred.reject(next(new Error('Failed to retrieve Automatic trips')));
        }
        
        var payload = response.results;
        
        var data = [];
        for (var i = 0; i < (payload.length < 30 ? payload.length : 30); i++)
        {
            var item = payload[i];
            
            data.push({
                dateTime: new Date(item['started_at']),
                duration: Math.round(item['duration_s'] * 100) / 100,
                distance: Math.round(item['distance_m'] * 100) / 100,
                mpg: Math.round(item['average_kmpl'] * 2.82485876 * 100) / 100,
                fuel_consumption: Math.round(item['fuel_volume_l'] * 3.78541178 * 100) / 100,
                hard_brakes: item['hard_brakes'],
                hard_accelerations: item['hard_accels'],
            });
        }
        
        cache.put('automatic.getTrips', data, MAX_CACHE_AGE);

        deferred.resolve(data);
    });
    
    return deferred.promise;
}
