var zaiprotiv = window.zaiprotiv = angular.module('zaiprotiv', ['ngRoute', 'ngMessages', "autocomplete"]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {template: '<login></login>'})
        .when('/main', {templateUrl: './partial-views/main.html'})
        .when('/main/subject/:id', {template: '<subject></subject>'})
        .when('/results', { template : '<results></results>'})
        .otherwise({redirectTo: '/'})
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
var autocomplete = require('./autocomplete')

module.exports = zaiprotiv;

