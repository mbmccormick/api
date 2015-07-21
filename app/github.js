var github = require('github');

var q = require('q');

var cache = require('memory-cache');
var MAX_CACHE_AGE = 5 * 1000; // 5 minutes

exports.getActivity = function(next) {
    
    var cachedResult = cache.get('github.getActivity');
    if (cachedResult) {
        return q.fcall(function() {
            return cachedResult;
        });
    }
    
    var client = new github({
        version: "3.0.0"
    });
    
    var deferred = q.defer();
    
    client.events.getFromUserPublic({ user: 'mbmccormick' }, function(err, response) {
        if (err) {
            deferred.reject(next(new Error('Failed to retrieve GitHub activity')));
        }
        
        var payload = response;
        
        var data = [];
        for (var i = 0; i < payload.length; i++)
        {
            var item = payload[i];            
            
            data.push({
                dateTime: new Date(item['created_at']),
                type: item['type'].replace('Event', ''),
                repo: item['repo']['name'],
                payload: item['payload']
            });
        }
        
        cache.put('github.getActivity', data, MAX_CACHE_AGE);

        deferred.resolve(data);
    });
    
    return deferred.promise;
}

exports.getActivitySummary = function(next) {
    
    var cachedResult = cache.get('github.getActivitySummary');
    if (cachedResult) {
        return q.fcall(function() {
            return cachedResult;
        });
    }
    
    var client = new github({
        version: "3.0.0"
    });
    
    var deferred = q.defer();
    
    client.user.get({ user: 'mbmccormick' }, function(err, response) {
        if (err) {
            deferred.reject(next(new Error('Failed to retrieve GitHub activity summary')));
        }
        
        var payload = response;
        
        var data = {
            followers: payload['followers'],
            following: payload['following'],
            repos: payload['public_repos'],
            gists: payload['public_gists']
        };
        
        cache.put('github.getActivitySummary', data, MAX_CACHE_AGE);

        deferred.resolve(data);
    });
    
    return deferred.promise;
}
