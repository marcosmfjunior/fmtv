angular.module('starter.controllers', [])

.controller('TabCtrl',function($scope){})

.controller('RadioCtrl',function($scope) {})

.controller('TvCtrl',function($scope) {})

.controller('InfoCtrl',function($scope) {})

.controller('MicroCtrl',function($scope) {
  var data = new Date();
  var hora = data.getHours();    
  var min = data.getMinutes();

//comparar hr atual com o vetor de horarios para mostrar qual proximo bus
//  var horarios = ["08:10"]
})

.controller('NewsCtrl',function($scope,Noticias,$localstorage) {
  $scope.isLoading = true;
  //console.log($localstorage.get('favNews'));

  var noticias = Noticias;  
  var feedNews;
  noticias.all().then(function(feed) {
    console.log(feed);
    feedNews = feed;
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

  $scope.addFav = function(indice){

    noticia = feedNews[indice];

    var favNews = $localstorage.get('favNews');//nao foi usado getObject pois dava erro na verificação de nulo
    //console.log(favNews);
    var PodeRegistrar = true;
    
    if(favNews == null)
      favNews = []; //se for nulo declara um array para fazer push posteriormente
    else{
      var News = $localstorage.getObject('favNews');
      angular.forEach(News, function(value, key) {
        if(value.title == noticia.title)
          PodeRegistrar = false;
      });

      favNews = JSON.parse(favNews);//se nao for nulo passa de texto para o formato JSON
    } 
      
    if (PodeRegistrar){
      favNews.push(noticia);

      $localstorage.setObject('favNews',favNews);
    }
  }
})

.controller('NewsFavCtrl',function($scope,Noticias,$localstorage) {
    $scope.shouldShowDelete = false;      

    $scope.mostraDeletaFav = function(){
      if($scope.shouldShowDelete == false)
        $scope.shouldShowDelete = true;      
      else
        $scope.shouldShowDelete = false;      

    }

    $scope.deletaFav = function(index){
      console.log(index);      
      var noticiasFav = $localstorage.getObject('favNews');
      noticiasFav.splice(index, 1);//atualiza o storage
      $localstorage.setObject('favNews',noticiasFav);
      $scope.noticiasFav.splice(index, 1);//atualiza o scopo
    }

    $scope.noticiasFav = $localstorage.getObject('favNews');
    console.log($scope.noticiasFav);
})


.controller('NewsFavDetailCtrl', function($scope, $stateParams, $localstorage, $cordovaSocialSharing ) {
  
  var noticiasFav = $localstorage.getObject('favNews');

  var indice = $stateParams.nIndex;

  //verifica se o primeiro char é :, se for tira
  if( indice.charAt( 0 ) === ':' )
      indice = indice.slice( 1 );

  console.log(noticiasFav[indice]);

  $scope.noticia = noticiasFav[indice];
})


.controller('NewsDetailCtrl', function($scope, $stateParams, Noticias, $cordovaSocialSharing ) {
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
    $scope.urlBase = "http://marcosmartinsjr.com/radio/evento/uploads/eventos/";
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

.controller('EventosDetailCtrl', function($scope, $stateParams, Eventos, $cordovaSocialSharing, $cordovaCalendar) {
  var eventos = Eventos;   
  var indice = $stateParams.nIndex;


  //verifica se o primeiro char é :, se for tira
  if( indice.charAt( 0 ) === ':' )
      indice = indice.slice( 1 );

console.log("antes get");
  eventos.get(indice).then(function(evento) {      
    console.log(evento);
      $scope.evento = evento;
      $scope.urlBase = "http://marcosmartinsjr.com/radio/evento/uploads/eventos/";
      //$scope.programacoes = evento.PROGRAMACOES;
      //$scope.autores = evento.PROGRAMACOES[indice].AUTORES;
      //console.log($scope.autores);
      //console.log(evento);
    });  

  $scope.teste = function() {
    var dataInicio = new Date($scope.evento.DATAINI);
    var dataFim = new Date($scope.evento.DATAFIM);

    var anoIni = parseInt(dataInicio.getFullYear());
    var mesIni = parseInt(dataInicio.getMonth());//no plugin é usado o indice
    var diaIni = parseInt(dataInicio.getDate()+1); //o dia vem em indice, e no plugin é usado como dia do mes

    var anoFim = parseInt(dataFim.getFullYear());
    var mesFim = parseInt(dataFim.getMonth());
    var diaFim = parseInt(dataFim.getDate()+1);

    var titulo = $scope.evento.DESCRICAO;
    var local = $scope.evento.LOCAL;
    var observacao = $scope.evento.OBSERVACAO;

    //console.log(mesIni +' - ' + diaIni +' - ' + diaFim +' - ' + anoIni );
   // console.log(titulo +'-' + local+ ' - ' + observacao);
    //alert(titulo);

    $cordovaCalendar.createEvent({
      title: titulo ,
      location: local,
      notes: observacao,
      startDate: new Date(anoIni, mesIni, diaIni, 0, 0, 0, 0, 0),
      endDate: new Date(anoFim, mesFim, diaFim, 0, 0, 0, 0, 0)
    }).then(function (result) {
      // success
     alert("O evento foi marcado no seu calendário com sucesso!")
    }, function (err) {
      // error
      alert("Ocorreu um erro ):  :" + err);
    });
  }
  
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
