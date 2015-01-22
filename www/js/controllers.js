angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('movieController', function($scope, rotten_tomatoes){

    $scope.title = "";

    $scope.search = function() {
        var query = $scope.title;
        var nummovies = $scope.limit;

        rotten_tomatoes.fetchMovie(query, nummovies, function(data){

            var result = data.movies;
            $scope.result = result;

        });
    }
})

.factory('rotten_tomatoes', function($resource){

    return {
        fetchMovie: function(query, nummovies, callback){
            var search_query = query;
            var search_limit = nummovies-1;


            var api = $resource('http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=:key&q=:movie_title&page_limit=:limit&callback=JSON_CALLBACK', {
                key: 'dpjxf3xsjbpj5wpmduveeseb',
                limit: 10
            }, {
                fetch:{method:'JSONP'}
            });

            api.fetch({movie_title: search_query, limit: search_limit}, function(response){

                callback(response);

            });
        }
    }

});
