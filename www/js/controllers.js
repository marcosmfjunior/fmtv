angular.module('starter.controllers', [])

.controller('RadioCtrl',function($scope) {})

.controller('TvCtrl',function($scope) {alert('ee');})

.controller('NewsCtrl',function($scope,Noticias) {
  var noticias = Noticias;  
  noticias.all().then(function(feed) {
    $scope.noticias = feed;    
  });

  $scope.teste = function(index){
    noticias.get(index).then(function(noticia) {
      console.log(noticia);
    });
  }

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
  var eventos = Eventos;

  eventos.all().then(function(feed) {
    $scope.eventos = feed;   
    //atualizaData(); 
  });

  function atualizaData(){
    for (var i = 0, tamanho = $scope.eventos.length; i < tamanho; i++) {
      $scope.eventos[i].evento.DATAFIM = $scope.eventos[i].evento.DATAFIM.getMonth();
      var dataFim = new Date(scope.eventos[i].evento.DATAFIM);
      console.log(dataFim.getMonth());
    };
  }

})

.controller('EventosDetailCtrl', function($scope, $stateParams, Eventos, $cordovaSocialSharing) {
  var eventos = Eventos;   
  var indice = $stateParams.nIndex;


  //verifica se o primeiro char é :, se for tira
  if( indice.charAt( 0 ) === ':' )
      indice = indice.slice( 1 );

  eventos.get(indice).then(function(evento) {      
      $scope.evento = evento.evento;
      $scope.programacoes = evento.programacoes;
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
