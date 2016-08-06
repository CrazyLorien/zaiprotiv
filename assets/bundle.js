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
	zaiprotiv.service('selectedService', __webpack_require__(5))
	zaiprotiv.component('arguments', __webpack_require__(6))
	zaiprotiv.component('argument', __webpack_require__(7))
	zaiprotiv.service('dataService', __webpack_require__(8))

	module.exports = zaiprotiv;



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(9)

	var subjects = {
	   templateUrl:"../partial-views/subjects.html",
	   controller: function (dataService) {

	       var data = dataService.getAll(config.url)

	       data.then( (response) => {
	           this.treedata = response.data;
	       })

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
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(9)

	var subject = {
	   templateUrl:"../partial-views/subject.html",
	   controller: function (selectedService, dataService, $timeout) { 
	       this.subj = selectedService.getSelected();

	       this.proCons;
	       this.positive = () => {
	         this.proCons = true;
	       }

	       this.negative = () => {
	           this.proCons = false;
	       }

	       this.addArg = () => {
	          this.proCons ? this.subj.arguments.pro.push(this.requestData) : this.subj.arguments.cons.push(this.requestData);
	          dataService.save( config.url,  "POST", this.subj ).then( (response) => {
	              this.createdSuccess = true;
	              $timeout(5000, () => {
	                  this.createdSuccess = false;
	              })
	          }, () => {
	              this.createdFailed = true;
	              $timeout(5000, () => {
	                  this.createdFailed = false;
	              })
	          } )
	       }



	    
	   }
	}

	module.exports = subject;

/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports) {

	var arguments = {
	    bindings : {
	        args: "="
	    },
	    templateUrl: "../../partial-views/arguments.html",
	}

	module.exports = arguments;

/***/ },
/* 7 */
/***/ function(module, exports) {

	var argument = {
	    bindings : {
	        data: "="
	    },
	    templateUrl: "../../partial-views/argument.html",
	}

	module.exports = argument;

/***/ },
/* 8 */
/***/ function(module, exports) {

	var dataService = function ($http) {

	    this.save = function (url, type, item) {
	        return  $http({url : url, data : item, method: type });
	    }

	    this.getAll = function (url) {
	        return $http({ url : url, method : "GET"})
	    }

	    this.getById = function (url, id) {
	        return $http({ url: url + '/' + id, method: "GET", params : { id : id} })
	    }


	}

	module.exports = dataService;

/***/ },
/* 9 */
/***/ function(module, exports) {

	var config = {
	    url : "content.json"
	}

	module.exports = config;

/***/ }
/******/ ]);