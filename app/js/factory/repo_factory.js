//Repository Factory
app.factory('RepoFactory', function($http, ChartFactory, DataService){
  return {
    createRepository : function(user, repo) {
      return new Repository(user, repo, user + "/" + repo, ChartFactory, DataService);
    }
  }
});

//Repository Object
function Repository(user, repo, title, ChartFactory, DataService) {
      this.user = user;
      this.repo = repo;
      this.title = title || "Unknown";
      this.graphs = [];

      this.loadContributionGraph = function(graphs, c_type) {
          var graph = {};
          DataService.getContributions(user, repo).then(function(d){
          var json_res = d;
          var title = "Total Contributions";
          var type = c_type || "pie";
          var data = [];
          var series = ["Commits", "Deletions", "Insertions"];
          var labels = [];
          var commits = [];
          var deletions = [];
          var insertions = [];
          for (i = 0; i < json_res.contributions.length; i++) {
            commits.push(json_res.contributions[i].commits);
            deletions.push(json_res.contributions[i].deletions);
            insertions.push(json_res.contributions[i].insertions);
            labels.push(json_res.contributions[i].member);
          }
          data.push(commits);
          data.push(deletions);
          data.push(insertions);
          graph.content = ChartFactory.createChart(title, data, labels, series, type, true);
          graph.tab = 0;
          graphs.push(graph);
          }); 
      }

      this.loadFinalLinesGraph = function(graphs, c_type) {
          var graph = {};
          DataService.getLinesFinal(user, repo).then(function(d){
          var json_res = d;
          var title = "Total Lines (Final)";
          var type = c_type || "pie";
          var data = [];
          var series = ["Lines"];
          var labels = [];
          var lines = [];
          for (i = 0; i < json_res.length; i++) {
            lines.push(json_res[i].lines);
            labels.push(json_res[i].name);
          }
          data.push(lines);
          graph.content = ChartFactory.createChart(title, data, labels, series, type, true);
          graph.content.show_legend = 0;
          graph.content.options = {legend: {display: false}};
          graph.tab = 3;
          graphs.push(graph);
          }); 
      }

      this.loadTeamCommitHistoryGraph = function(graphs, interval, datestart, dateend) {
          var graph = {};
          graph.startdate = new Date();
          graph.enddate = graph.startdate;
          graph.tab = 1;
          graph.hasStartDate = 1;
          graph.hasEndDate = 1;

          graph.refresh = function(add) {
            if (graph.startdate != graph.enddate) {
              datestart = moment(graph.startdate).locale('en').format('DDMMYY');
              dateend = moment(graph.enddate).locale('en').format('DDMMYY');
            }
            interval = "week";
            member = null;
            DataService.getTeamCommitHistory(user, repo, member, interval, datestart, dateend).then(function(d){
              var json_res = d;
              var title = "Team Commit History";
              var data = [];
              var series = [];
              var labels = json_res.labels;
              for (i = 0; i < json_res.history.length; i++) {
                series.push(json_res.history[i].member);
                data.push(json_res.history[i].commits);
              }
              graph.content = ChartFactory.createChart(title, data, labels, series, "bar", false);
              graph.content.show_legend = 0;
              if (add) {
                graphs.push(graph);
              }
            });
          };
          graph.refresh(true);
      }

      this.loadFileCommitHistoryGraph = function(graphs) {
          var graph = {};
          graph.hasUpdateChart = 1;
          graph.tab = 2;
          graph.filepath = "";
          graph.hasFileName = 1;
          graph.refresh = function(add) {
            var fp = graph.filepath;
            var sline = graph.startline;
            var eline = graph.endline;
            DataService.getFileCommitHistory(user, repo, fp, sline, eline).then(function(d){
              var json_res = d;
              var title = "Commit History - " + json_res.filename;
              var data = [];
              var series = [];
              var labels = ["Message", "Member"];
              for (i = 0; i < json_res.history.length; i++) {
                data.push([json_res.history[i].message, json_res.history[i].member]);
                series.push("Commit " + i);
              }
              graph.content = ChartFactory.createDataTable(title, data, labels, series, false);
            });
          };
          graphs.push(graph);
      }

      this.loadGraphs = function() {
          this.loadContributionGraph(this.graphs);
          this.loadTeamCommitHistoryGraph(this.graphs);
          this.loadFileCommitHistoryGraph(this.graphs);
          this.loadFinalLinesGraph(this.graphs, "bar");
      };

};
