app.controller('ContentController', function($scope, LxNotificationService, RepoFactory, DataService) {
  $scope.git_repo_uri = "";
  $scope.repositories = [];
  $scope.activeTab = 0;
  $scope.activeSideTab = 0;
  $scope.options = ["Contributions", "History", "File Commit", "Final Code"];
  $scope.checkEnter = function(keyEvent) {
    if (keyEvent.which === 13)
      $scope.analyze();
  };
  $scope.updateSideTab = function(index) {
    $scope.activeSideTab = index;
  };
  $scope.showError = function(msg) {
    LxNotificationService.error(msg);
  }
  $scope.analyze = function() {
    var uri = $scope.git_repo_uri.trim();
    if (uri == "undefined" || !uri || uri == "") {
      return;
    }
    var user_repo = get_user_repo_from_url(uri);
    console.log(user_repo);
    if (user_repo != null && user_repo && user_repo != "") {
      var user = user_repo.split("/")[0];
      var repo = user_repo.split("/")[1];
      if (repo == "") {
        $scope.showError('Please enter a valid Git Repository URL!');
        return;
      }
      $scope.git_repo_uri = "";
      $scope.attemptCreateRepository(user, repo);
    } else {
      $scope.showError('Please enter a valid Git Repository URL!');
    };
  }
  $scope.attemptCreateRepository = function(user, repo) {
    $scope.$emit("validatingrepo");
    DataService.checkRepoExistence(user, repo).then(function(d) {
      $scope.$emit("finishedvalidatingrepo");
      if (d != null && d.exist) {
        var repository = RepoFactory.createRepository(user, repo);
        $scope.git_repo_uri = "";
        $scope.repositories.push(repository);
        $scope.activeTab = $scope.repositories.length - 1;
        //Some buffer time
        setTimeout(function() {
          repository.loadGraphs();
          $scope.$apply();
        }, 2000);
      } else {
        $scope.showError('Please enter a valid Git Repository URL!');
      }
    });
  }
});
