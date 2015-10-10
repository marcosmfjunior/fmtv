/*(function() {
angular.module('starter.services', [])

.factory('rssService', function($http,$q) {  
    
    var entries;

    return {
      getEntries: function() {
        var deferred = $q.defer();                
        $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "q": "http://www.furg.br/bin/rss/noticias.php", "num":"10" } })
          .success(function(data) {
            console.log(data);
              entries = data.responseData.feed.entries;
              deferred.resolve(entries);
          })
          .error(function(data) {
              console.log("ERROR: " + data);
          });
     
        return deferred.promise;
      }

    };
  });
}());
*/

angular.module('starter.services', [])

.factory('Noticias', function($http,$q) {

  var noticias = $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "q": "http://www.furg.br/bin/rss/noticias.php", "num":"20" } })
    .then(function(response) {
        return response.data.responseData.feed.entries;
    });
 
  return {
    all: function() {
      return noticias.then(function(array){
        return array;
      });
    },
    get: function(noticiaIndex) {
    return noticias.then(function(array) {
        return array[parseInt(noticiaIndex)];        
    });
  }
  };
});
