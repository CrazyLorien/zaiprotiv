var config = require('../../config')

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