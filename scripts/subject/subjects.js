var config = require('../../config')

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

