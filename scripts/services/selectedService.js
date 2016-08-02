var selectedService = function () {
    var selectedItem;

    this.setSelected = function (item) {
        selectedItem = item;
    }

    this.getSelected = function () {
        return selectedItem;
    }
}

module.exports = selectedService;