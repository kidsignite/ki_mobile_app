angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Camera) {

   $scope.takePicture = function (options) {
  
      var options = {
         quality : 75, 
         targetWidth: 300,
         targetHeight: 300,
         sourceType: 1,    
         saveToPhotoAlbum: true
      };

      
      Camera.getPicture(options).then(function(imageData) {
         $scope.picture = imageData;
      }, function(err) {
         console.log(err);
      });
    
   };

   $scope.getPicture = function (options) {
  
      var options = {
         quality : 75,
         targetWidth: 300,
         targetHeight: 300,
         sourceType: 0,         
         // saveToPhotoAlbum: true
      };
      Camera.getPicture(options).then(function(imageData) {
         $scope.picture = imageData;
      }, function(err) {
         console.log(err);
      });
    };

})

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

.controller('regCtrl', function($scope,$http,$state) {
   $scope.data = {};
  
  $scope.getdata = function() {
 
      var phoneno = $scope.data.phoneno;
      var email =$scope.data.email;
      var password  = $scope.data.password;
      console.log ($scope.data);
    
   /*     
  var data = {
    "phoneno": encodeURIComponent(phoneno),
    "email" : encodeURIComponent(email),
    "password" : encodeURIComponent(password)
     
 };
 
  var payload = JSON.stringify(data);
  
  var headers = {
    'Content-type': 'application/json'
  };
  var url = "https://script.google.com/macros/s/AKfycbz8Z3KQfdsLcSTDJzAGnSiuhJOQArWqIwQ9Aatba8Aa/dev?";
  var options = {
    'method': 'post',
    'headers': headers,
    'payload': payload
  };


  var response = UrlFetchApp.fetch(url, options);
  console.log(response);


*/


  $http.post ('https://script.google.com/macros/s/AKfycbz8Z3KQfdsLcSTDJzAGnSiuhJOQArWqIwQ9Aatba8Aa/dev?',$scope.data).success(function(data){
console.log("ok")
    $state.go('verify');
  }).error(function (data){
    
    console.log('fuck')
  });


      
  };

  

    // NOTE: encoding not functioning yet
   
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





.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});


