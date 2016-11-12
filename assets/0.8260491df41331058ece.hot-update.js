webpackHotUpdatemain(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var zaiprotiv = window.zaiprotiv = angular.module('zaiprotiv', ['ngRoute', 'ngMessages', "autocomplete","ng-token-auth", 'ui-notification']).config(['$routeProvider', "$authProvider", "NotificationProvider", function ($routeProvider,$authProvider, NotificationProvider) {
	    $routeProvider
	        .when('/', {template: '<login></login>'})
	        .when('/main', {templateUrl: './partial-views/main.html'})
	        .when('/main/addsubj/', {template: '<subject></subject>'})
	        .when('/main/subject/:id', {template: '<subject></subject>'})
	        .when('/results', {template: '<results></results>'})
	        .otherwise({redirectTo: '/'})

	        $authProvider.configure({
	            apiUrl: 'http://localhost:3000/v1' 
	        });

	         NotificationProvider.setOptions({
	            delay: 10000,
	            startTop: 20,
	            startRight: 10,
	            verticalSpacing: 20,
	            horizontalSpacing: 20,
	            positionX: 'left',
	            positionY: 'bottom'
	        });
	}]);

	zaiprotiv.component('subjects', __webpack_require__(1));
	zaiprotiv.component('login', __webpack_require__(3));
	zaiprotiv.component('treecontrol', __webpack_require__(4));
	zaiprotiv.component('treeitem', __webpack_require__(5));
	zaiprotiv.component('subject', __webpack_require__(6));
	zaiprotiv.service('selectedService', __webpack_require__(7));
	zaiprotiv.component('arguments', __webpack_require__(8));
	zaiprotiv.component('argument', __webpack_require__(9));
	zaiprotiv.service('dataService', __webpack_require__(10));
	zaiprotiv.component('results', __webpack_require__(11));
	zaiprotiv.component('addsubject', __webpack_require__(12));

	var autocomplete = __webpack_require__(13);
	var cookie = __webpack_require__(14)
	var token = __webpack_require__(15);
	var notifications = __webpack_require__(16);

	module.exports = zaiprotiv;



/***/ }
])