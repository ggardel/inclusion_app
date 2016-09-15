var app = angular.module("inclusion_app", ['ui.router'])

app.config(function ($stateProvider, $urlRouterProvider) {

 	$urlRouterProvider.otherwise('/login')

	$stateProvider
		.state('login', {
			url: "/login",
			controller: "LoginController as login",
			templateUrl: "/partials/login.html",
			data: {
				requireLogout: true
			}
		})
		.state("user", {
			url: "/user",
			controller: "UserController as user",
			templateUrl: "/partials/user.html",
			data: {
				requireLogin: true
			}
		})
    .state("profile",{
      url:"/profile",
      controller:"ProfileController as profile",
      templateUrl: "/partials/profile.html",
      data: {
						requireLogin: true
					}
    })
    .state('main', {
      url: "/",
      controller: "MainController",
      templateUrl: "/partials/main.html",
      data: {
						requireLogin: true
					}
      })
      .state('follow', {
				url: "/follow-users",
        controller: "FollowController",
				templateUrl: "partials/follow.html",
        data: {
  						requireLogin: true
  					}
			})

})


// state change interceptor
app.run(function ($rootScope, $state) {

	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
		// Case 1: Access requireLogin page without a token
		if (toState.data.requireLogin && !localStorage.token) {
			event.preventDefault()
			$state.go('login')
		}

		// Case 2: Access a requireLogout page with a token
		else if (toState.data.requireLogout && localStorage.token) {
			event.preventDefault()
			$state.go('user')
		}
		// How to decode token
		// var payload = JSON.parse((atob(localStorage.token.split('.')[1])))
	})
})
