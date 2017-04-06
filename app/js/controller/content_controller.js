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
    var repo = get_repo_from_url(uri);
    if (uri != "" && repo) {
      console.log(repo);
      var repo = RepoFactory.createRepository(repo, repo);
      $scope.git_repo_uri = "";
      $scope.repositories.push(repo);
      $scope.activeTab = $scope.repositories.length - 1;
      setTimeout(function() { repo.loadGraphs(); $scope.$apply(); }, 2000);
    } else {
      LxNotificationService.error('Please enter a Git Repository URL!');
    }
  }
});
