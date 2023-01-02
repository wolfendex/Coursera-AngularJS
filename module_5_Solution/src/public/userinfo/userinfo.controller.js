(function () {
    "user strict"

    angular.module('public')
        .controller('UserInfoController', UserInfoController);

    UserInfoController.$inject = ['UserService'];
    function UserInfoController(UserService) {
        var userInfoCtrl = this;
        userInfoCtrl.user = UserService.getCurrentUser();
    }
})();