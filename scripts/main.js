var zaiprotiv = window.zaiprotiv = angular.module('zaiprotiv', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
	        $routeProvider
	  	    .when('/', {templateUrl: './partial-views/login.html'})
	  	    .when('/main', {templateUrl: './partial-views/main.html'})
			.when('/main/subject/:id', { template:'<subject></subject>'}) 		      
	  	    .otherwise({redirectTo: '/'})}])

zaiprotiv.component('subjects', require('./subject/subjects'))
zaiprotiv.component('treecontrol', require('./treecontrol/treecontrol'))
zaiprotiv.component('treeitem', require('./treecontrol/treeitem'))
zaiprotiv.component('subject', require('./subject/subject'))
zaiprotiv.service('selectedService', require('./services/selectedService'))
zaiprotiv.component('arguments', require('./arguments/arguments'))
zaiprotiv.component('argument', require('./arguments/argument'))

module.exports = zaiprotiv;

