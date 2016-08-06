var config = require('../../config')

var subjects = {
   templateUrl:"../partial-views/subjects.html",
   controller: function (dataService) {

       var data = dataService.getAll(config.url)

       data.then( (response) => {
           this.treedata = response.data;
       })

   }
}

module.exports = subjects;

