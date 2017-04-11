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
          var table_graph = {};
          DataService.getContributions(user, repo).then(function(d){
            var json_res = d;
            var title = "Total Contributions";
            var type = c_type || "pie";
            //Create table chart
            var table_data = [];
            var table_series = [];
            var table_labels = ["Member", "Commits", "Deletions", "Insertions"];
            for (i = 0; i < json_res.contributions.length; i++) {
              var table_entry = [];
              table_entry.push(json_res.contributions[i].member);
              table_entry.push(json_res.contributions[i].commits);
              table_entry.push(json_res.contributions[i].deletions);
              table_entry.push(json_res.contributions[i].insertions);
              table_data.push(table_entry);
            }
            table_graph.content = ChartFactory.createDataTable(title, table_data, table_labels, table_series, false);
            table_graph.tab = 0;

            //Create chart
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

            graph.content = ChartFactory.createChart("", data, labels, series, type, true);
            graph.tab = 0;

            //Add to graphs
            graphs.push(graph);
            graphs.push(table_graph);
          }); 
      }


      this.loadFinalLinesGraph = function(graphs, c_type) {
          var graph = {};
          var table_graph = {};
          DataService.getLinesFinal(user, repo).then(function(d){
            var json_res = d;
            var title = "Total Lines (Final)";
            var type = c_type || "pie";

            //Create table chart
            var table_data = [];
            var table_series = [];
            var table_labels = ["Member", "Lines"];
            for (i = 0; i < json_res.length; i++) {
              var table_entry = [];
              table_entry.push(json_res[i].name);
              table_entry.push(json_res[i].lines);
              table_data.push(table_entry);
            }
            table_graph.content = ChartFactory.createDataTable(title, table_data, table_labels, table_series, false);
            table_graph.tab = 3;

            //Create chart
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

            //Add to graphs
            graphs.push(graph);
            graphs.push(table_graph);
          }); 
      }

      this.loadTeamCommitHistoryGraph = function(graphs, interval, datestart, dateend) {
          var graph = {};
          graph.startdate = new Date();
          graph.enddate = graph.startdate;
          graph.member = graph.member;
          graph.tab = 1;
          graph.hasStartDate = 1;
          graph.hasEndDate = 1;
          graph.hasMember = 1;
          graph.init = 0;
          graph.lockUpdate = 0;
          graphs.push(graph);

          graph.refresh = function(add) {
            graph.lockUpdate = 1;
            if (graph.startdate != graph.enddate) {
              datestart = moment(graph.startdate).locale('en').format('DDMMYY');
              dateend = moment(graph.enddate).locale('en').format('DDMMYY');
            }
            interval = "week";
            if (graph.member == "") {
              member = null;
            } else {
              member = graph.member;
            }
            DataService.getTeamCommitHistory(user, repo, member, interval, datestart, dateend).then(function(d){
              var json_res = d;
              var title = "Team Commit History";

              //Create chart
              var data = [];
              var series = [];
              var labels = json_res.labels;
              for (i = 0; i < json_res.history.length; i++) {
                series.push(json_res.history[i].member);
                data.push(json_res.history[i].commits);
              }
              graph.content = ChartFactory.createChart(title, data, labels, series, "bar", false);
              graph.content.show_legend = 0;
              graph.lockUpdate = 0;
            });
          };
      }

      this.loadFileCommitHistoryGraph = function(graphs) {
          var graph = {};
          graph.hasUpdateChart = 1;
          graph.tab = 2;
          graph.filepath = "";
          graph.hasFileName = 1;
          graph.lockUpdate = 0;
          graph.refresh = function(add) {
            var fp = graph.filepath;
            var sline = graph.startline;
            var eline = graph.endline;
            graph.lockUpdate = 1;
            DataService.getFileCommitHistory(user, repo, fp, sline, eline).then(function(d){
              var json_res = d;

              //Create chart
              var title = "Commit History - " + json_res.filename;
              var data = [];
              var series = [];
              var labels = ["Message", "Member"];
              for (i = 0; i < json_res.history.length; i++) {
                data.push([json_res.history[i].message, json_res.history[i].member]);
                series.push("Commit " + i);
              }
              graph.content = ChartFactory.createDataTable(title, data, labels, series, false);
              graph.lockUpdate = 0;
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
