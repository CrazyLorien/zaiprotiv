var config = require('../config')

var results = {
   templateUrl:"../partial-views/results.html",
   controller: function (selectedService, dataService, $timeout) {
       this.subj = [] ; 
       dataService.getById(config.url, selectedService.getSelected().id).then( (response) => {
          var temp = response.data.filter(function(rw){ return rw.id == selectedService.getSelected().id });
          this.subj = temp[0];
       })
   }
}

module.exports = results;