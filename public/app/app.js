'use strict';

var app = angular.module('HackersMapApp', ['ngRoute', 'ngAnimate']);
app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/login', {
		templateUrl: 'templates/login.html',
		controller: 'LoginController',
		replace: true
	})
	.when('/register', {
		templateUrl: 'templates/register.html',
		controller: 'RegisterController',
		replace: true
	})
	.when('/about', {
		templateUrl: 'templates/about.html',
		controller: 'AboutController',
		replace: true
	})
	.when('/event/:event_id', {
		templateUrl: 'templates/event.html',
		controller: 'EventMapController',
		replace: true
	})
	.otherwise({
    	redirectTo: '/error',
		replace: true
	})
}]);
