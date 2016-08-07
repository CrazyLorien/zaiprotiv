var arguments = {
    bindings : {
        args: "="
    },
    templateUrl: "../partial-views/arguments.html",
    controller: function () {
        debugger;
        this.removeArg = (id) => {
           this.args = this.args.filter ( (item) => { return item.id != id})
       }
    }
}

module.exports = arguments;