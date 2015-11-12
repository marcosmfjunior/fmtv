// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
      cordova.plugins.socialsharing();
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.tabs.position("top"); //Places them at the bottom for all OS
  $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller:'TabCtrl'
  })
 

  .state('tab.radio', {
    url: '/radio',
    views: {
      'tab-radio': {
        templateUrl: 'templates/tab-radio.html',
        controller: 'RadioCtrl'
      }
    }
  })

  .state('tab.tv', {
    url: '/tv',
    views: {
      'tab-tv': {
        templateUrl: 'templates/tab-tv.html',
        controller: 'TvCtrl'
      }
    }

  })

  .state('tab.tv-programacao', {
      url: '/tv/programacao',
      views: {
        'tab-tv-programacao': {
          templateUrl: 'templates/tab-tv-programacao.html',
          controller: 'TvProgramacaoCtrl'
        }
      }      
  })

  .state('tab.news', {
    url: '/news',
    views: {
      'tab-news': {
        templateUrl: 'templates/tab-news.html',
        controller: 'NewsCtrl'
      }
    }
  })

  .state('tab.news-detail', {
    url: '/news/:nIndex',
    views: {
      'tab-news': {
        templateUrl: 'templates/news-detail.html',
        controller: 'NewsDetailCtrl'
      }
    }
  })


  .state('tab.eventos', {
    url: '/eventos',
    views: {
      'tab-eventos': {
        templateUrl: 'templates/tab-eventos.html',
        controller: 'EventosCtrl'
      }
    }
  })

  .state('tab.eventos-detail', {
    url: '/eventos/:nIndex',
    views: {
      'tab-eventos': {
        templateUrl: 'templates/eventos-detail.html',
        controller: 'EventosDetailCtrl'
      }
    }
  })

  .state('tab.info', {
    url: '/info',
    views: {
      'tab-info': {
        templateUrl: 'templates/tab-info.html',
        controller: 'InfoCtrl'
      }
    }
  })

  .state('tab.info-micro', {
    url: '/info/micro',
    views: {
      'tab-info': {
        templateUrl: 'templates/info/micro.html',
        controller: 'MicroCtrl'
      }
    }
  })

  .state('tab.info-ru', {
    url: '/info/ru',
    views: {
      'tab-info': {
        templateUrl: 'templates/info/ru.html'
      }
    }
  })

   .state('tab.info-biblioteca', {
    url: '/info/biblioteca',
    views: {
      'tab-info': {
        templateUrl: 'templates/info/biblioteca.html'
      }
    }
  })

  .state('tab.info-projeto', {
    url: '/info/projeto',
    views: {
      'tab-info': {
        templateUrl: 'templates/info/projeto.html',
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/news'); // seta a pag inicial
  $ionicConfigProvider.backButton.text('Voltar');//altera nome para botao de voltar a pag

})

.directive('fbPost', function($document) {
  return {
    restrict: 'EA',
    replace: false,
    link: function($scope, element, attr) {
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=1652034465042425 ";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  }
})

.directive('fabButton', function fabButtonDirective() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: template,
        link: link
    };
    //isAnchor
    function isAnchor(attr) {
        return angular.isDefined(attr.href) || angular.isDefined(attr.ngHref);
    }
    //template
    function template(element, attr) {
        return isAnchor(attr) ?
            '<a class="fab-button" ng-transclude></a>' :
            '<button class="fab-button" ng-transclude></button>';
    }
    //link
    function link(scope, element, attr) {
        var target = '#'+attr['targetId'];
        //var bgColor = attr['bg-color'];
        //element.style=bgColor;
        var targetEl = angular.element(document.querySelector(target));
        var savePos = 0;
        targetEl.bind('scroll', function (e) {
            //console.log(savePos)
            if (savePos < e.detail.scrollTop) {
                savePos = e.detail.scrollTop;
                element.removeClass('fadeInUp animated');
                element.addClass('fadeOutDown animated');
            }
            if (savePos > e.detail.scrollTop) {
                savePos = e.detail.scrollTop;
                element.removeClass('fadeOutDown animated');
                element.addClass('fadeInUp animated');
            }
        });
    }
})

;

