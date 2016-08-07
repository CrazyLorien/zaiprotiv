var config = require('../config');

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