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

zaiprotiv.component('subjects', require('./subject/subjects'));
zaiprotiv.component('login', require('./login/login'));
zaiprotiv.component('treecontrol', require('./treecontrol/treecontrol'));
zaiprotiv.component('treeitem', require('./treecontrol/treeitem'));
zaiprotiv.component('subject', require('./subject/subject'));
zaiprotiv.service('selectedService', require('./services/selectedService'));
zaiprotiv.component('arguments', require('./arguments/arguments'));
zaiprotiv.component('argument', require('./arguments/argument'));
zaiprotiv.service('dataService', require('./services/dataService'));
zaiprotiv.component('results', require('./results'));
zaiprotiv.component('addsubject', require('./addsubject/addsubject'));

var autocomplete = require('./autocomplete');
var cookie = require('./vendor/ng-cookie')
var token = require('./vendor/ng-token-auth');
var notifications = require('./vendor/angular-ui-notification');


module.exports = zaiprotiv;

