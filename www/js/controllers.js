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

.controller('regCtrl', function($scope, $state) {
 
 
    $scope.register = function() {
     console.log("ok ");
       $state.go('register');
           
    }
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
         
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',

                template: 'Please check your cardentials!'
            });
        });
    }
})
//addd module to this controller as module.controller and see it catches the controller bt thorws an error dont knw y 
.controller('exp', function($scope, $http) {
 $scope.data = {};
    $scope.getData = function() {
      var user = $scope.data.username;
      var lname =$scope.data.lname;
      var pass  = $scope.data.pass;

      console.log("Fuck U");
        $http.get("http://echo.jsontest.com/fname/nic/lname/arafath/8124021/misree", { params: { "key1": "value1", "key2": "value2" , "key3": "value3" } })
            .success(function(data) {
                $scope.firstname = data.firstname;
                $scope.lastname = data.lastname;
            })
            .error(function(data) {
                alert("ERROR");
            });
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
