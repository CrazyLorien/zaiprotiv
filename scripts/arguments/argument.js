var argument = {
    bindings: {
        args: "=",
        hideButtons: "=",
        removearg : '='
    },
    templateUrl: "../partial-views/argument.html",
    controller: function () {
        
        this.remove = function (item) {
            console.log('remove');
            
            item.isImportant = false;
        }
        
    }
};

module.exports = argument;