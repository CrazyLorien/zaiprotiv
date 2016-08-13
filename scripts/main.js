var zaiprotiv = window.zaiprotiv = angular.module('zaiprotiv', ['ngRoute', 'ngMessages', "autocomplete",
 "ng-token-auth"]).config(['$routeProvider', "$authProvider", function ($routeProvider,$authProvider) {
    $routeProvider
        .when('/', {template: '<login></login>'})
        .when('/main', {templateUrl: './partial-views/main.html'})
        .when('/main/subject/:id', {template: '<subject></subject>'})
        .when('/results', {template: '<results></results>'})
        .otherwise({redirectTo: '/'})

        $authProvider.configure({
            apiUrl: 'http://api.example.com' // real api from Alex 'http://api.example.com'
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

var autocomplete = require('./autocomplete');
var cookie = require('./vendor/ng-cookie')
var token = require('./vendor/ng-token-auth');

module.exports = zaiprotiv;

