var config = require('../config');

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
