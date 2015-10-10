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
            .share($scope.noticia.content, $scope.noticia.title, '', $scope.noticia.link) // Share via native share sheet
            .then(function(result) {
                // Success!
            }, function(err) {
                // An error occured. Show a message to the user
            });
  }
})

.controller('EventosCtrl',function($scope) {});
