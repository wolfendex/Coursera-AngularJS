(function () {
'use strict';

    angular.module('MenuApp')
    .controller('ItemListController', ItemListController);

// 'item' is injected through state's resolve
ItemListController.$inject = ['items']
function ItemListController(items) {
    var itemList = this;

    //Process to Sort Alphabetically
    itemList.items = items.menu_items.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    //Pass in Category Info
    itemList.category = items.category;
}

})();
