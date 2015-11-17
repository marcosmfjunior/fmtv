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
})

.factory('Eventos', function($http,$q) {
  var eventos = $http.post("http://marcosmartinsjr.com/radio/evento/api/eventos_v1.json")
    .then(function(response) {
        response.data = verificaData(response.data); 
        return response.data;
    });

 function verificaData(eventos){
  var eventosAtuais=[];
  var data_evento;
  var data_atual = new Date();
  for (var i = 0, tam = eventos.length; i < tam ; i++) {
      data_evento = new Date(eventos[i].DATAFIM);
      if (data_evento > data_atual)
        eventosAtuais.push(eventos[i]);        
    };  
  return eventosAtuais;
 }
  
  return {
    all: function() {
      return eventos.then(function(array){
        return array;
      });
    },
    get: function(eventoIndex) {
      return eventos.then(function(array) {
        return array[parseInt(eventoIndex)];        
    });

  }
  };
 
})

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('Toast', function($rootScope, $timeout, $ionicPopup, $cordovaToast) {
      return {
          show: function (message, duration, position) {
            message = message || "";
            duration = duration || 'long';
            position = position || 'bottom';

            if (!!window.cordova) {
              // Use the Cordova Toast plugin
          $cordovaToast.show(message, duration, position);              
            }
            else {
                    if (duration == 'short') {
                        duration = 2000;
                    }
                    else {
                        duration = 5000;
                    }
            }
      }
    };
  })

;
