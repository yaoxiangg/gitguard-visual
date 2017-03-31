app.controller('ContentController', function($scope, LxNotificationService, ChartFactory, RepoFactory) {
  $scope.git_repo_uri = "";
  $scope.repositories = [];
  $scope.activeTab = 0;
  $scope.checkEnter = function(keyEvent) {
    if (keyEvent.which === 13)
      $scope.analyze();
  };
  $scope.analyze = function() {
    var uri = $scope.git_repo_uri.trim();
    if (uri != "") {
      var repo = RepoFactory.createRepository(uri, uri);
      $scope.git_repo_uri = "";
      $scope.repositories.push(repo);
      $scope.activeTab = $scope.repositories.length - 1;
      setTimeout(function() { repo.loadGraphs(); $scope.$apply(); }, 3000);
    } else {
      LxNotificationService.error('Please enter a Git Repository URL!');
    }
  }
});
