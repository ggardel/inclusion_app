angular.module("inclusion_app")
	.controller("UserController", UserController)

UserController.$inject = ['$http', '$state', 'UserService']

function UserController ($http, $state, UserService ) {
	var self = this
  self.userService = UserService;
	self.user = UserService.user;


	self.login = function (){
	self.userService.loginRequest = true;
	}

	self.register = function (){
	self.userService.registerRequest = true;
	}




	self.name = '',
	self.username = '',
	self.city = '',
	self.state = '',
	self.age = '',
	self.email = '',
	self.image = '',
	self.disability = Boolean,
	self.preferred_activity = '',
	self.facilities = '',
	self.bio = '',
	self.following = '',
	self.follower = '',


	$http({
		url: '/user',
		method: 'GET',
		params: {
			token: localStorage.token
		}
	}).then(function (response) {
		console.log(response.data)
		self.username = response.data.username
		self.name = response.data.name,
		self.city = response.data.city,
		self.state = response.data.state,
		self.age = response.data.age,
		self.email = response.data.email,
		self.image = response.data.image,
		self.preferred_activity = response.data.preferred_activity,
		self.facilities = response.data.facilities,
		self.bio = response.data.bio,
		self.following = response.data.following,
		self.follower = response.data.follower

		// stay away hackers!
		if (response.data.message === "jwt malformed")
			window.location = "https://c7.staticflickr.com/9/8166/29057776390_74fcea1b5e_o.jpg"
	})




	this.logout = function(){
	localStorage.removeItem('token')
	$state.go('login')
	}


}
