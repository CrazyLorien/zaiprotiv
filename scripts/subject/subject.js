var config = require('../../config')

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