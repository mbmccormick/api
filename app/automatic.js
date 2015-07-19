var automatic = require('automatic-api');

var q = require('q');

var cache = require('memory-cache');
var MAX_CACHE_AGE = 3 * 60 * 1000; // 3 hours

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
    
    client.roundtrip('GET', '/trips', null, function(err, response) {
        if (err) {
            deferred.reject(next(new Error('Failed to retrieve Automatic trips')));
        }
        
        var payload = response;
        
        var data = [];
        for (var i = 0; i < (payload.length < 30 ? payload.length : 30); i++)
        {
            var item = payload[i];
            
            data.push({
                dateTime: new Date(item['start_time']),
                duration: Math.floor((new Date(item['end_time']).getTime() - new Date(item['start_time']).getTime()) / 1000),
                distance: item['distance_m'],
                mpg: item['average_mpg'],
                fuelConsumption: item['fuel_volume_gal'],
                hard_brakes: item['hard_brakes'],
                hard_accelerations: item['hard_accels'],
            });
        }
        
        cache.put('automatic.getTrips', data, MAX_CACHE_AGE);

        deferred.resolve(data);
    });
    
    return deferred.promise;
}
