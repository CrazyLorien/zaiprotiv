var config = require('../../config')

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