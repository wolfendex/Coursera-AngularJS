(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

    service.getMenuItem = function (short_name) {
        //Convert Menu Short Name to Upper Case for Standardization
        short_name = short_name.toUpperCase();

        //Check to Make Sure it Matches a Letter then a Number Format
        if (short_name.match('^[A-Z]{1}[0-9]{1}$')) {
            //Get Apha and Numeric Values of ShortName
            var s = short_name.search('[0-9]');
            var cat = short_name.substring(0, 1);
            var index = short_name.substring(s) - 1;

            //Put together $http string
            return $http.get(ApiPath + '/menu_items/' + cat + '/menu_items/' + index + '.json').then(function (response) {
                return response.data;
                console.log(response.data);
            });
        } else {
            throw "This is not a valid item!";
        }
    }

}



})();
