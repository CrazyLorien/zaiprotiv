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
				.when('/main/subject/:id', { template:'<subject></subject>'}) 		      
		  	    .otherwise({redirectTo: '/'})}])

	zaiprotiv.component('subjects', __webpack_require__(1))
	zaiprotiv.component('treecontrol', __webpack_require__(2))
	zaiprotiv.component('treeitem', __webpack_require__(3))
	zaiprotiv.component('subject', __webpack_require__(4))

	module.exports = zaiprotiv;



/***/ },
/* 1 */
/***/ function(module, exports) {

	var subjects = {
	   templateUrl:"../partial-views/subjects.html",
	   controller: function () {

	       this.treedata = [
	        { "roleName" : "User", "id" : "role1", "children" : [
	          { "roleName" : "subUser1", "id" : "role11", "children" : [] },
	          { "roleName" : "subUser2", "id" : "role12", "children" : [
	            { "roleName" : "subUser2-1", "id" : "role121", "children" : [
	              { "roleName" : "subUser2-1-1", "id" : "role1211", "children" : [] },
	              { "roleName" : "subUser2-1-2", "id" : "role1212", "children" : [] }
	            ]}
	          ]}
	        ]},

	        { "roleName" : "Admin", "id" : "role2", "children" : []},

	        { "roleName" : "Guest", "id" : "role3", "children" : [] }
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
	                controller: function($location) {
	                    this.nodeChildren = this.nodeChildren || 'children';
	                    this.expandedNodes = {};

	                    this.headClass = function(node) {
	                        if (node[this.nodeChildren].length && !this.expandedNodes[node.id])
	                            return "tree-collapsed";
	                        else if (node[this.nodeChildren].length && this.expandedNodes[node.id])
	                            return "tree-expanded";
	                        else
	                            return "tree-normal"
	                    };

	                    this.nodeExpanded = function() {
	                        return this.expandedNodes[this.$id];
	                    };

	                    this.selectNodeHead = function(node ) {                   
	                        this.expandedNodes[node.id] = !this.expandedNodes[node.id];
	                    };
	                    var self = this;
	                    this.selectNodeLabel = function( selectedNode, $event ){
	                        $event.stopPropagation();
	                        self.selectedScope = selectedNode.id;
	                        self.selectedNode = selectedNode;
	                        if (self.onSelection)
	                            self.onSelection({node: selectedNode});
	                        if(!selectedNode[self.nodeChildren].length)
	                            $location.path("/main/subject/" + selectedNode.id)
	                        
	                    };

	                    this.selectedClass = function(node) {
	                        return (node.id == self.selectedScope) ? "tree-selected" : "";
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

	        
	        
	 

/***/ },
/* 4 */
/***/ function(module, exports) {

	var subject = {
	   templateUrl:"../partial-views/subject.html",
	   controller: function () {  
	   }
	}

	module.exports = subject;

/***/ }
/******/ ]);