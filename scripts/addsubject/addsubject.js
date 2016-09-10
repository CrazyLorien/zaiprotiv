var addsubject = {
    bindings: {
        showCreateNew: "<",
        descr : "<"
    },
    templateUrl: "../partial-views/addSubject.html",
    controller: function (selectedService, $location) {
        
        this.add = function () {
            var addedItem = { name : this.name, description : this.descr, arguments :  { "positives" : [], "negatives" : []}}
            selectedService.setSelected(addedItem);
            $location.path("/main/addsubj")
        }
        
    }
};

module.exports = addsubject;