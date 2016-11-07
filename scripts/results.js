var config = require('../config');

var results = {
    templateUrl: "../partial-views/results.html",
    controller: function (selectedService, dataService, $timeout, $http) {
        this.subj = selectedService.getSelected();
      

        this.hideButtons = true;

        this.addPositive = ()=> {
			    var data = this.subj;
			    data.image_url = data.image_url || "http://img.tyt.by/n/lady.tut.by/0b/8/s_na_1_03.jpg";	   
			    data.arguments = [];
			    data.arguments.push(args);
			    $http.post(config.urlProd + 'samples', JSON.stringify(data)).then(
				       function (data){
		                            console.log(data)
			                },
				       function (err){
					   console.log(err);
					   
				       });
        };

        this.addNegative = ()=> {

        };


    }
};

module.exports = results;
