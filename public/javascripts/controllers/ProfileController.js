(function(){
    angular.module('inclusion_app')
    .controller('ProfileController', ProfileController);


    ProfileController.$inject = ['Upload', '$scope', 'UserService', '$state', '$http', '$window'];


  function ProfileController( Upload, $scope, UserService, $state, $http, $window){
      var vm = this;

      vm.user = UserService.user;


   $scope.$watch(function(){
       return vm.file
   }, function (){
      vm.upload(vm.file);
   });



 vm.upload = function(file) {
   if (file) {
     Upload.upload({
       url: '/profile',
       method: 'POST',
       data: {userId: vm.user._id},
       file: file
     }).progress(function(evt){
       console.log("firing");
     }).success(function(data){

     }).error(function(error){
       console.log(error);
     })
   }
 };



 $http({
   url: '/profile/',
   method: 'GET',
   params: {
     token: localStorage.token
   }

 }).then(function (response) {
   console.log(response.data)
   vm.user = response.data
})


vm.create = function () {
   var request = {
       userId: vm.user._id,
       username: vm.user.username,
       name: vm.user.name,
       email: vm.user.email,
       city: vm.user.city,
       state: vm.user.state,
       disability: vm.user.disability
   }

$http.post(`/profile/${vm.user._id}`, request).success(function(){
   console.log("success");
}).error(function(error){
   console.log("error");
})

};



 vm.update = function () {
    var request = {
        userId: vm.user._id,
        username: vm.user.username,
        name: vm.user.name,
        email: vm.user.email,
        city: vm.user.city,
        state: vm.user.state,
        disability: vm.user.disability
    }

 $http.patch(`/profile/${vm.user._id}`, request).success(function(){
    console.log("success");
 }).error(function(error){
    console.log("error");
 })

};


vm.createDisability = function () {
  if(vm.user.disability == true) {
    var request = {
        userId: vm.user._id,
        bio: vm.user.bio,
        age: vm.user.age,
        preferred_activity: vm.user.preferred_activity,
      }
    }
    else {
      console.log("Not disabled user");
    }

$http.post(`/profile/${vm.user._id}`, request).success(function(){
    console.log("success")
}).error(function(error){
    console.log(error);
});
}


vm.updateDisability = function () {
  if(vm.user.disability == true) {
    var request = {
        userId: vm.user._id,
        bio: vm.user.bio,
        age: vm.user.age,
        preferred_activity: vm.user.preferred_activity,
      }
    }
    else {
      console.log("Not disabled user");
    }

$http.patch(`/profile/${vm.user._id}`, request).success(function(){
    console.log("success")
}).error(function(error){
    console.log(error);
});
}


vm.delete = function (id){
  $http.delete(`/profile/${vm.user._id}`, request).success(function(){
    console.log("Delete success")
  }).error(function(error){
    console.log(error);
  })

}

vm.createFacility = function (){
  if(vm.user.disability == true) {
    var request = {
        userId: vm.user._id,
        name: vm.facility.name,
        address: vm.facility.address,
        city: vm.facility.city,
        state:vm.facility.state,
        zip: vm.facility.zip,
        description: vm.facility.description,
        phone: vm.facility.phone,
        email: vm.facility.email
      }
    }
    else {
      console.log("Not disabled user");
    }

$http.post(`/profile/${vm.user._id}/facility`, request).success(function(){
    console.log("success")
}).error(function(error){
    console.log(error);
});

}

vm.updatefacility = function (){
  if(vm.user.disability == true) {
    var request = {
        userId: vm.user._id,
        name: vm.facility.name,
        address: vm.facility.address,
        city: vm.facility.city,
        state:vm.facility.state,
        zip: vm.facility.zip,
        description: vm.facility.description,
        phone: vm.facility.phone,
        email: vm.facility.email
      }
    }
    else {
      console.log("Not disabled user");
    }

$http.patch(`/profile/${vm.user._id}/facility`, request).success(function(){
    console.log("success")
}).error(function(error){
    console.log(error);
});

}

vm.deletefacility = function (){
  $http.delete(`/profile/${vm.user._id}/facilities/${vm.facility._id}`, request).success(function(){
    console.log("Delete success")
  }).error(function(error){
    console.log(error);
  })

}


     }

}());
