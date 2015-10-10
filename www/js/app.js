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
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:


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
/*
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })*/

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
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/radio'); // seta a pag inicial

});

