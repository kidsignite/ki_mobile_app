angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.login = function() {
      var user = $scope.data.username;
      var pass =$scope.data.password;
      console.log("LOGIN user: " + user + " - PW: " + pass);
        LoginService.loginUser(user,pass).success(function(data) {
            $state.go('tab.dash');
        }).error(function(data) {
           $state.go('register');
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',

                template: 'Please register!'
            });
        });
    }
})
.controller('regCtrl', function($scope, $ionicPopup, $state) {
 
 
    $scope.register = function() {
     console.log("ok ");
       $state.go('register');
           
    }
})





.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
