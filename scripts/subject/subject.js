var subject = {
   templateUrl:"../partial-views/subject.html",
   controller: function (selectedService) { 
       this.subj = selectedService.getSelected();

       this.proCons;
       this.positive = () => {
         this.proCons = true;
       }

       this.negative = () => {
           this.proCons = false;
       }

       this.addArg = () => {
          this.proCons ? this.subj.pro.push(this.requestData) : this.subj.cons.push(this.requestData);
       }

    
   }
}

module.exports = subject;