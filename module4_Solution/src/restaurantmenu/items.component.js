(function () {
'use strict';

    angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/restaurantmenu/templates/items.template.html',
  bindings: {
    items: '<'
  }
});

})();
