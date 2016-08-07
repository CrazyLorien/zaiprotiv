var config = require('../../config')

var subjects = {
   templateUrl:"../partial-views/subjects.html",
   controller: function (selectedService,dataService,$location) {

       var data =  dataService.getAll(config.urlProd)

       data.then( (response) => {
           this.searchdata =  response.data;
       })

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

