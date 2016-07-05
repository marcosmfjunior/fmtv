angular.module('starter.filter', [])

.filter('totime', function() {
  return function(input) {
    return input.substring(0, 5);
  };
})


;