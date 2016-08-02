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

	zaiprotiv.component('subjects', __webpack_require__(5))
	zaiprotiv.component('treecontrol', __webpack_require__(6))
	zaiprotiv.component('treeitem', __webpack_require__(7))
	zaiprotiv.component('subject', __webpack_require__(8))
	zaiprotiv.service('selectedService', __webpack_require__(9))
	zaiprotiv.component('arguments', __webpack_require__(10))
	zaiprotiv.component('argument', __webpack_require__(11))

	module.exports = zaiprotiv;



/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	var subjects = {
	   templateUrl:"../partial-views/subjects.html",
	   controller: function () {

	       this.treedata = [
	        { "Category" : "Selection",  "id" : "role1", "children" : [
	          { "Category" : "car selection", "id" : "role11", "children" : [] },
	          { "Category" : "cell phone selection", "id" : "role12", "children" : [
	            { "Category" : "iPhone", "id" : "role121", "children" : [
	              { "subject" : "iPhone3", "id" : "role1211", "children" : [] , arguments : { pro : ["Stive Jobs", "It is cool", "You'll have a community friendly dudes", "All other are stuff"], cons : ["It is too expensive", "It is about pop culture", "My girl have one"]}},
	              { "subject" : "iPhone4", "id" : "role1212", "children" : [] }
	            ]}
	          ]}
	        ]},

	        { "subject" : "Woman", "id" : "role2", "children" : []},

	        { "subject" : "Woodman", "id" : "role3", "children" : [] }
	      ];
	   }
	}

	module.exports = subjects;



/***/ },
/* 6 */
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
	                controller: function($location, selectedService) {
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
	                        if(!selectedNode[self.nodeChildren].length){
	                            selectedService.setSelected(selectedNode);
	                            $location.path("/main/subject/" + selectedNode.id)
	                        }
	                        
	                    };

	                    this.selectedClass = function(node) {
	                        return (node.id == self.selectedScope) ? "tree-selected" : "";
	                    };
	                 
	                }
	            };
	            


/***/ },
/* 7 */
/***/ function(module, exports) {

	//for now it is jusst for ability extension our tree control
	module.exports = {
	                bindings: {
	                    nodes: '=node'
	                },
	                template: '<div>{{$ctrl.nodes.Category || $ctrl.nodes.subject}}</div>',
	                controller : function () {}
	            }

	        
	        
	 

/***/ },
/* 8 */
/***/ function(module, exports) {

	var subject = {
	   templateUrl:"../partial-views/subject.html",
	   controller: function (selectedService) { 
	       this.subj = selectedService.getSelected();

	       this.proCons;
	       this.positive = () => {
	         this.proCons = true;
	       }

	       this.negative = () => {
	           this.proCons = false;
	       }

	       this.addArg = () => {
	          this.proCons ? this.subj.pro.push(this.requestData) : this.subj.cons.push(this.requestData);
	       }

	    
	   }
	}

	module.exports = subject;

/***/ },
/* 9 */
/***/ function(module, exports) {

	var selectedService = function () {
	    var selectedItem;

	    this.setSelected = function (item) {
	        selectedItem = item;
	    }

	    this.getSelected = function () {
	        return selectedItem;
	    }
	}

	module.exports = selectedService;

/***/ },
/* 10 */
/***/ function(module, exports) {

	var arguments = {
	    bindings : {
	        args: "="
	    },
	    templateUrl: "../../partial-views/arguments.html",
	}

	module.exports = arguments;

/***/ },
/* 11 */
/***/ function(module, exports) {

	var argument = {
	    bindings : {
	        data: "="
	    },
	    templateUrl: "../../partial-views/argument.html",
	}

	module.exports = argument;

/***/ }
/******/ ]);