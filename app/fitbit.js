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

    return client.requestResource('/activities/steps/date/today/1m.json', 'GET', process.env.FITBIT_ACCESS_TOKEN, process.env.FITBIT_TOKEN_SECRET).then(function(response) {
        if (response[1].statusCode != 200) {
            return next(new Error('Failed to retrieve Fitbit steps'));
        }

        var payload = JSON.parse(response[0]);
        
        payload['activities-steps'].reverse();
        
        var data = [];
        for (var i = 0; i < payload['activities-steps'].length; i++)
        {
            var item = payload['activities-steps'][i];            
            
            data.push({
                date: item['dateTime'],
                value: item['value']
            });
        }
        
        cache.put('fitbit.getSteps', data, MAX_CACHE_AGE);

        return data;
    });
}

exports.getStepsSummary = function(next) {
    
    var cachedResult = cache.get('fitbit.getStepsSummary');
    if (cachedResult) {
        return q.fcall(function() {
            return cachedResult;
        });
    }
    
    var client = new fitbit(process.env.FITBIT_CONSUMER_KEY, process.env.FITBIT_CONSUMER_SECRET);

    return client.requestResource('/activities/date/today.json', 'GET', process.env.FITBIT_ACCESS_TOKEN, process.env.FITBIT_TOKEN_SECRET).then(function(response) {
        if (response[1].statusCode != 200) {
            return next(new Error('Failed to retrieve Fitbit steps summary'));
        }

        var payload = JSON.parse(response[0]);
        
        var data = {
            step_goal: payload['goals']['steps'],
            steps: payload['summary']['steps']
        };
        
        cache.put('fitbit.getStepsSummary', data, MAX_CACHE_AGE);

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

    return client.requestResource('/sleep/minutesAsleep/date/today/1m.json', 'GET', process.env.FITBIT_ACCESS_TOKEN, process.env.FITBIT_TOKEN_SECRET).then(function(response) {
        if (response[1].statusCode != 200) {
            return next(new Error('Failed to retrieve Fitbit sleep'));
        }

        var payload = JSON.parse(response[0]);
        
        payload['sleep-minutesAsleep'].reverse();
        
        var data = [];
        for (var i = 0; i < payload['sleep-minutesAsleep'].length; i++)
        {
            var item = payload['sleep-minutesAsleep'][i];            
            
            data.push({
                date: item['dateTime'],
                value: item['value']
            });
        }
        
        cache.put('fitbit.getSleep', data, MAX_CACHE_AGE);

        return data;
    });
}

exports.getSleepSummary = function(next) {
    
    var cachedResult = cache.get('fitbit.getSleepSummary');
    if (cachedResult) {
        return q.fcall(function() {
            return cachedResult;
        });
    }
    
    var client = new fitbit(process.env.FITBIT_CONSUMER_KEY, process.env.FITBIT_CONSUMER_SECRET);

    return client.requestResource('/sleep/date/today.json', 'GET', process.env.FITBIT_ACCESS_TOKEN, process.env.FITBIT_TOKEN_SECRET).then(function(response) {
        if (response[1].statusCode != 200) {
            return next(new Error('Failed to retrieve Fitbit sleep summary'));
        }

        var payload = JSON.parse(response[0]);
        
        var data = {
            sleeps: payload['summary']['totalSleepRecords'],
            minutes_asleep: payload['summary']['totalMinutesAsleep']
        };
        
        cache.put('fitbit.getSleepSummary', data, MAX_CACHE_AGE);

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
    
    return client.requestResource('/body/weight/date/today/1m.json', 'GET', process.env.FITBIT_ACCESS_TOKEN, process.env.FITBIT_TOKEN_SECRET).then(function(response) {
        if (response[1].statusCode != 200) {
            return next(new Error('Failed to retrieve Fitbit weight'));
        }

        var payload = JSON.parse(response[0]);
        
        payload['body-weight'].reverse();
        
        var data = [];
        for (var i = 0; i < payload['body-weight'].length; i++)
        {
            var item = payload['body-weight'][i];            
            
            data.push({
                date: item['dateTime'],
                value: item['value']
            });
        }
        
        cache.put('fitbit.getWeight', data, MAX_CACHE_AGE);

        return data;
    });
}
