// JavaScript source code
(function () {
    'use strict'; 

    var ToBuyShoppingList = [
        {
            name: "2% Milk",
            quantity: "1"
        },
        {
            name: "Strawberries",
            quantity: "2"
        },
        {
            name: "Orange Juice",
            quantity: "1"
        },
        {
            name: "Paper Towels",
            quantity: "5"
        },
        {
            name: "Coffee",
            quantity: "3"
        }

    ];

    var AlreadyBoughtShoppingList = [];


    angular.module("ShoppingListCheckOff", [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {

        var list1 = this;
        var shoppingList = ShoppingListCheckOffService;

        list1.items = shoppingList.getToBuyItems();

        list1.itemName = "";
        list1.itemQuantity = "";

        list1.addItem = function () {
            try {
                shoppingList.addItem(list1.itemName, list1.itemQuantity);
            } catch (error) {
                list1.errorMessage = error.message;
            }
        }

        list1.removeItem = function (itemIndex) {
            shoppingList.removeToBuyItem(itemIndex);
        };

    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var list2 = this;

        var shoppingList = ShoppingListCheckOffService;

        list2.items = shoppingList.getBoughtItems();

        list2.itemName = "";
        list2.itemQuantity = "";

        list2.addItem = function () {
            try {
                shoppingList.addItem(list2.itemName, list2.itemQuantity);
            } catch (error) {
                list2.errorMessage = error.message;
            }
        }

        list2.removeItem = function (itemIndex) {
            shoppingList.removeBoughtItem(itemIndex);
        };

        
    }

    function ShoppingListCheckOffService() {
        var service = this;
        var ToBuyitems = ToBuyShoppingList;
        var BoughtItems = AlreadyBoughtShoppingList;
       
        service.addItem = function (itemName, quantity) {
            if ((maxItems === undefined) ||
                (maxItems !== undefined) && (items.length < maxItems)) {
                var item = {
                    name: itemName,
                    quantity: quantity
                };

                items.push(item);
            }
            else {
                throw new Error("Max items (" + maxItems + ") reached.");
            }
        };

        service.removeToBuyItem = function (itemIndex) {

            var bitem = {
                name: ToBuyitems[itemIndex].name,
                quantity: ToBuyitems[itemIndex].quantity
            };

            AlreadyBoughtShoppingList.push(bitem);
            ToBuyShoppingList.splice(itemIndex, 1);
        }

        service.removeBoughtItem = function (itemIndex) {
            var nbitem = {
                name: BoughtItems[itemIndex].name,
                quantity: BoughtItems[itemIndex].quantity
            };

            ToBuyShoppingList.push(nbitem);
            AlreadyBoughtShoppingList.splice(itemIndex, 1);
        }

        service.getToBuyItems = function () {
       
            return ToBuyitems;
            
        };

        service.getBoughtItems = function () {
            return BoughtItems;
        }
    }


})();