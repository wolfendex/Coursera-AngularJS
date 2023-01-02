(function () {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    //Inject MenuService for Getting Menu Items and UserService for Setting User
    SignUpController.$inject = ['UserService', 'MenuService'];
    function SignUpController(UserService, MenuService) {
        var signUpCtrl = this;
        signUpCtrl.user = UserService.getCurrentUser();
        signUpCtrl.isRegistered = signUpCtrl.user != null;
        signUpCtrl.ErrorMsg = null;

        signUpCtrl.signUp = function () {
            signUpCtrl.ErrorMsg = null;

            try {
                MenuService.getMenuItem(signUpCtrl.user.favitem).then(function (favItemChoice) {
                    if (favItemChoice) {
                        signUpCtrl.user.favItemChoice = favItemChoice
                        signUpCtrl.user.favItemCat = favItemChoice.short_name;
                        UserService.registerUser(signUpCtrl.user);
                        signUpCtrl.isRegistered = true;
                    } else {
                        catchError("No such menu number exists!");
                        signUpCtrl.ErrorMsg = "No such menu number exists!";
                    }
                });
            } catch (error) {
                catchError(error);
            }
        }

        function catchError(error) {
            console.log("Caught Error", error);
        }

        
    }
})();