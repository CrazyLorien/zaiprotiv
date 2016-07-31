var main =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var zaiprotiv = window.zaiprotiv = angular.module('zaiprotiv', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
		        $routeProvider
		  	    .when('/', {templateUrl: './partial-views/login.html'})
		  	    .when('/main', {templateUrl: './partial-views/main.html'})	  	 		      
		  	    .otherwise({redirectTo: '/'})}])

	zaiprotiv.component('subjects', __webpack_require__(1))
	zaiprotiv.component('treecontrol', __webpack_require__(2))
	zaiprotiv.component('treeitem', __webpack_require__(3))

	module.exports = zaiprotiv;



/***/ },
/* 1 */
/***/ function(module, exports) {

	var subjects = {
	   templateUrl:"../partial-views/subject.html",
	   controller: function () {
	       this.showSelected = function (node) {
	           console.log("azaza");
	       }

	       this.treedata = [
	        { "roleName" : "User", "roleId" : "role1", "children" : [
	          { "roleName" : "subUser1", "roleId" : "role11", "children" : null },
	          { "roleName" : "subUser2", "roleId" : "role12", "children" : [
	            { "roleName" : "subUser2-1", "roleId" : "role121", "children" : [
	              { "roleName" : "subUser2-1-1", "roleId" : "role1211", "children" : null },
	              { "roleName" : "subUser2-1-2", "roleId" : "role1212", "children" : null }
	            ]}
	          ]}
	        ]},

	        { "roleName" : "Admin", "roleId" : "role2", "children" : null},

	        { "roleName" : "Guest", "roleId" : "role3", "children" : null }
	      ];
	   }
	}

	module.exports = subjects;



/***/ },
/* 2 */
/***/ function(module, exports) {

	
	 module.exports =  {
	                restrict: 'E',
	                transclude: true,
	                bindings: {
	                    treeModel: "=",
	                    selectedNode: "=",
	                    onSelection: "&",
	                    nodeChildren: "@"
	                },
	                templateUrl: "../../partial-views/treeControlTemplate.html",  
	                controller: function() {
	                    this.nodeChildren = this.nodeChildren || 'children';
	                    this.expandedNodes = {};

	                    this.headClass = function(node) {
	                        if (node[this.nodeChildren].length && !this.expandedNodes[this.$id])
	                            return "tree-collapsed";
	                        else if (node[this.nodeChildren].length && this.expandedNodes[this.$id])
	                            return "tree-expanded";
	                        else
	                            return "tree-normal"
	                    };

	                    this.nodeExpanded = function() {
	                        return this.expandedNodes[this.$id];
	                    };

	                    this.selectNodeHead = function() {
	                        this.expandedNodes[this.$id] = !this.expandedNodes[this.$id];
	                    };

	                    this.selectNodeLabel = function( selectedNode ){
	                        this.selectedScope = this.$id;
	                        this.selectedNode = selectedNode;
	                        if (this.onSelection)
	                            this.onSelection({node: selectedNode});
	                    };

	                    this.selectedClass = function() {
	                        return (this.$id == this.selectedScope)?"tree-selected":"";
	                    };
	                 
	                }
	            };
	            


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {
	                bindings: {
	                    nodes: '=node'
	                },
	                template: '<div>{{$ctrl.nodes.roleName}}</div>',
	                controller : function () {}
	            }

	        
	        
	 

/***/ }
/******/ ]);