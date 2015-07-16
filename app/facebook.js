var facebook = require('fb');

var q = require('q');

var cache = require('memory-cache');
var MAX_CACHE_AGE = 24 * 60 * 1000; // 24 hours

exports.getProfile = function(next) {
    
    var cachedResult = cache.get('facebook.getProfile');
    if (cachedResult) {
        return q.fcall(function() {
            return cachedResult;
        });
    }
    
    facebook.setAccessToken(process.env.FACEBOOK_ACCESS_TOKEN);
    
    var deferred = q.defer();
    
    facebook.api('me', function (results) {
        if (!results || results.error) {
            deferred.reject(next(new Error('Failed to retrieve Facebook profile')));
        }
        
        var payload = results;
        
        var data = payload;        
        
        delete data.id;
        delete data.link;
        delete data.updated_time;
        
        traverse(data, function(key, value) {
            if (value.id)
                delete value.id;
        });
        
        cache.put('facebook.getProfile', data, MAX_CACHE_AGE);

        deferred.resolve(data);
    });
    
    return deferred.promise;
}

function traverse(o, func) {
    for (var i in o) {
        func.apply(this, [i, o[i]]);  
        if (o[i] !== null && typeof(o[i]) == "object") {
            traverse(o[i], func);
        }
    }
}