var fitbit = require('fitbit-node');

var q = require('q');

var cache = require('memory-cache');
var MAX_CACHE_AGE = 60 * 60 * 1000; // 1 hour

exports.getSteps = function(next) {
    
    var cachedResult = cache.get('fitbit.getSteps');
    if (cachedResult) {
        return q.fcall(function() {
            return cachedResult;
        });
    }
    
    var client = new fitbit(process.env.FITBIT_CONSUMER_KEY, process.env.FITBIT_CONSUMER_SECRET);

    return client.requestResource('/activities/steps/date/today/1m.json', 'GET', process.env.FITBIT_OAUTH_TOKEN, process.env.FITBIT_TOKEN_SECRET).then(function(results) {
        if (results[1].statusCode != 200) {
            return next(new Error('Failed to retrieve Fitbit steps'));
        }

        var payload = JSON.parse(results[0]);
        
        var data = payload['activities-steps'];
        data.reverse();
        
        cache.put('fitbit.getSteps', data, MAX_CACHE_AGE);

        return data;
    });
}

exports.getWeight = function(next) {
    
    var cachedResult = cache.get('fitbit.getWeight');
    if (cachedResult) {
        return q.fcall(function() {
            return cachedResult;
        });
    }
    
    var client = new fitbit(process.env.FITBIT_CONSUMER_KEY, process.env.FITBIT_CONSUMER_SECRET);

    return client.requestResource('/body/weight/date/today/1m.json', 'GET', process.env.FITBIT_OAUTH_TOKEN, process.env.FITBIT_TOKEN_SECRET).then(function(results) {
        if (results[1].statusCode != 200) {
            return next(new Error('Failed to retrieve Fitbit weight'));
        }

        var payload = JSON.parse(results[0]);
        
        var data = payload['body-weight'];
        data.reverse();
        
        cache.put('fitbit.getWeight', data, MAX_CACHE_AGE);

        return data;
    });
}

exports.getSleep = function(next) {
    
    var cachedResult = cache.get('fitbit.getSleep');
    if (cachedResult) {
        return q.fcall(function() {
            return cachedResult;
        });
    }
    
    var client = new fitbit(process.env.FITBIT_CONSUMER_KEY, process.env.FITBIT_CONSUMER_SECRET);

    return client.requestResource('/sleep/minutesAsleep/date/today/1m.json', 'GET', process.env.FITBIT_OAUTH_TOKEN, process.env.FITBIT_TOKEN_SECRET).then(function(results) {
        if (results[1].statusCode != 200) {
            return next(new Error('Failed to retrieve Fitbit sleep'));
        }

        var payload = JSON.parse(results[0]);
        
        var data = payload['sleep-minutesAsleep'];
        data.reverse();
        
        cache.put('fitbit.getSleep', data, MAX_CACHE_AGE);

        return data;
    });
}
