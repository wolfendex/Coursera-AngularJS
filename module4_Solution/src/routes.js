(function () {
'use strict';

    angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
      templateUrl: 'src/restaurantmenu/templates/home.template.html'
  })

  // Categories List Page
  .state('categories', {
    url: '/categories',
      templateUrl: 'src/restaurantmenu/templates/cats.template.html',
      controller: 'CategoriesController as cats',
    resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
      }]
    }
  })


  // Items List Page
  .state('items', {
    url: '/{short_name}',
      templateUrl: 'src/restaurantmenu/templates/item-list.template.html',
      controller: 'ItemListController as itemList',
      params: {
          short_name: null
      },
    resolve: {
        items: ['MenuDataService','$stateParams',
            function (MenuDataService, $stateParams) {
                return MenuDataService.getItemsForCategory($stateParams.short_name);    
            }]
    }
  });
}

})();
