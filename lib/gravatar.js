var crypto = require('crypto')
  , request = require('request')
  , querystring = require('querystring');

var gravatar = module.exports = {
    url: function (email, options, https) {
      var baseURL = (https && "https://secure.gravatar.com/avatar/") || 'http://www.gravatar.com/avatar/';
      var queryData = querystring.stringify(options);
      var query = (queryData && "?" + queryData) || "";

      return baseURL + crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex') + query;
    },
    profile_url: function (email, options, https) {
      var format = options != undefined && options.format != undefined ?  String(options.format) : 'json'
      //delete options.format
      if (options != undefined && options.format != undefined) delete options.format
      var baseURL = (https && "https://secure.gravatar.com/") || 'http://www.gravatar.com/';
      var queryData = querystring.stringify(options);
      var query = (queryData && "?" + queryData) || "";

      return baseURL + crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex') + '.' + format + query;
    },
    get_profile: function (url, callback) {
      var options = {
          url: url,
          headers: {
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2101.0 Safari/537.36'
          }
      };
      
      request(options, function (error, response, body) {
        callback(error, JSON.parse(body));
      });
    }
};
