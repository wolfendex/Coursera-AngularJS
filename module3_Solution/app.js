(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com")
    .directive('foundItems', foundItemsDirective);


    //NarrowItDownController
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;            
        menu.searchTerm = '';
        menu.found = [];
        menu.searchItems = function () {

            //Service request for getting Matched Menu Items, passing in searchTerm
            var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

            promise.then(function (response) {
                menu.found = response;
            })
                .catch(function (error) {
                    console.log("An Error has Occurred.");
                });
        }

        //Remove item from FoundItems list by Index
        menu.removeItem = function (itemIndex) {
            menu.found.splice(itemIndex, 1);
        };        
    }

    //MenuSearch Service
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var foundItems = [];

        service.getMatchedMenuItems = function (searchTerm) {

            //http request for Menu-Items Dataset
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            });

            //get return response
            return response.then(function (response) {
                var menuitems = response.data;

                foundItems = [];

                //Loop Through Categories get Menu Items
                for (var category in menuitems) {
                    //push menuitems to foundItems array
                    foundItems.push(menuitems[category].menu_items.filter(
                        item => item.description.toLowerCase().includes(searchTerm.toLowerCase())
                    ));
                }

                return foundItems.flat();
            });
        };       
    }

    //foundItems Directive
    function foundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                title: "@",
                items: '<',
                onRemove: '&'
            },
        };

        return ddo;

    }

    

})();
