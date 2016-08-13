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

	var autocomplete = __webpack_require__(12);
	var cookie = __webpack_require__(14)
	var token = __webpack_require__(13);

	module.exports = zaiprotiv;



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(2)

	var subjects = {
	    templateUrl: "../partial-views/subjects.html",
	    controller: function (selectedService, dataService, $location) {


	       var data =  dataService.getAll(config.urlProd)


	        data.then((response) => {
	            this.searchdata = response.data;
	        });

	       var self = this;
	       this.updateSearch = function () {
	          dataService.getAll(config.urlProd + 'search/'  + self.searchParam).then ( (response) => {
	             self.searchdata =  response.data;
	          })
	       }

	       this.searchParam = "";
	     
	       this.getSubject = (item) => {
	           item.arguments = [];
	           dataService.getAll(config.urlProd + 'subjects/'  + item.id + '/arguments').then ( (response) => {
	             item.arguments.positives = response.data.positives.map((it) => {  
	                 it["isImportant"]  = 'true' ;
	                 return it;
	                 });
	            item.arguments.negatives = response.data.negatives.map((it) => {  
	                 it["isImportant"]  = 'true' ;
	                 return it;
	                 });
	             selectedService.setSelected(item);
	             $location.path("/main/subject/" + item.id)
	          })      
	       }
	  
	 }
	}


	module.exports = subjects;



/***/ },
/* 2 */
/***/ function(module, exports) {

	var config = {
	    url : "content.json", 
	    urlProd : "http://api.zaiprotiv.by/v1/"
	}

	module.exports = config;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var login = {
	    templateUrl: "../partial-views/login.html",
	    controller: function ($auth,$location) {

	        this.inputType = 'password';

	        this.login = () => {
	             $auth.submitLogin(this.loginForm)
	                   .then(function(resp) {
	                       $location.path("/main");
	                       // handle success response
	                    })
	                    .catch(function(resp) {
	                    // handle error response
	                      $location.path("/");
	                    });
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
	                template: '<div>{{$ctrl.nodes.Category || $ctrl.nodes.description}}</div>',
	                controller : function () {}
	            }

	        
	        
	 

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(2)

	var subject = {
	   templateUrl:"../partial-views/subject.html",
	   controller: function (selectedService, dataService, $timeout,$location) {
	       /*this.subj = [] ; 
	       dataService.getById(config.url, selectedService.getSelected().id).then( (response) => {
	          var temp = response.data.filter(function(rw){ return rw.id == selectedService.getSelected().id });
	          this.subj = temp[0];
	       }) */
	       var self = this; 

	       this.subj = selectedService.getSelected();
	       

	       this.addArg = () => {
	          self.argumentStatus ? self.subj.arguments.positives.push({
	                      "title": self.argumentTitle,
	                      "body":  self.argumentBody,
	                      "rang": "27854",
	                      "id": "2",
	                      "image_url": "",
	                       "isImportant" : true
	                      })
	                     : self.subj.arguments.negatives.push({
	                      "title": self.argumentTitle,
	                      "body":  self.argumentBody,
	                      "rang": "27854",
	                      "id": "2",
	                      "image_url": "",
	                       "isImportant" : true
	                    }
	);
	        
	       }


	        this.addArg = () => {
	            this.argumentStatus ? this.subj.arguments.positives.push({
	                "title": self.argumentTitle,
	                "body": self.argumentBody,
	                "rang": "27854",
	                "id": "2",
	                "image_url": "",
	                "isImportant": true
	            })
	                : this.subj.arguments.negatives.push({
	                    "title": self.argumentTitle,
	                    "body": self.argumentBody,
	                    "rang": "27854",
	                    "id": "2",
	                    "image_url": "",
	                    "isImportant": true
	                }
	            );

	        };

	        this.showResult = ()=> {
	            $location.path("/results/");
	        };
	    }
	};

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
	    bindings: {
	        args: "=",
	        hideButtons: "="
	    },
	    templateUrl: "../partial-views/arguments.html",
	    controller: function () {

	    }
	};

	module.exports = arguments;

/***/ },
/* 9 */
/***/ function(module, exports) {

	var argument = {
	    bindings: {
	        args: "=",
	        hideButtons: "="
	    },
	    templateUrl: "../../partial-views/argument.html",
	    controller: function () {
	        this.remove = function (item) {
	            item.isImportant = false;
	        }
	    }
	};

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
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(2);

	var results = {
	    templateUrl: "../partial-views/results.html",
	    controller: function (selectedService, dataService, $timeout) {
	        this.subj = selectedService.getSelected();
	      

	        this.hideButtons = true;

	        this.addPositive = ()=> {

	        };

	        this.addNegative = ()=> {

	        };


	    }
	};

	module.exports = results;

/***/ },
/* 12 */
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
	              val="{{ suggestion.description }}"\
	              ng-class="{ active: ($index === selectedIndex) }"\
	              ng-click="select(suggestion)"\
	              ng-bind-html="suggestion.description | highlight:searchParam"></li>\
	          </ul>\
	        </div>'
	  };
	});

	app.filter('highlight', ['$sce', function ($sce) {
	  return function (input, searchParam) {
	    if (typeof input === 'function' || typeof searchParam === 'object') return '';
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

/***/ },
/* 13 */
/***/ function(module, exports) {

	if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
	  module.exports = 'ng-token-auth';
	}

	angular.module('ng-token-auth', ['ipCookie']).provider('$auth', function() {
	  var configs, defaultConfigName;
	  configs = {
	    "default": {
	      apiUrl: '/api',
	      signOutUrl: '/auth/sign_out',
	      emailSignInPath: '/auth/sign_in',
	      emailRegistrationPath: '/auth',
	      accountUpdatePath: '/auth',
	      accountDeletePath: '/auth',
	      confirmationSuccessUrl: function() {
	        return window.location.href;
	      },
	      passwordResetPath: '/auth/password',
	      passwordUpdatePath: '/auth/password',
	      passwordResetSuccessUrl: function() {
	        return window.location.href;
	      },
	      tokenValidationPath: '/auth/validate_token',
	      proxyIf: function() {
	        return false;
	      },
	      proxyUrl: '/proxy',
	      validateOnPageLoad: true,
	      omniauthWindowType: 'sameWindow',
	      storage: 'cookies',
	      forceValidateToken: false,
	      tokenFormat: {
	        "access-token": "{{ token }}",
	        "token-type": "Bearer",
	        client: "{{ clientId }}",
	        expiry: "{{ expiry }}",
	        uid: "{{ uid }}"
	      },
	      cookieOps: {
	        path: "/",
	        expires: 9999,
	        expirationUnit: 'days',
	        secure: false
	      },
	      createPopup: function(url) {
	        return window.open(url, '_blank', 'closebuttoncaption=Cancel');
	      },
	      parseExpiry: function(headers) {
	        return (parseInt(headers['expiry'], 10) * 1000) || null;
	      },
	      handleLoginResponse: function(resp) {
	        return resp.data;
	      },
	      handleAccountUpdateResponse: function(resp) {
	        return resp.data;
	      },
	      handleTokenValidationResponse: function(resp) {
	        return resp.data;
	      },
	      authProviderPaths: {
	        github: '/auth/github',
	        facebook: '/auth/facebook',
	        google: '/auth/google_oauth2'
	      }
	    }
	  };
	  defaultConfigName = "default";
	  return {
	    configure: function(params) {
	      var conf, defaults, fullConfig, i, k, label, v, _i, _len;
	      if (params instanceof Array && params.length) {
	        for (i = _i = 0, _len = params.length; _i < _len; i = ++_i) {
	          conf = params[i];
	          label = null;
	          for (k in conf) {
	            v = conf[k];
	            label = k;
	            if (i === 0) {
	              defaultConfigName = label;
	            }
	          }
	          defaults = angular.copy(configs["default"]);
	          fullConfig = {};
	          fullConfig[label] = angular.extend(defaults, conf[label]);
	          angular.extend(configs, fullConfig);
	        }
	        if (defaultConfigName !== "default") {
	          delete configs["default"];
	        }
	      } else if (params instanceof Object) {
	        angular.extend(configs["default"], params);
	      } else {
	        throw "Invalid argument: ng-token-auth config should be an Array or Object.";
	      }
	      return configs;
	    },
	    $get: [
	      '$http', '$q', '$location', 'ipCookie', '$window', '$timeout', '$rootScope', '$interpolate', '$interval', (function(_this) {
	        return function($http, $q, $location, ipCookie, $window, $timeout, $rootScope, $interpolate, $interval) {
	          return {
	            header: null,
	            dfd: null,
	            user: {},
	            mustResetPassword: false,
	            listener: null,
	            initialize: function() {
	              this.initializeListeners();
	              this.cancelOmniauthInAppBrowserListeners = (function() {});
	              return this.addScopeMethods();
	            },
	            initializeListeners: function() {
	              this.listener = angular.bind(this, this.handlePostMessage);
	              if ($window.addEventListener) {
	                return $window.addEventListener("message", this.listener, false);
	              }
	            },
	            cancel: function(reason) {
	              if (this.requestCredentialsPollingTimer != null) {
	                $timeout.cancel(this.requestCredentialsPollingTimer);
	              }
	              this.cancelOmniauthInAppBrowserListeners();
	              if (this.dfd != null) {
	                this.rejectDfd(reason);
	              }
	              return $timeout(((function(_this) {
	                return function() {
	                  return _this.requestCredentialsPollingTimer = null;
	                };
	              })(this)), 0);
	            },
	            destroy: function() {
	              this.cancel();
	              if ($window.removeEventListener) {
	                return $window.removeEventListener("message", this.listener, false);
	              }
	            },
	            handlePostMessage: function(ev) {
	              var error, oauthRegistration;
	              if (ev.data.message === 'deliverCredentials') {
	                delete ev.data.message;
	                oauthRegistration = ev.data.oauth_registration;
	                delete ev.data.oauth_registration;
	                this.handleValidAuth(ev.data, true);
	                $rootScope.$broadcast('auth:login-success', ev.data);
	                if (oauthRegistration) {
	                  $rootScope.$broadcast('auth:oauth-registration', ev.data);
	                }
	              }
	              if (ev.data.message === 'authFailure') {
	                error = {
	                  reason: 'unauthorized',
	                  errors: [ev.data.error]
	                };
	                this.cancel(error);
	                return $rootScope.$broadcast('auth:login-error', error);
	              }
	            },
	            addScopeMethods: function() {
	              $rootScope.user = this.user;
	              $rootScope.authenticate = angular.bind(this, this.authenticate);
	              $rootScope.signOut = angular.bind(this, this.signOut);
	              $rootScope.destroyAccount = angular.bind(this, this.destroyAccount);
	              $rootScope.submitRegistration = angular.bind(this, this.submitRegistration);
	              $rootScope.submitLogin = angular.bind(this, this.submitLogin);
	              $rootScope.requestPasswordReset = angular.bind(this, this.requestPasswordReset);
	              $rootScope.updatePassword = angular.bind(this, this.updatePassword);
	              $rootScope.updateAccount = angular.bind(this, this.updateAccount);
	              if (this.getConfig().validateOnPageLoad) {
	                return this.validateUser({
	                  config: this.getSavedConfig()
	                });
	              }
	            },
	            submitRegistration: function(params, opts) {
	              var successUrl;
	              if (opts == null) {
	                opts = {};
	              }
	              successUrl = this.getResultOrValue(this.getConfig(opts.config).confirmationSuccessUrl);
	              angular.extend(params, {
	                confirm_success_url: successUrl,
	                config_name: this.getCurrentConfigName(opts.config)
	              });
	              return $http.post(this.apiUrl(opts.config) + this.getConfig(opts.config).emailRegistrationPath, params).success(function(resp) {
	                return $rootScope.$broadcast('auth:registration-email-success', params);
	              }).error(function(resp) {
	                return $rootScope.$broadcast('auth:registration-email-error', resp);
	              });
	            },
	            submitLogin: function(params, opts, httpopts) {
	              if (opts == null) {
	                opts = {};
	              }
	              if (httpopts == null) {
	                httpopts = {};
	              }
	              this.initDfd();
	              $http.post(this.apiUrl(opts.config) + this.getConfig(opts.config).emailSignInPath, params, httpopts).success((function(_this) {
	                return function(resp) {
	                  var authData;
	                  _this.setConfigName(opts.config);
	                  authData = _this.getConfig(opts.config).handleLoginResponse(resp, _this);
	                  _this.handleValidAuth(authData);
	                  return $rootScope.$broadcast('auth:login-success', _this.user);
	                };
	              })(this)).error((function(_this) {
	                return function(resp) {
	                  _this.rejectDfd({
	                    reason: 'unauthorized',
	                    errors: ['Invalid credentials']
	                  });
	                  return $rootScope.$broadcast('auth:login-error', resp);
	                };
	              })(this));
	              return this.dfd.promise;
	            },
	            userIsAuthenticated: function() {
	              return this.retrieveData('auth_headers') && this.user.signedIn && !this.tokenHasExpired();
	            },
	            requestPasswordReset: function(params, opts) {
	              var successUrl;
	              if (opts == null) {
	                opts = {};
	              }
	              successUrl = this.getResultOrValue(this.getConfig(opts.config).passwordResetSuccessUrl);
	              params.redirect_url = successUrl;
	              if (opts.config != null) {
	                params.config_name = opts.config;
	              }
	              return $http.post(this.apiUrl(opts.config) + this.getConfig(opts.config).passwordResetPath, params).success(function(resp) {
	                return $rootScope.$broadcast('auth:password-reset-request-success', params);
	              }).error(function(resp) {
	                return $rootScope.$broadcast('auth:password-reset-request-error', resp);
	              });
	            },
	            updatePassword: function(params) {
	              return $http.put(this.apiUrl() + this.getConfig().passwordUpdatePath, params).success((function(_this) {
	                return function(resp) {
	                  $rootScope.$broadcast('auth:password-change-success', resp);
	                  return _this.mustResetPassword = false;
	                };
	              })(this)).error(function(resp) {
	                return $rootScope.$broadcast('auth:password-change-error', resp);
	              });
	            },
	            updateAccount: function(params) {
	              return $http.put(this.apiUrl() + this.getConfig().accountUpdatePath, params).success((function(_this) {
	                return function(resp) {
	                  var curHeaders, key, newHeaders, updateResponse, val, _ref;
	                  updateResponse = _this.getConfig().handleAccountUpdateResponse(resp);
	                  curHeaders = _this.retrieveData('auth_headers');
	                  angular.extend(_this.user, updateResponse);
	                  if (curHeaders) {
	                    newHeaders = {};
	                    _ref = _this.getConfig().tokenFormat;
	                    for (key in _ref) {
	                      val = _ref[key];
	                      if (curHeaders[key] && updateResponse[key]) {
	                        newHeaders[key] = updateResponse[key];
	                      }
	                    }
	                    _this.setAuthHeaders(newHeaders);
	                  }
	                  return $rootScope.$broadcast('auth:account-update-success', resp);
	                };
	              })(this)).error(function(resp) {
	                return $rootScope.$broadcast('auth:account-update-error', resp);
	              });
	            },
	            destroyAccount: function(params) {
	              return $http["delete"](this.apiUrl() + this.getConfig().accountUpdatePath, params).success((function(_this) {
	                return function(resp) {
	                  _this.invalidateTokens();
	                  return $rootScope.$broadcast('auth:account-destroy-success', resp);
	                };
	              })(this)).error(function(resp) {
	                return $rootScope.$broadcast('auth:account-destroy-error', resp);
	              });
	            },
	            authenticate: function(provider, opts) {
	              if (opts == null) {
	                opts = {};
	              }
	              if (this.dfd == null) {
	                this.setConfigName(opts.config);
	                this.initDfd();
	                this.openAuthWindow(provider, opts);
	              }
	              return this.dfd.promise;
	            },
	            setConfigName: function(configName) {
	              if (configName == null) {
	                configName = defaultConfigName;
	              }
	              return this.persistData('currentConfigName', configName, configName);
	            },
	            openAuthWindow: function(provider, opts) {
	              var authUrl, omniauthWindowType;
	              omniauthWindowType = this.getConfig(opts.config).omniauthWindowType;
	              authUrl = this.buildAuthUrl(omniauthWindowType, provider, opts);
	              if (omniauthWindowType === 'newWindow') {
	                return this.requestCredentialsViaPostMessage(this.getConfig().createPopup(authUrl));
	              } else if (omniauthWindowType === 'inAppBrowser') {
	                return this.requestCredentialsViaExecuteScript(this.getConfig().createPopup(authUrl));
	              } else if (omniauthWindowType === 'sameWindow') {
	                return this.visitUrl(authUrl);
	              } else {
	                throw 'Unsupported omniauthWindowType "#{omniauthWindowType}"';
	              }
	            },
	            visitUrl: function(url) {
	              return $window.location.replace(url);
	            },
	            buildAuthUrl: function(omniauthWindowType, provider, opts) {
	              var authUrl, key, params, val;
	              if (opts == null) {
	                opts = {};
	              }
	              authUrl = this.getConfig(opts.config).apiUrl;
	              authUrl += this.getConfig(opts.config).authProviderPaths[provider];
	              authUrl += '?auth_origin_url=' + encodeURIComponent($window.location.href);
	              params = angular.extend({}, opts.params || {}, {
	                omniauth_window_type: omniauthWindowType
	              });
	              for (key in params) {
	                val = params[key];
	                authUrl += '&';
	                authUrl += encodeURIComponent(key);
	                authUrl += '=';
	                authUrl += encodeURIComponent(val);
	              }
	              return authUrl;
	            },
	            requestCredentialsViaPostMessage: function(authWindow) {
	              if (authWindow.closed) {
	                return this.handleAuthWindowClose(authWindow);
	              } else {
	                authWindow.postMessage("requestCredentials", "*");
	                return this.requestCredentialsPollingTimer = $timeout(((function(_this) {
	                  return function() {
	                    return _this.requestCredentialsViaPostMessage(authWindow);
	                  };
	                })(this)), 500);
	              }
	            },
	            requestCredentialsViaExecuteScript: function(authWindow) {
	              var handleAuthWindowClose, handleLoadStop;
	              this.cancelOmniauthInAppBrowserListeners();
	              handleAuthWindowClose = this.handleAuthWindowClose.bind(this, authWindow);
	              handleLoadStop = this.handleLoadStop.bind(this, authWindow);
	              authWindow.addEventListener('loadstop', handleLoadStop);
	              authWindow.addEventListener('exit', handleAuthWindowClose);
	              return this.cancelOmniauthInAppBrowserListeners = function() {
	                authWindow.removeEventListener('loadstop', handleLoadStop);
	                return authWindow.removeEventListener('exit', handleAuthWindowClose);
	              };
	            },
	            handleLoadStop: function(authWindow) {
	              _this = this;
	              return authWindow.executeScript({
	                code: 'requestCredentials()'
	              }, function(response) {
	                var data, ev;
	                data = response[0];
	                if (data) {
	                  ev = new Event('message');
	                  ev.data = data;
	                  _this.cancelOmniauthInAppBrowserListeners();
	                  $window.dispatchEvent(ev);
	                  _this.initDfd();
	                  return authWindow.close();
	                }
	              });
	            },
	            handleAuthWindowClose: function(authWindow) {
	              this.cancel({
	                reason: 'unauthorized',
	                errors: ['User canceled login']
	              });
	              this.cancelOmniauthInAppBrowserListeners;
	              return $rootScope.$broadcast('auth:window-closed');
	            },
	            resolveDfd: function() {
	              this.dfd.resolve(this.user);
	              return $timeout(((function(_this) {
	                return function() {
	                  _this.dfd = null;
	                  if (!$rootScope.$$phase) {
	                    return $rootScope.$digest();
	                  }
	                };
	              })(this)), 0);
	            },
	            buildQueryString: function(param, prefix) {
	              var encoded, k, str, v;
	              str = [];
	              for (k in param) {
	                v = param[k];
	                k = prefix ? prefix + "[" + k + "]" : k;
	                encoded = angular.isObject(v) ? this.buildQueryString(v, k) : k + "=" + encodeURIComponent(v);
	                str.push(encoded);
	              }
	              return str.join("&");
	            },
	            parseLocation: function(location) {
	              var i, locationSubstring, obj, pair, pairs;
	              locationSubstring = location.substring(1);
	              obj = {};
	              if (locationSubstring) {
	                pairs = locationSubstring.split('&');
	                pair = void 0;
	                i = void 0;
	                for (i in pairs) {
	                  i = i;
	                  if ((pairs[i] === '') || (typeof pairs[i] === 'function')) {
	                    continue;
	                  }
	                  pair = pairs[i].split('=');
	                  obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	                }
	              }
	              return obj;
	            },
	            validateUser: function(opts) {
	              var clientId, configName, expiry, location_parse, params, search, token, uid, url;
	              if (opts == null) {
	                opts = {};
	              }
	              configName = opts.config;
	              if (this.dfd == null) {
	                this.initDfd();
	                if (this.userIsAuthenticated()) {
	                  this.resolveDfd();
	                } else {
	                  search = $location.search();
	                  location_parse = this.parseLocation(window.location.search);
	                  params = Object.keys(search).length === 0 ? location_parse : search;
	                  token = params.auth_token || params.token;
	                  if (token !== void 0) {
	                    clientId = params.client_id;
	                    uid = params.uid;
	                    expiry = params.expiry;
	                    configName = params.config;
	                    this.setConfigName(configName);
	                    this.mustResetPassword = params.reset_password;
	                    this.firstTimeLogin = params.account_confirmation_success;
	                    this.oauthRegistration = params.oauth_registration;
	                    this.setAuthHeaders(this.buildAuthHeaders({
	                      token: token,
	                      clientId: clientId,
	                      uid: uid,
	                      expiry: expiry
	                    }));
	                    url = $location.path() || '/';
	                    ['auth_token', 'token', 'client_id', 'uid', 'expiry', 'config', 'reset_password', 'account_confirmation_success', 'oauth_registration'].forEach(function(prop) {
	                      return delete params[prop];
	                    });
	                    if (Object.keys(params).length > 0) {
	                      url += '?' + this.buildQueryString(params);
	                    }
	                    $location.url(url);
	                  } else if (this.retrieveData('currentConfigName')) {
	                    configName = this.retrieveData('currentConfigName');
	                  }
	                  if (this.getConfig().forceValidateToken) {
	                    this.validateToken({
	                      config: configName
	                    });
	                  } else if (!isEmpty(this.retrieveData('auth_headers'))) {
	                    if (this.tokenHasExpired()) {
	                      $rootScope.$broadcast('auth:session-expired');
	                      this.rejectDfd({
	                        reason: 'unauthorized',
	                        errors: ['Session expired.']
	                      });
	                    } else {
	                      this.validateToken({
	                        config: configName
	                      });
	                    }
	                  } else {
	                    this.rejectDfd({
	                      reason: 'unauthorized',
	                      errors: ['No credentials']
	                    });
	                    $rootScope.$broadcast('auth:invalid');
	                  }
	                }
	              }
	              return this.dfd.promise;
	            },
	            validateToken: function(opts) {
	              if (opts == null) {
	                opts = {};
	              }
	              if (!this.tokenHasExpired()) {
	                return $http.get(this.apiUrl(opts.config) + this.getConfig(opts.config).tokenValidationPath).success((function(_this) {
	                  return function(resp) {
	                    var authData;
	                    authData = _this.getConfig(opts.config).handleTokenValidationResponse(resp);
	                    _this.handleValidAuth(authData);
	                    if (_this.firstTimeLogin) {
	                      $rootScope.$broadcast('auth:email-confirmation-success', _this.user);
	                    }
	                    if (_this.oauthRegistration) {
	                      $rootScope.$broadcast('auth:oauth-registration', _this.user);
	                    }
	                    if (_this.mustResetPassword) {
	                      $rootScope.$broadcast('auth:password-reset-confirm-success', _this.user);
	                    }
	                    return $rootScope.$broadcast('auth:validation-success', _this.user);
	                  };
	                })(this)).error((function(_this) {
	                  return function(data) {
	                    if (_this.firstTimeLogin) {
	                      $rootScope.$broadcast('auth:email-confirmation-error', data);
	                    }
	                    if (_this.mustResetPassword) {
	                      $rootScope.$broadcast('auth:password-reset-confirm-error', data);
	                    }
	                    $rootScope.$broadcast('auth:validation-error', data);
	                    return _this.rejectDfd({
	                      reason: 'unauthorized',
	                      errors: data != null ? data.errors : ['Unspecified error']
	                    });
	                  };
	                })(this));
	              } else {
	                return this.rejectDfd({
	                  reason: 'unauthorized',
	                  errors: ['Expired credentials']
	                });
	              }
	            },
	            tokenHasExpired: function() {
	              var expiry, now;
	              expiry = this.getExpiry();
	              now = new Date().getTime();
	              return expiry && expiry < now;
	            },
	            getExpiry: function() {
	              return this.getConfig().parseExpiry(this.retrieveData('auth_headers') || {});
	            },
	            invalidateTokens: function() {
	              var key, val, _ref;
	              _ref = this.user;
	              for (key in _ref) {
	                val = _ref[key];
	                delete this.user[key];
	              }
	              this.deleteData('currentConfigName');
	              if (this.timer != null) {
	                $interval.cancel(this.timer);
	              }
	              return this.deleteData('auth_headers');
	            },
	            signOut: function() {
	              return $http["delete"](this.apiUrl() + this.getConfig().signOutUrl).success((function(_this) {
	                return function(resp) {
	                  _this.invalidateTokens();
	                  return $rootScope.$broadcast('auth:logout-success');
	                };
	              })(this)).error((function(_this) {
	                return function(resp) {
	                  _this.invalidateTokens();
	                  return $rootScope.$broadcast('auth:logout-error', resp);
	                };
	              })(this));
	            },
	            handleValidAuth: function(user, setHeader) {
	              if (setHeader == null) {
	                setHeader = false;
	              }
	              if (this.requestCredentialsPollingTimer != null) {
	                $timeout.cancel(this.requestCredentialsPollingTimer);
	              }
	              this.cancelOmniauthInAppBrowserListeners();
	              angular.extend(this.user, user);
	              this.user.signedIn = true;
	              this.user.configName = this.getCurrentConfigName();
	              if (setHeader) {
	                this.setAuthHeaders(this.buildAuthHeaders({
	                  token: this.user.auth_token,
	                  clientId: this.user.client_id,
	                  uid: this.user.uid,
	                  expiry: this.user.expiry
	                }));
	              }
	              return this.resolveDfd();
	            },
	            buildAuthHeaders: function(ctx) {
	              var headers, key, val, _ref;
	              headers = {};
	              _ref = this.getConfig().tokenFormat;
	              for (key in _ref) {
	                val = _ref[key];
	                headers[key] = $interpolate(val)(ctx);
	              }
	              return headers;
	            },
	            persistData: function(key, val, configName) {
	              if (this.getConfig(configName).storage instanceof Object) {
	                return this.getConfig(configName).storage.persistData(key, val, this.getConfig(configName));
	              } else {
	                switch (this.getConfig(configName).storage) {
	                  case 'localStorage':
	                    return $window.localStorage.setItem(key, JSON.stringify(val));
	                  case 'sessionStorage':
	                    return $window.sessionStorage.setItem(key, JSON.stringify(val));
	                  default:
	                    return ipCookie(key, val, this.getConfig().cookieOps);
	                }
	              }
	            },
	            retrieveData: function(key) {
	              var e;
	              try {
	                if (this.getConfig().storage instanceof Object) {
	                  return this.getConfig().storage.retrieveData(key);
	                } else {
	                  switch (this.getConfig().storage) {
	                    case 'localStorage':
	                      return JSON.parse($window.localStorage.getItem(key));
	                    case 'sessionStorage':
	                      return JSON.parse($window.sessionStorage.getItem(key));
	                    default:
	                      return ipCookie(key);
	                  }
	                }
	              } catch (_error) {
	                e = _error;
	                if (e instanceof SyntaxError) {
	                  return void 0;
	                } else {
	                  throw e;
	                }
	              }
	            },
	            deleteData: function(key) {
	              if (this.getConfig().storage instanceof Object) {
	                this.getConfig().storage.deleteData(key);
	              }
	              switch (this.getConfig().storage) {
	                case 'localStorage':
	                  return $window.localStorage.removeItem(key);
	                case 'sessionStorage':
	                  return $window.sessionStorage.removeItem(key);
	                default:
	                  return ipCookie.remove(key, {
	                    path: this.getConfig().cookieOps.path
	                  });
	              }
	            },
	            setAuthHeaders: function(h) {
	              var expiry, newHeaders, now, result;
	              newHeaders = angular.extend(this.retrieveData('auth_headers') || {}, h);
	              result = this.persistData('auth_headers', newHeaders);
	              expiry = this.getExpiry();
	              now = new Date().getTime();
	              if (expiry > now) {
	                if (this.timer != null) {
	                  $interval.cancel(this.timer);
	                }
	                this.timer = $interval(((function(_this) {
	                  return function() {
	                    return _this.validateUser({
	                      config: _this.getSavedConfig()
	                    });
	                  };
	                })(this)), parseInt(expiry - now), 1);
	              }
	              return result;
	            },
	            initDfd: function() {
	              return this.dfd = $q.defer();
	            },
	            rejectDfd: function(reason) {
	              this.invalidateTokens();
	              if (this.dfd != null) {
	                this.dfd.reject(reason);
	                return $timeout(((function(_this) {
	                  return function() {
	                    return _this.dfd = null;
	                  };
	                })(this)), 0);
	              }
	            },
	            apiUrl: function(configName) {
	              if (this.getConfig(configName).proxyIf()) {
	                return this.getConfig(configName).proxyUrl;
	              } else {
	                return this.getConfig(configName).apiUrl;
	              }
	            },
	            getConfig: function(name) {
	              return configs[this.getCurrentConfigName(name)];
	            },
	            getResultOrValue: function(arg) {
	              if (typeof arg === 'function') {
	                return arg();
	              } else {
	                return arg;
	              }
	            },
	            getCurrentConfigName: function(name) {
	              return name || this.getSavedConfig();
	            },
	            getSavedConfig: function() {
	              var c, key;
	              c = void 0;
	              key = 'currentConfigName';
	              if (this.hasLocalStorage()) {
	                if (c == null) {
	                  c = JSON.parse($window.localStorage.getItem(key));
	                }
	              } else if (this.hasSessionStorage()) {
	                if (c == null) {
	                  c = JSON.parse($window.sessionStorage.getItem(key));
	                }
	              }
	              if (c == null) {
	                c = ipCookie(key);
	              }
	              return c || defaultConfigName;
	            },
	            hasSessionStorage: function() {
	              var error;
	              if (this._hasSessionStorage == null) {
	                this._hasSessionStorage = false;
	                try {
	                  $window.sessionStorage.setItem('ng-token-auth-test', 'ng-token-auth-test');
	                  $window.sessionStorage.removeItem('ng-token-auth-test');
	                  this._hasSessionStorage = true;
	                } catch (_error) {
	                  error = _error;
	                }
	              }
	              return this._hasSessionStorage;
	            },
	            hasLocalStorage: function() {
	              var error;
	              if (this._hasLocalStorage == null) {
	                this._hasLocalStorage = false;
	                try {
	                  $window.localStorage.setItem('ng-token-auth-test', 'ng-token-auth-test');
	                  $window.localStorage.removeItem('ng-token-auth-test');
	                  this._hasLocalStorage = true;
	                } catch (_error) {
	                  error = _error;
	                }
	              }
	              return this._hasLocalStorage;
	            }
	          };
	        };
	      })(this)
	    ]
	  };
	}).config([
	  '$httpProvider', function($httpProvider) {
	    var httpMethods, tokenIsCurrent, updateHeadersFromResponse;
	    tokenIsCurrent = function($auth, headers) {
	      var newTokenExpiry, oldTokenExpiry;
	      oldTokenExpiry = Number($auth.getExpiry());
	      newTokenExpiry = Number($auth.getConfig().parseExpiry(headers || {}));
	      return newTokenExpiry >= oldTokenExpiry;
	    };
	    updateHeadersFromResponse = function($auth, resp) {
	      var key, newHeaders, val, _ref;
	      newHeaders = {};
	      _ref = $auth.getConfig().tokenFormat;
	      for (key in _ref) {
	        val = _ref[key];
	        if (resp.headers(key)) {
	          newHeaders[key] = resp.headers(key);
	        }
	      }
	      if (tokenIsCurrent($auth, newHeaders)) {
	        return $auth.setAuthHeaders(newHeaders);
	      }
	    };
	    $httpProvider.interceptors.push([
	      '$injector', function($injector) {
	        return {
	          request: function(req) {
	            $injector.invoke([
	              '$http', '$auth', function($http, $auth) {
	                var key, val, _ref, _results;
	                if (req.url.match($auth.apiUrl())) {
	                  _ref = $auth.retrieveData('auth_headers');
	                  _results = [];
	                  for (key in _ref) {
	                    val = _ref[key];
	                    _results.push(req.headers[key] = val);
	                  }
	                  return _results;
	                }
	              }
	            ]);
	            return req;
	          },
	          response: function(resp) {
	            $injector.invoke([
	              '$http', '$auth', function($http, $auth) {
	                if (resp.config.url.match($auth.apiUrl())) {
	                  return updateHeadersFromResponse($auth, resp);
	                }
	              }
	            ]);
	            return resp;
	          },
	          responseError: function(resp) {
	            $injector.invoke([
	              '$http', '$auth', function($http, $auth) {
	                if (resp.config.url.match($auth.apiUrl())) {
	                  return updateHeadersFromResponse($auth, resp);
	                }
	              }
	            ]);
	            return $injector.get('$q').reject(resp);
	          }
	        };
	      }
	    ]);
	    httpMethods = ['get', 'post', 'put', 'patch', 'delete'];
	    return angular.forEach(httpMethods, function(method) {
	      var _base;
	      if ((_base = $httpProvider.defaults.headers)[method] == null) {
	        _base[method] = {};
	      }
	      return $httpProvider.defaults.headers[method]['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
	    });
	  }
	]).run([
	  '$auth', '$window', '$rootScope', function($auth, $window, $rootScope) {
	    return $auth.initialize();
	  }
	]);

	window.isOldIE = function() {
	  var nav, out, version;
	  out = false;
	  nav = navigator.userAgent.toLowerCase();
	  if (nav && nav.indexOf('msie') !== -1) {
	    version = parseInt(nav.split('msie')[1]);
	    if (version < 10) {
	      out = true;
	    }
	  }
	  return out;
	};

	window.isIE = function() {
	  var nav;
	  nav = navigator.userAgent.toLowerCase();
	  return (nav && nav.indexOf('msie') !== -1) || !!navigator.userAgent.match(/Trident.*rv\:11\./);
	};

	window.isEmpty = function(obj) {
	  var key, val;
	  if (!obj) {
	    return true;
	  }
	  if (obj.length > 0) {
	    return false;
	  }
	  if (obj.length === 0) {
	    return true;
	  }
	  for (key in obj) {
	    val = obj[key];
	    if (Object.prototype.hasOwnProperty.call(obj, key)) {
	      return false;
	    }
	  }
	  return true;
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	/*
	 * Copyright 2013 Ivan Pusic
	 * Contributors:
	 *   Matjaz Lipus
	 */
	module.exports = 'ipCookie';

	angular.module('ivpusic.cookie', ['ipCookie']);
	angular.module('ipCookie', ['ng']).
	factory('ipCookie', ['$document',
	  function ($document) {
	    'use strict';
	      
	    function tryDecodeURIComponent(value) {
	        try {
	            return decodeURIComponent(value);
	        } catch(e) {
	              // Ignore any invalid uri component
	        }
	    }

	    return (function () {
	      function cookieFun(key, value, options) {

	        var cookies,
	          list,
	          i,
	          cookie,
	          pos,
	          name,
	          hasCookies,
	          all,
	          expiresFor;

	        options = options || {};
	        var dec = options.decode || tryDecodeURIComponent;
	        var enc = options.encode || encodeURIComponent;

	        if (value !== undefined) {
	          // we are setting value
	          value = typeof value === 'object' ? JSON.stringify(value) : String(value);

	          if (typeof options.expires === 'number') {
	            expiresFor = options.expires;
	            options.expires = new Date();
	            // Trying to delete a cookie; set a date far in the past
	            if (expiresFor === -1) {
	              options.expires = new Date('Thu, 01 Jan 1970 00:00:00 GMT');
	              // A new 
	            } else if (options.expirationUnit !== undefined) {
	              if (options.expirationUnit === 'hours') {
	                options.expires.setHours(options.expires.getHours() + expiresFor);
	              } else if (options.expirationUnit === 'minutes') {
	                options.expires.setMinutes(options.expires.getMinutes() + expiresFor);
	              } else if (options.expirationUnit === 'seconds') {
	                options.expires.setSeconds(options.expires.getSeconds() + expiresFor);
	              } else if (options.expirationUnit === 'milliseconds') {
	                options.expires.setMilliseconds(options.expires.getMilliseconds() + expiresFor);
	              } else {
	                options.expires.setDate(options.expires.getDate() + expiresFor);
	              }
	            } else {
	              options.expires.setDate(options.expires.getDate() + expiresFor);
	            }
	          }
	          return ($document[0].cookie = [
	            enc(key),
	            '=',
	            enc(value),
	            options.expires ? '; expires=' + options.expires.toUTCString() : '',
	            options.path ? '; path=' + options.path : '',
	            options.domain ? '; domain=' + options.domain : '',
	            options.secure ? '; secure' : ''
	          ].join(''));
	        }

	        list = [];
	        all = $document[0].cookie;
	        if (all) {
	          list = all.split('; ');
	        }

	        cookies = {};
	        hasCookies = false;

	        for (i = 0; i < list.length; ++i) {
	          if (list[i]) {
	            cookie = list[i];
	            pos = cookie.indexOf('=');
	            name = cookie.substring(0, pos);
	            value = dec(cookie.substring(pos + 1));
	            if(angular.isUndefined(value))
	              continue;

	            if (key === undefined || key === name) {
	              try {
	                cookies[name] = JSON.parse(value);
	              } catch (e) {
	                cookies[name] = value;
	              }
	              if (key === name) {
	                return cookies[name];
	              }
	              hasCookies = true;
	            }
	          }
	        }
	        if (hasCookies && key === undefined) {
	          return cookies;
	        }
	      }
	      cookieFun.remove = function (key, options) {
	        var hasCookie = cookieFun(key) !== undefined;

	        if (hasCookie) {
	          if (!options) {
	            options = {};
	          }
	          options.expires = -1;
	          cookieFun(key, '', options);
	        }
	        return hasCookie;
	      };
	      return cookieFun;
	    }());
	  }
	]);

/***/ }
/******/ ]);