angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Camera) {
  var wurl;
  var phoneno;
  var email;
  var password;

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

.controller('regCtrl', function($scope, $state, $http) {
   $scope.data = {};
   


  $scope.registerUser = function() {
   var phoneno = $scope.data.phoneno;
   var email =$scope.data.email;
   var password  = $scope.data.password;
   alert(phoneno);
   wurl = 'https://script.google.com/macros/s/AKfycbzv1UjeeQJi4b4OiD_kc1l_gATR_rfKqFoWZLfd4dlegVRIkH8x/exec?email=' + $scope.data.email +'&phoneno=' + $scope.data.phoneno + '&password=' + $scope.data.password;

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
var firstRequest;
alert($scope.data.email);
var request = {
   method: 'POST',
   contentType:'application/json',
   url: 'https://script.google.com/macros/s/AKfycbzv1UjeeQJi4b4OiD_kc1l_gATR_rfKqFoWZLfd4dlegVRIkH8x/exec?email=' + $scope.data.email +'&phoneno=' + $scope.data.phoneno + '&password=' + $scope.data.password,
   //url: 'https://script.google.com/macros/s/AKfycbzv1UjeeQJi4b4OiD_kc1l_gATR_rfKqFoWZLfd4dlegVRIkH8x/exec?email=prasanthikad@hotmail.com&phoneno=777898328&password=12345',
   headers: {'Content-Type': undefined},
   //data: { test: 'test' }
};

$http(request).then(function(response) {
  console.log(response);
  firstRequest = response.data;
  console.log(firstRequest);
  if(firstRequest ==='true'){
     console.log("got here");
     $state.go('verify');
   alert("User Verified, Verification Code will be sent shortly");
  }else{
  alert("Invalid Information");
  }

}, function(error) {
  alert("error");
});


     








  };
$scope.verifyUniqueCode = function(){

  var verificationCode  = $scope.data.code;
   alert(wurl);
  var secondRequest;
  var req = {
     method: 'POST',
     contentType:'application/json',
     //url: 'https://script.google.com/macros/s/AKfycbzv1UjeeQJi4b4OiD_kc1l_gATR_rfKqFoWZLfd4dlegVRIkH8x/exec?email=' + email +'&phoneno=' + phoneno + '&password=' + password + '&uniquekey=' + verificationCode,
    url: wurl+'&uniquekey='+verificationCode,

     headers: {'Content-Type': undefined},
     //data: { test: 'test' }
  };

  $http(req).then(function(response) {
    alert(response.data);
    console.log(response);
    secondRequest = response.data;
    console.log(secondRequest);

    if(secondRequest=="true"){
    alert("User Verified, Creating HumHub account");

    }else{
      alert("User Verification Failed");
    }

  }, function(error) {
    alert("error");
  });
}









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


.controller('inv', function($scope, $state) {
   
    $scope.invt = function() {
       $state.go('login');
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


