(function () {
    "use strict"

    angular.module('common')
        .service('UserService', UserService);

    UserService.$inject = [];
    function UserService() {
        var service = this;
        var user = null;

        service.getCurrentUser = function () {
            return user;
        };

        service.registerUser = function (newUser) {
            user = newUser;
        };
    }

})();