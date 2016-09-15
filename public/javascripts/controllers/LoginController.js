angular.module("inclusion_app")
	.controller("LoginController", LoginController)

LoginController.$inject = ['$http', '$state', 'UserService' ]

function LoginController ($http, $state, UserService) {
	var self = this
  this.userService = UserService
	this.loginUsername = ''
	this.loginPassword = ''
	this.registerUsername = ''
	this.registerPassword = ''
	this.errors = ''
  this.loggedIn = Boolean

	this.login = function () {
		$http.post("/login", {
			username: self.loginUsername,
			password: self.loginPassword
		}).then(function (response) {
			if (response.data.error) {
				self.errors = response.data.error
			}
			else if (response.data.token) {
				console.log("user login response -->", response.data)
				localStorage.token = response.data.token;
				localStorage.userId = response.data.user._id
				this.loggedIn = true;
				$state.go('user')
			}
			else {
				this.loggedIn = false
			}
		})
	}





	this.register = function () {
		$http.post("/register", {
			username: self.registerUsername,
			password: self.registerPassword
		}).then(function (response) {
			if (response.data.error) {
				self.errors = response.data.error
			}
			else if (response.data.token) {
				localStorage.token = response.data.token
				$state.go('profile')
			}
		})
	}
}
