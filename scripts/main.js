var zaiprotiv = window.zaiprotiv = angular.module('zaiprotiv', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
	        $routeProvider
	  	    .when('/', {templateUrl: './partial-views/login.html'})
	  	    .when('/main', {templateUrl: './partial-views/main.html'})	  	 		      
	  	    .otherwise({redirectTo: '/'})}])

zaiprotiv.component('subjects', require('./subjects'))
zaiprotiv.component('treecontrol', require('./vendor/treecontrol'))
zaiprotiv.component('treeitem', require('./vendor/treeitem'))

module.exports = zaiprotiv;

