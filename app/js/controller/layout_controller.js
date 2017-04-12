app.controller('LayoutController', function($scope) {
  //Dummy
  $scope.$on('validatingrepo', function() {
    $scope.validating = 1;
  });
  $scope.$on('finishedvalidatingrepo', function() {
    $scope.validating = 0;
  });
});
