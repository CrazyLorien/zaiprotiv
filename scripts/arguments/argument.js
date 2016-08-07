var argument = {
    bindings : {
        args: "="
    },
    templateUrl: "../../partial-views/argument.html",
    controller : function () {
       this.remove= function (item) {
           item.isImportant = false;
       }
    }
}

module.exports = argument;