(function () {
'use strict';

    angular.module('MenuApp')
    .component('categories', {
  templateUrl: 'src/restaurantmenu/templates/menu.template.html',
  bindings: {
    categories: '<'
  }
});

})();
