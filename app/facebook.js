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
    
    facebook.api('me', function (response) {
        if (!response || response.error) {
            deferred.reject(next(new Error('Failed to retrieve Facebook profile')));
        }
        
        var payload = response;
        
        var data = {
            name: payload['name'],
            gender: payload['gender'],
            bithdate: new Date(payload['birthday']).toISOString().substring(0, 10),
            location: payload['location']['name'],
            hometown: payload['hometown']['name'],
            relationship_status: payload['relationship_status'],
            significant_other: payload['significant_other']['name']
        };
        
        cache.put('facebook.getProfile', data, MAX_CACHE_AGE);

        deferred.resolve(data);
    });
    
    return deferred.promise;
}

exports.getEducation = function(next) {
    
    var cachedResult = cache.get('facebook.getEducation');
    if (cachedResult) {
        return q.fcall(function() {
            return cachedResult;
        });
    }
    
    facebook.setAccessToken(process.env.FACEBOOK_ACCESS_TOKEN);
    
    var deferred = q.defer();
    
    facebook.api('me', function (results) {
        if (!results || results.error) {
            deferred.reject(next(new Error('Failed to retrieve Facebook education')));
        }
        
        var payload = results;
        
        var data = [];
        for (var i = 0; i < payload['education'].length; i++)
        {
            var item = payload['education'][i];            
            
            data.push({
                type: item['type'],
                school: item['school']['name'],
                year: item['year']['name']
            });
        }
        
        cache.put('facebook.getEducation', data, MAX_CACHE_AGE);

        deferred.resolve(data);
    });
    
    return deferred.promise;
}

exports.getEmployment = function(next) {
    
    var cachedResult = cache.get('facebook.getEmployment');
    if (cachedResult) {
        return q.fcall(function() {
            return cachedResult;
        });
    }
    
    facebook.setAccessToken(process.env.FACEBOOK_ACCESS_TOKEN);
    
    var deferred = q.defer();
    
    facebook.api('me', function (results) {
        if (!results || results.error) {
            deferred.reject(next(new Error('Failed to retrieve Facebook employment')));
        }
        
        var payload = results;
        
        var data = [];
        for (var i = 0; i < payload['work'].length; i++)
        {
            var item = payload['work'][i];            
            
            data.push({
                position: item['position']['name'],
                employer: item['employer']['name'],
                location: item['location']['name'],
                start_date: item['start_date'],
                end_date: item['end_date']
            });
        }
        
        cache.put('facebook.getEmployment', data, MAX_CACHE_AGE);

        deferred.resolve(data);
    });
    
    return deferred.promise;
}