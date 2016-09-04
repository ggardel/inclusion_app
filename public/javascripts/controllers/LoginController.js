angular.module("inclusion_app")
	.controller("LoginController", LoginController)

LoginController.$inject = ['$http', '$state']

function LoginController ($http, $state) {
	var self = this

	this.loginUsername = ''
	this.loginPassword = ''
	this.registerUsername = ''
	this.registerPassword = ''
	this.errors = ''

	this.login = function () {
		$http.post("/login", {
			username: self.loginUsername,
			password: self.loginPassword
		}).then(function (response) {
			if (response.data.error) {
				self.errors = response.data.error
			}
			else if (response.data.token) {
				localStorage.token = response.data.token
				$state.go('user')
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
				$state.go('user')
			}
		})
	}
}
