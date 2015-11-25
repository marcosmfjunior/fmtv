angular.module('starter.controllers', [])

.controller('TabCtrl',function($scope){})

.controller('RadioCtrl',function($scope) {})

.controller('TvCtrl',function($scope,Programacao) {
  var programacoes;
  var diaAtual =  new Date().getDay();

  var programacao = Programacao;  
  programacao.all().then(function(feed) {    
    programacoes = feed;    
    $scope.programacoes = feed;
    $scope.programa = programacoes[diaAtual];  
  });

  $scope.anterior = function(){
    diaAtual--;
    diaAtual=checaDia(diaAtual);    
    $scope.programa = programacoes[diaAtual];
  }
  $scope.proximo = function(){
    diaAtual++;
    diaAtual=checaDia(diaAtual);
    $scope.programa = programacoes[diaAtual];
  } 

  function checaDia(dia){//função para checar quando for dia extremo na semana  - sabado e domingo
    if(dia == -1)
      return 6;
    else if(dia == 7)
      return 0;
    else
      return dia;
  }
})

.controller('InfoCtrl',function($scope) {})

.controller('MicroCtrl',function($scope) {})

.controller('NewsCtrl',function($scope,Noticias,$localstorage,Toast,popUp) {

  $scope.isLoading = true;

  if($localstorage.get('primeiraVez') == null){
      popUp.show("Comunica FURG","Primeiro Acesso","Colocar alguma img de ref para explicar usar <img class='full-image'");
      $localstorage.set('primeiraVez',true);
  }

  var noticias = Noticias;  
  var msg = Toast;
  var feedNews;
  noticias.all().then(function(feed) {
    //console.log(feed);
    feedNews = feed;
    $scope.isLoading = false;    
    $scope.noticias = feed;      
  });


  $scope.atualiza = function() {
        noticias.all().then(function(feed) {          
          $scope.noticias = feed;    
        });    
      $scope.$broadcast('scroll.refreshComplete');    
  };

  $scope.addFav = function(indice){

    noticia = feedNews[indice];

    var favNews = $localstorage.get('favNews');//nao foi usado getObject pois dava erro na verificação de nulo
    var PodeRegistrar = true;
    
    if(favNews == null)
      favNews = []; //se for nulo declara um array para fazer push posteriormente
    else{
      var News = $localstorage.getObject('favNews');
      angular.forEach(News, function(value, key) {
        if(value.title == noticia.title){
          PodeRegistrar = false;
          msg.show("Essa notícia já foi adicionada. Clique no botão azul para visualizá-la!");
        }
      });

      favNews = JSON.parse(favNews);//se nao for nulo passa de texto para o formato JSON
    } 
      
    if (PodeRegistrar){
      favNews.push(noticia);
      msg.show("Notícia adicionada aos favoritos");

      $localstorage.setObject('favNews',favNews);
    }
  }
})

.controller('NewsFavCtrl',function($scope,Noticias,$localstorage,Toast) {
    $scope.shouldShowDelete = false;    
    var msg = Toast;  

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
      msg.show("Notícia removida dos favoritos com sucesso");
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

  $scope.noticia = noticiasFav[indice];

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


.controller('NewsDetailCtrl', function($scope, $stateParams, Noticias, $cordovaSocialSharing ) {
  var noticias = Noticias;   
  var indice = $stateParams.nIndex;


  //verifica se o primeiro char é :, se for tira
  if( indice.charAt( 0 ) === ':' )
      indice = indice.slice( 1 );

  noticias.get(indice).then(function(noticia) {   
      noticia.content = htmlEncode(noticia.content);   
      $scope.noticia = noticia;
      console.log(noticia);
    });  

  function htmlEncode( input ) {
    return String(input)
        .replace(/&quot;/g, '"')  
        .replace(/&amp;/g, '&')  
  }

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


.controller('EventosCtrl',function($scope, $stateParams, Eventos,Toast) {
  $scope.isLoading = true;
  var eventos = Eventos;

  eventos.all().then(function(feed) {
    $scope.isLoading = false;    
    $scope.eventos = feed;        
    $scope.urlBase = "http://marcosmartinsjr.com/radio/evento/uploads/eventos/";

    if(feed.length == 0)
      Toast.show("Não há eventos no momento")
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

.controller('EventosDetailCtrl', function($scope, $stateParams, Eventos, $cordovaSocialSharing, $cordovaCalendar, Toast) {
  var eventos = Eventos;   
  var indice = $stateParams.nIndex;
  var msg = Toast;

  //verifica se o primeiro char é :, se for tira
  if( indice.charAt( 0 ) === ':' )
      indice = indice.slice( 1 );

  eventos.get(indice).then(function(evento) {      
    console.log(evento);
      $scope.evento = evento;
      $scope.urlBase = "http://marcosmartinsjr.com/radio/evento/uploads/eventos/";
      //$scope.programacoes = evento.PROGRAMACOES;
      //$scope.autores = evento.PROGRAMACOES[indice].AUTORES;
      //console.log($scope.autores);
      //console.log(evento);
    });  

  $scope.linkExterno = function(link){
    window.open(link, "_system", "location=yes");
    return false;
  }

  $scope.marcarCalendario = function() {
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

     msg.show("O evento foi marcado no seu calendário com sucesso!");
    }, function (err) {
      // error
      msg.show("Ocorreu um erro :/ É provável que seu dispositivo nao suporte esta função");
    });
  }
  
});
