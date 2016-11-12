webpackHotUpdatemain(0,[
/* 0 */,
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
	    urlProd : "http://zaiprotiv.by/v1/"
	}

	module.exports = config; 


/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(2)

	var subject = {
	   templateUrl:"../partial-views/subject.html",
	   controller: function (selectedService, dataService, $timeout,$location, $http) {
	       var self = this; 

	       this.subj = selectedService.getSelected();
	      
	       this.addArg = () => {
	           var argument = {
	                      "title": self.argumentTitle,
	                      "body":  self.argumentBody,
	                      "rang": "27854",
	                      "image_url": "",
	                      "positive" : 1,
	                      "subject_id" : this.subj.subject_id,
	                       "isImportant" : true
	                      };

	           if(self.argumentStatus)
	           {
	             argument["positive"]  = 1,
	             self.subj.arguments.positives.push(argument)

	           }else{
	             argument["positive"]  = 0,
	             self.subj.arguments.negatives.push(argument)       
	          }

	          $http.post(config.urlProd + 'arguments', JSON.stringify(argument)).then(
	           function (data){
	                    console.log(data)
	           },
	           function (err){
	              console.log(err);
	          
	           });
	       }


	        this.showResult = ()=> {
	            $location.path("/results/");
	        };
	    }
	};

	module.exports = subject;

/***/ },
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(2);

	var results = {
	    templateUrl: "../partial-views/results.html",
	    controller: function (selectedService, dataService, $timeout, $http) {
	        this.subj = selectedService.getSelected();
	      

	        this.hideButtons = true;

	        this.addPositive = () => {
				this.createSample();
	        };

	        this.addNegative = () => {
	           this.createSample();
	        };

	        this.createSample = () => {
				  var data = this.subj;
							    data.image_url = data.image_url || "http://img.tyt.by/n/lady.tut.by/0b/8/s_na_1_03.jpg";	   
							    $http.post(config.urlProd + 'samples', JSON.stringify(data)).then(
								       function (data){
						                            console.log(data)
							                },
								       function (err){
									   console.log(err);
									   
								       });

	        }

	    }
	};

	module.exports = results;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(2)
	var addsubject = {
	    bindings: {
	        showCreateNew: "<",
	        descr : "<"
	    },
	    templateUrl: "../partial-views/addSubject.html",
	    controller: function (selectedService, $location,$http) {
	        
	        this.add = function () {
	            var addedItem = { name : this.name, description : this.descr, arguments :  { "positives" : [], "negatives" : []}}           
	            $http.post(config.urlProd + 'subjects', JSON.stringify(addedItem)).then(
	                   function (data){
	                        console.log(data)
	                        addedItem.subject_id = data.data.id;
	                        selectedService.setSelected(addedItem);
	                        $location.path("/main/addsubj")                            
	                   },
	                   function (err){
	                      console.log(err);
	                      $location.path("/main")
	                   });         
	        }
	        
	    }
	};

	module.exports = addsubject;

/***/ }
])