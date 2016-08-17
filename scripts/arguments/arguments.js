var arguments = {
    bindings: {
        args: "=",
        hideButtons: "="
    },
    templateUrl: "../partial-views/arguments.html",
    controller: function () {
        this.removearg = function ()
        {
            console.log("tada");
        }
    }
};

module.exports = arguments;