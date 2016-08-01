var subject = {
   templateUrl:"../partial-views/subject.html",
   require: { subs:"^subjects"},
   controller: function () {
       console.log(this.subs.selectedNode)
     
   }
}

module.exports = subject;