(function(){
  angular.module('inclusion_app')
  .controller('ProfileController', ProfileController);


  ProfileController.$inject = ['Upload', '$scope', 'UserService', '$state', '$http', '$window'];


  function ProfileController( Upload, $scope, UserService, $state, $http, $window){
    var vm = this;

    vm.user = UserService.user;






    vm.upload = function() {

     var file = document.querySelector('.imageFile').files[0];
     var imgLink;
     if (!file || !file.type.match(/image.*/)) return;


      //  console.log("file =", file)

      /* Lets build a FormData object*/
       var fd = new FormData(); // I wrote about it: https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
       fd.append("image", file); // Append the file

       $.ajax({
        url: "https://api.imgur.com/3/image.json",
        type: "POST",
        headers: {
          Authorization: `Client-ID ec9f838baa778f7`
        },
        data: fd,
        processData: false,
        contentType: false
      })
       .then(function(result) {
        imgLink = result.data.link;
        console.log(result.data.link);
}).then(function(d){

      // send post to database (with returned imgur url)
      $.ajax({
        url: `/profile/${vm.user._id}/photo`,
        type: "patch",
        dataType: 'json',
        data: {

          image: imgLink
        }
      })
    })
     }





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

     vm.checkBox = {
      value1:true

    }


//testing
// vm.trace = function(){
//   console.log("looking checkbox", vm.user.disability)
// }
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

  $http.patch(`/profile/${vm.user._id}`, request).success(function(data){
    console.log("success", data);
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

  $http.post(`/profile/${vm.user._id}/disability`, request).success(function(){
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
    $http.patch(`/profile/disability/${vm.user._id}`, request).success(function(response){
      console.log(response)
    }).error(function(error){
      console.log(error);
    })
  }
  else {
    console.log("Not disabled user");
  }
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
    $http.post(`/profile/${vm.user._id}/facility`, request).success(function(response){
      console.log("success", response)
    }).error(function(error){
      console.log(error);
    });
  }
  else {
    console.log("Not disabled user");
  }



}

vm.currentFacilityId = ''
vm.currentFacility = {}

vm.changeFacility = function () {
  vm.currentFacility = vm.user.facilities.filter(function (facility) {
    return facility._id == vm.currentFacilityId
  })[0]
  console.log(vm.currentFacility)
}

vm.updatefacility = function (){
  if(vm.user.disability == true) {
    var request = {
      userId: vm.user._id,
      name: vm.currentFacility.name,
      address: vm.currentFacility.address,
      city: vm.currentFacility.city,
      state:vm.currentFacility.state,
      zip: vm.currentFacility.zip,
      description: vm.currentFacility.description,
      phone: vm.currentFacility.phone,
      email: vm.currentFacility.email
    }
    $http.post(`/profile/${vm.user._id}/facility/${vm.currentFacilityId}`, request).success(function(response){
      console.log("success", response)
    }).error(function(error){
      console.log(error);

    })
  }


}




vm.deletefacility = function (){
  $http.delete(`/profile/${vm.user._id}/facilities/${vm.currentFacility._id}`, request).success(function(){
    console.log("Delete success")
  }).error(function(error){
    console.log(error);
  })

}


}

}());
