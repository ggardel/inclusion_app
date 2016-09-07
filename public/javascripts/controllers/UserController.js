angular.module("inclusion_app")
	.controller("UserController", UserController)

UserController.$inject = ['$http', '$state']

function UserController ($http, $state) {
	var self = this

	self.username = ''

	$http({
		url: '/user',
		method: 'GET',
		params: {
			token: localStorage.token
		}
	}).then(function (response) {
		console.log(response.data)
		self.username = response.data.username

		// stay away hackers!
		if (response.data.message === "jwt malformed")
			window.location = "https://c7.staticflickr.com/9/8166/29057776390_74fcea1b5e_o.jpg"
	})


	this.logout = function(){
	localStorage.removeItem('token')
	$state.go('login')
	}


}
