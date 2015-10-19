angular.module('starter.controllers', [])

.controller('TabCtrl',function($scope){})

.controller('RadioCtrl',function($scope) {})

.controller('TvCtrl',function($scope) {})

.controller('InfoCtrl',function($scope) {})

.controller('NewsCtrl',function($scope,Noticias) {
  $scope.isLoading = true;

  var noticias = Noticias;  
  noticias.all().then(function(feed) {
    $scope.isLoading = false;    
    $scope.noticias = feed;    
  });

  $scope.atualiza = function() {
    //$timeout( function() {
        noticias.all().then(function(feed) {          
          $scope.noticias = feed;    
        });    
      $scope.$broadcast('scroll.refreshComplete');    
//    }, 1000);      
  };

})

.controller('NewsDetailCtrl', function($scope, $stateParams, Noticias, $cordovaSocialSharing) {
  var noticias = Noticias;   
  var indice = $stateParams.nIndex;


  //verifica se o primeiro char é :, se for tira
  if( indice.charAt( 0 ) === ':' )
      indice = indice.slice( 1 );

  noticias.get(indice).then(function(noticia) {      
      $scope.noticia = noticia;
      console.log(noticia);
    });  

  $scope.socialSharing = function() {
        $cordovaSocialSharing

            .share( "link para notícia: " + $scope.noticia.link +' '+ $scope.noticia.content, $scope.noticia.title, null, $scope.noticia.link) // Share via native share sheet
            .then(function(result) {
                // Success!
            }, function(err) {
              console.log (err);
                // An error occured. Show a message to the user
            });
  }
})


.controller('EventosCtrl',function($scope, $stateParams, Eventos) {
  $scope.isLoading = true;
  var eventos = Eventos;

  eventos.all().then(function(feed) {
    $scope.isLoading = false;
    $scope.eventos = feed;  
  });


  $scope.atualiza = function() {
    //$timeout( function() {
        eventos.all().then(function(feed) {          
          $scope.eventos = feed;    
        });    
      $scope.$broadcast('scroll.refreshComplete');    
//    }, 1000);      
  };
})

.controller('EventosDetailCtrl', function($scope, $stateParams, Eventos, $cordovaSocialSharing) {
  var eventos = Eventos;   
  var indice = $stateParams.nIndex;


  //verifica se o primeiro char é :, se for tira
  if( indice.charAt( 0 ) === ':' )
      indice = indice.slice( 1 );

  eventos.get(indice).then(function(evento) {      
      $scope.evento = evento;
      //$scope.programacoes = evento.PROGRAMACOES;
      //$scope.autores = evento.PROGRAMACOES[indice].AUTORES;
      //console.log($scope.autores);
      console.log(evento);
    });  

  /*$scope.socialSharing = function() {
        $cordovaSocialSharing

            .share( "link para notícia: " + $scope.noticia.link +' '+ $scope.noticia.content, $scope.noticia.title, null, $scope.noticia.link) // Share via native share sheet
            .then(function(result) {
                // Success!
            }, function(err) {
              console.log (err);
                // An error occured. Show a message to the user
            });
  }*/
});
