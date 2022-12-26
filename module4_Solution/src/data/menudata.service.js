(function () {
'use strict';

    angular.module('MenuApp')
        .service('MenuDataService', MenuDataService)
        .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");


    MenuDataService.$inject = ['$http', 'ApiBasePath']
    function MenuDataService($http, ApiBasePath) {
        var service = this;

        service.getAllCategories = function () {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json")
            }).then(function (response) {
                return response.data;
            });
        };

        service.getItemsForCategory = function (shortName) {
            return $http({
                method: "GET",
                url: (ApiBasePath + `/menu_items/${shortName}.json`)
            }).then(function (response) {
                console.log(response);
                return response.data;
            });
        };
    }
})();
