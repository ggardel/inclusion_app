(function () {
   "use strict";
   angular.module("inclusion_app")
          .factory("UserService", UserService);


   UserService.$inject = ["$window"];

   function UserService($window){
      var userData =  {
        setUser: setUser,
        user: {},
        loginRequest: false,
        registerRequest: false,

        isLoggedIn: function () {
          return localStorage.getItem('token') !== null
        }
      }

      function setUser() {
        if ($window.localStorage.token){
          var payload = $window.localStorage.token.split('.')[1];
          var user = JSON.parse($window.atob(payload))._doc;
          userData.user = user;
        }


        //console.log("token",$window.localStorage.token)
      }
      userData.setUser()
      return userData;
   }




})();
