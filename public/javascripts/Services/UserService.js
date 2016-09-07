(function () {
   "use strict";
   angular.module("inclusion_app")
          .factory("UserService", UserService);


   UserService.$inject = ["$window"];

   function UserService($window){
      var userData =  {
        setUser: setUser,
        user: {}
      }

      function setUser() {
        var payload = $window.localStorage.token.split('.')[1];
        var user = JSON.parse($window.atob(payload));
        userData.user = user;
      }

      return userData;
   }




})();
