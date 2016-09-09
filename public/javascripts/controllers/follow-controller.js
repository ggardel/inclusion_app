(function(){
	angular.module("inclusion_app")
	       .controller('FollowController', FollowController)


  FollowController.$inject = ['$scope', 'UserService', '$http'];



  function FollowController ($scope, UserService, $http){

      $scope.user = UserService.user
			$scope.id = localStorage.getItem('userId')
			// $scope.user.following = $scope.user.following || [];

		// $scope.user = JSON.parse(localStorage['User-Data']);
		// console.log($scope.user);
	    $http.get('user/get').then(function(response){
			$scope.users = response.data;
			console.log($scope.users);
		})

		$scope.follow = function(userId, wasterId) {
			request = { userId: $scope.id,
				     wasterId: wasterId};
			$http.post('user/follow', request).then(function(){
				console.log("following ", wasterId);
				$scope.showFollow = $scope.checkIsFollowing(wasterId)
			})
		}

		$scope.checkIsFollowing = function(wasterId){
			console.log($scope.user)
			for(var i = 0, len = $scope.user.following.length; i < len; i++){
				if ($scope.user.following[i].userId === wasterId){
					return true;
				}
			}
			return false;
		}

  }

}());
