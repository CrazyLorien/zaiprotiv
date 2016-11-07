var config = require('../../config')
var addsubject = {
    bindings: {
        showCreateNew: "<",
        descr : "<"
    },
    templateUrl: "../partial-views/addSubject.html",
    controller: function (selectedService, $location,$http) {
        
        this.add = function () {
            var addedItem = { name : this.name, description : this.descr, arguments :  { "positives" : [], "negatives" : []}}           
            $http.post(config.urlProd + 'subjects', JSON.stringify(addedItem)).then(
                   function (data){
                        console.log(data)
                        addedItem.subject_id = data.data.id;
                        selectedService.setSelected(addedItem);
                        $location.path("/main/addsubj")                            
                   },
                   function (err){
                      console.log(err);
                      $location.path("/main")
                   });         
        }
        
    }
};

module.exports = addsubject;