var dataService = function ($http) {

    this.save = function (url, type, item) {
        return  $http({url : url, data : item, method: type });
    }

    this.getAll = function (url) {
        return $http({ url : url, method : "GET"})
    }

    this.getById = function (url, id) {
        return $http({ url: url , method: "GET" })
    }


}

module.exports = dataService;