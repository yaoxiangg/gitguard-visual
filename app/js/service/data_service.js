app.service('DataService', function($http, $q) {
  var api_url = "http://localhost:8080";
  this.checkRepoExistence = function (user_data, repo_data) {
    var parameters = {
      user: user_data,
      repo: repo_data
    };
    var config = {
      params: parameters
    };
    return $http.get(api_url + '/isRepoValid', config)
    .then(function(res) {
      return res.data;
    },
    function(res) {
      return $q.resolve();
    });
  };
  this.getContributions = function (user_data, repo_data) {
    var parameters = {
      user: user_data,
      repo: repo_data
    };
    var config = {
      params: parameters
    };
    return $http.get(api_url + '/getcontributions', config)
    .then(function(res) {
      return res.data;
    },
    function(res) {
      return $q.resolve();
    });
  };
  this.getLinesFinal = function (user_data, repo_data) {
    var parameters = {
      user: user_data,
      repo: repo_data
    };
    var config = {
      params: parameters
    };
    return $http.get(api_url + '/getlinesfinal', config)
    .then(function(res) {
      return res.data;
    },
    function(res) {
      return $q.resolve();
    });
  };
  this.getTeamCommitHistory = function (user_data, repo_data, member, interval, datestart, dateend) {
    var parameters = {
      user: user_data,
      repo: repo_data,
    };
    if (member) {
      parameters["member"] = member;
    }
    if (interval) {
      parameters["interval"] = interval;
    }
    if (datestart) {
      parameters["datestart"] = datestart;
    }
    if (dateend) {
      parameters["dateend"] = dateend;
    }
    var config = {
      params: parameters
    };
    return $http.get(api_url + '/getteamcommithistory', config)
      .then(function(res) {
        return res.data;
      },
      function(res) {
        return $q.resolve();
      });
  };
  this.getFileCommitHistory = function (user_data, repo_data, filename, startline, endline) {
    var parameters = {
      user: user_data,
      repo: repo_data,
    };
    if (filename) {
      parameters["filename"] = filename;
    }
    if (startline) {
      parameters["startline"] = startline;
    }
    if (endline) {
      parameters["endline"] = endline;
    }
    var config = {
      params: parameters
    };
    return $http.get(api_url + '/getfilecommithistory', config)
    .then(function(res) {
      return res.data;
    },
    function(res) {
      return $q.resolve();
    });
  };
});
