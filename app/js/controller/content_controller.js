app.controller('ContentController', function($scope, LxNotificationService, ChartFactory, RepoFactory) {
  $scope.git_repo_uri = "";
  $scope.repositories = [];
  $scope.activeTab = 0;
  $scope.analyze = function(uri) {
    if (uri != "") {
      var repo = RepoFactory.createRepository(uri, uri);
      $scope.repositories.push(repo);
    } else {
      LxNotificationService.error('Please enter a Git Repository URL!');
    }
  }
  $scope.updateRepoUri = function(uri) {
    $scope.git_repo_uri = uri;
  };

});
