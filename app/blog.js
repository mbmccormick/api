var rss = require('feed-read');

var q = require('q');

var cache = require('memory-cache');
var MAX_CACHE_AGE = 60 * 1000; // 1 hour

exports.getLatest = function(next) {
    
    var cachedResult = cache.get('blog.getLatest');
    if (cachedResult) {
        return q.fcall(function() {
            return cachedResult;
        });
    }
    
    var deferred = q.defer();
    
    rss('http://mbmccormick.com/rss/', function(err, response) {
        if (err) {
            deferred.reject(next(new Error('Failed to retrieve Blog posts')));
        }
        
        var payload = response;
        
        var data = [];
        for (var i = 0; i < payload.length; i++)
        {
            var item = payload[i];
            
            data.push({
                date: new Date(item['published']).toISOString().substr(0, 10),
                title: item['title'],
                url: item['link']
            });
        }
        
        cache.put('blog.getLatest', data, MAX_CACHE_AGE);

        deferred.resolve(data);
    });
    
    return deferred.promise;
}
