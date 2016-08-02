var subject = {
   templateUrl:"../partial-views/subject.html",
   controller: function (selectedService) { 
       this.subj = selectedService.getSelected();
   }
}

module.exports = subject;