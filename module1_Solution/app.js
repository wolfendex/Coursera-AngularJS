// JavaScript source code
(function () {
    'use strict'; 

    angular.module("LunchCheck", [])

        .controller('LunchCheckController', LController);

        LController.$inject= ['$scope'];

    function LController($scope) {
                       $scope.inputLunchItems = "";
                       $scope.Status = "";
          
            $scope.DisplayOutput = function () {

                var totalitems = CheckItems($scope.inputLunchItems); //get total array count value
                $scope.Status = GetStatusText(totalitems); //Get Status Text/Color based on array count
            };

        //Gets array length
        function CheckItems(mystring) {
            var readstr = TruncateString(mystring);

            var myarray = readstr.split(',');
            
            if (readstr === '') {
                return 0;
            }
            else
            {
                return myarray.length;
            }
           
        };

        //Truncates string with any white space or commas using expression
        function TruncateString(trunstring) {
            var truncstr = trunstring

            return truncstr.replace(/,\s*$/, "");

        };

        //Get Status Text & Color
        function GetStatusText(cnt) {
            var arraycnt = cnt;

            if (arraycnt === 0) {
                $scope.StatusColor = "red"
                return 'Empty String!';
            }
            else if (arraycnt <= 3) {
                $scope.StatusColor = "green"
                return 'Enjoy!';
            }
            else {
                $scope.StatusColor = "red"
                return 'Too Much!';
            }
        };
    };

           

})();