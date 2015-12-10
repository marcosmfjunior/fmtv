angular.module('starter.services', ['ngResource'])

.factory('popUp', function($rootScope, $timeout, $ionicPopup) {
      return {
          show: function (title,subTitle, template) {
            $ionicPopup.show({
             template: template,
             title: title,
             subTitle: subTitle,
             buttons: [
               { text: 'Fechar', type: 'button-positive'},
               
             ]
           });
      }
    };
  })

.factory('Noticias', function($http,$q,popUp,$resource) {
  var noticias = $http.get("http://comunica.furg.br/rss.php")
    .then(function(response) {
      console.log(response);
      var data = [];
      for(var i = 0; i<20; i++){
        data.push(response.data.item[i]);
      }
        return data;
    },function(reason) { // quando falha a request
      popUp.show("Comunica FURG","Erro","Não foi possível buscar os dados, verifique a sua conexão");      
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

.factory('Programacao', function($http,$q,popUp) {
  var programacoes = $http.post("http://marcosmartinsjr.com/radio/evento/api/prog.json")
    .then(function(response) {
        return response.data;
    },function(reason) { // quando falha a request
      popUp.show("Comunica FURG","Erro","Não foi possível buscar os dados, verifique a sua conexão");      
    });
 
  return {
    all: function() {
      return programacoes.then(function(array){
        return array;
      });
    },
    get: function(index) {
    return programacoes.then(function(array) {
        return array[parseInt(index)];        
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
            duration = duration || 'short';
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
