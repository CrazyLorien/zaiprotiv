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

	var zaiprotiv = window.zaiprotiv = angular.module('zaiprotiv', ['ngRoute', 'ngMessages', "autocomplete"]).config(['$routeProvider', function ($routeProvider) {
	    $routeProvider
	        .when('/', {template: '<login></login>'})
	        .when('/main', {templateUrl: './partial-views/main.html'})
	        .when('/main/subject/:id', {template: '<subject></subject>'})
	        .otherwise({redirectTo: '/'})
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

	var autocomplete = __webpack_require__(11)

	module.exports = zaiprotiv;



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(2)

	var subjects = {
	   templateUrl:"../partial-views/subjects.html",
	   controller: function (selectedService,dataService,$location) {

	       var data =  dataService.getAll(config.url)

	       data.then( (response) => {
	           this.searchdata =  response.data;
	       })

	       this.searchParam = "";

	       this.getSubject = (item) => {
	          selectedService.setSelected(item);
	          $location.path("/main/subject/" + item.id)
	       }

	   }
	}

	module.exports = subjects;



/***/ },
/* 2 */
/***/ function(module, exports) {

	var config = {
	    url : "content.json"
	}

	module.exports = config;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var login = {
	    templateUrl: "../partial-views/login.html",
	    controller: function () {

	        this.inputType = 'password';

	        this.login = () => {

	        };

	        this.showPasswordValue = ()=> {

	            if (this.inputType == 'password')
	                this.inputType = 'text';
	            else
	                this.inputType = 'password';
	        };
	    }
	};

	module.exports = login;

/***/ },
/* 4 */
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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(2)

	var subject = {
	   templateUrl:"../partial-views/subject.html",
	   controller: function (selectedService, dataService, $timeout) {
	       this.subj = [] ; 
	       dataService.getById(config.url, selectedService.getSelected().id).then( (response) => {
	          var temp = response.data.filter(function(rw){ return rw.id == selectedService.getSelected().id });
	          this.subj = temp[0];
	       })
	      
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
/* 7 */
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
/* 8 */
/***/ function(module, exports) {

	var arguments = {
	    bindings : {
	        args: "="
	    },
	    templateUrl: "../../partial-views/arguments.html",
	}

	module.exports = arguments;

/***/ },
/* 9 */
/***/ function(module, exports) {

	var argument = {
	    bindings : {
	        data: "="
	    },
	    templateUrl: "../../partial-views/argument.html",
	}

	module.exports = argument;

/***/ },
/* 10 */
/***/ function(module, exports) {

	var dataService = function ($http) {

	    this.save = function (url, type, item) {
	        return  $http({url : url, data : item, method: type });
	    }

	    this.getAll = function (url) {
	        return $http({ url : url, method : "GET"})
	    }

	    this.getById = function (url, id) {
	        return $http({ url: url , method: "GET" })
	    }


	}

	module.exports = dataService;

/***/ },
/* 11 */
/***/ function(module, exports) {

	var app = angular.module('autocomplete', []);

	app.directive('autocomplete', function() {
	  var index = -1;

	  return {
	    restrict: 'E',
	    scope: {
	      searchParam: '=ngModel',
	      suggestions: '=data',
	      onType: '=onType',
	      onSelect: '=onSelect',
	      autocompleteRequired: '='
	    },
	    controller: ['$scope', function($scope){
	      // the index of the suggestions that's currently selected
	      $scope.selectedIndex = -1;

	      $scope.initLock = true;

	      // set new index
	      $scope.setIndex = function(i){
	        $scope.selectedIndex = parseInt(i);
	      };

	      this.setIndex = function(i){
	        $scope.setIndex(i);
	        $scope.$apply();
	      };

	      $scope.getIndex = function(i){
	        return $scope.selectedIndex;
	      };

	      // watches if the parameter filter should be changed
	      var watching = true;

	      // autocompleting drop down on/off
	      $scope.completing = false;

	      // starts autocompleting on typing in something
	      $scope.$watch('searchParam', function(newValue, oldValue){

	        if (oldValue === newValue || (!oldValue && $scope.initLock)) {
	          return;
	        }

	        if(watching && typeof $scope.searchParam !== 'undefined' && $scope.searchParam !== null) {
	          $scope.completing = true;
	          $scope.searchFilter = $scope.searchParam;
	          $scope.selectedIndex = -1;
	        }

	        // function thats passed to on-type attribute gets executed
	        if($scope.onType)
	          $scope.onType($scope.searchParam);
	      });

	      // for hovering over suggestions
	      this.preSelect = function(suggestion){

	        watching = false;

	        // this line determines if it is shown
	        // in the input field before it's selected:
	        //$scope.searchParam = suggestion;

	        $scope.$apply();
	        watching = true;

	      };

	      $scope.preSelect = this.preSelect;

	      this.preSelectOff = function(){
	        watching = true;
	      };

	      $scope.preSelectOff = this.preSelectOff;

	      // selecting a suggestion with RIGHT ARROW or ENTER
	      $scope.select = function(suggestion){
	        if(suggestion){
	          $scope.searchParam = suggestion;
	          $scope.searchFilter = suggestion;
	          if($scope.onSelect)
	            $scope.onSelect(suggestion);
	        }
	        watching = false;
	        $scope.completing = false;
	        setTimeout(function(){watching = true;},1000);
	        $scope.setIndex(-1);
	      };


	    }],
	    link: function(scope, element, attrs){

	      setTimeout(function() {
	        scope.initLock = false;
	        scope.$apply();
	      }, 250);

	      var attr = '';

	      // Default atts
	      scope.attrs = {
	        "placeholder": "start typing...",
	        "class": "",
	        "id": "",
	        "inputclass": "",
	        "inputid": ""
	      };

	      for (var a in attrs) {
	        attr = a.replace('attr', '').toLowerCase();
	        // add attribute overriding defaults
	        // and preventing duplication
	        if (a.indexOf('attr') === 0) {
	          scope.attrs[attr] = attrs[a];
	        }
	      }

	      if (attrs.clickActivation) {
	        element[0].onclick = function(e){
	          if(!scope.searchParam){
	            setTimeout(function() {
	              scope.completing = true;
	              scope.$apply();
	            }, 200);
	          }
	        };
	      }

	      var key = {left: 37, up: 38, right: 39, down: 40 , enter: 13, esc: 27, tab: 9};

	      document.addEventListener("keydown", function(e){
	        var keycode = e.keyCode || e.which;

	        switch (keycode){
	          case key.esc:
	            // disable suggestions on escape
	            scope.select();
	            scope.setIndex(-1);
	            scope.$apply();
	            e.preventDefault();
	        }
	      }, true);

	      document.addEventListener("blur", function(e){
	        // disable suggestions on blur
	        // we do a timeout to prevent hiding it before a click event is registered
	        setTimeout(function() {
	          scope.select();
	          scope.setIndex(-1);
	          scope.$apply();
	        }, 150);
	      }, true);

	      element[0].addEventListener("keydown",function (e){
	        var keycode = e.keyCode || e.which;

	        var l = angular.element(this).find('li').length;

	        // this allows submitting forms by pressing Enter in the autocompleted field
	        if(!scope.completing || l == 0) return;

	        // implementation of the up and down movement in the list of suggestions
	        switch (keycode){
	          case key.up:

	            index = scope.getIndex()-1;
	            if(index<-1){
	              index = l-1;
	            } else if (index >= l ){
	              index = -1;
	              scope.setIndex(index);
	              scope.preSelectOff();
	              break;
	            }
	            scope.setIndex(index);

	            if(index!==-1)
	              scope.preSelect(angular.element(angular.element(this).find('li')[index]).text());

	            scope.$apply();

	            break;
	          case key.down:
	            index = scope.getIndex()+1;
	            if(index<-1){
	              index = l-1;
	            } else if (index >= l ){
	              index = -1;
	              scope.setIndex(index);
	              scope.preSelectOff();
	              scope.$apply();
	              break;
	            }
	            scope.setIndex(index);

	            if(index!==-1)
	              scope.preSelect(angular.element(angular.element(this).find('li')[index]).text());

	            break;
	          case key.left:
	            break;
	          case key.right:
	          case key.enter:
	          case key.tab:

	            index = scope.getIndex();
	            // scope.preSelectOff();
	            if(index !== -1) {
	              scope.select(angular.element(angular.element(this).find('li')[index]).text());
	              if(keycode == key.enter) {
	                e.preventDefault();
	              }
	            } else {
	              if(keycode == key.enter) {
	                scope.select();
	              }
	            }
	            scope.setIndex(-1);
	            scope.$apply();

	            break;
	          case key.esc:
	            // disable suggestions on escape
	            scope.select();
	            scope.setIndex(-1);
	            scope.$apply();
	            e.preventDefault();
	            break;
	          default:
	            return;
	        }

	      });
	    },
	    template: '\
	        <div class="autocomplete {{ attrs.class }}" id="{{ attrs.id }}">\
	          <input\
	            type="text"\
	            ng-model="searchParam"\
	            placeholder="{{ attrs.placeholder }}"\
	            class="{{ attrs.inputclass }}"\
	            id="{{ attrs.inputid }}"\
	            ng-required="{{ autocompleteRequired }}" />\
	            \<i class="fa fa-search" ></i>\
	          <ul ng-show="completing && (suggestions | filter:searchFilter).length > 0">\
	            <li\
	              suggestion\
	              ng-repeat="suggestion in suggestions | filter:searchFilter | orderBy:\'toString()\' track by $index"\
	              index="{{ $index }}"\
	              val="{{ suggestion.subject }}"\
	              ng-class="{ active: ($index === selectedIndex) }"\
	              ng-click="select(suggestion)"\
	              ng-bind-html="suggestion.subject | highlight:searchParam"></li>\
	          </ul>\
	        </div>'
	  };
	});

	app.filter('highlight', ['$sce', function ($sce) {
	  return function (input, searchParam) {
	    if (typeof input === 'function') return '';
	    if (searchParam) {
	      var words = '(' +
	            searchParam.split(/\ /).join(' |') + '|' +
	            searchParam.split(/\ /).join('|') +
	          ')',
	          exp = new RegExp(words, 'gi');
	      if (words.length) {
	        input = input.replace(exp, "<span class=\"highlight\">$1</span>");
	      }
	    }
	    return $sce.trustAsHtml(input);
	  };
	}]);

	app.directive('suggestion', function(){
	  return {
	    restrict: 'A',
	    require: '^autocomplete', // ^look for controller on parents element
	    link: function(scope, element, attrs, autoCtrl){
	      element.bind('mouseenter', function() {
	        autoCtrl.preSelect(attrs.val);
	        autoCtrl.setIndex(attrs.index);
	      });

	      element.bind('mouseleave', function() {
	        autoCtrl.preSelectOff();
	      });
	    }
	  };
	});

/***/ }
/******/ ]);