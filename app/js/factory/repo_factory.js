app.factory('RepoFactory', function($http, ChartFactory){
  return {
    createRepository : function(url, title) {
      return new Repository(url, title, ChartFactory);
    }
  }
});

function Repository(url, title, ChartFactory) {
      this.url = url;
      this.title = title || "Unknown";
      this.graphs = [];

      this.loadContributionGraph = function(c_type) {
          var result = '{"contributions": [{"member": "John","commits": 10,"insertions": 280,"deletions": 100},{"member": "May","commits": 20,"insertions": 100,"deletions": 200},{"member": "Mary","commits": 2,"insertions": 20,"deletions": 175}]}';
          var json_res = JSON.parse(result);
          var title = "Total Contributions";
          var type = c_type || "pie";
          var graph = {};
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
          graph = ChartFactory.createChart(title, data, labels, series, type, true);
          this.graphs.push(graph);
      }

      this.loadTeamCommitHistoryGraph = function() {
          var result = '{"interval": "month","labels": ["01-01-17", "02-01-17", "03-01-17", "04-01-17"],"history": [{"member": "John","commits": [0, 1, 0, 10]},{"member": "May","commits": [2, 1, 1, 0]},{"member": "Mary","commits": [3, 1, 5, 10]}]}'
          var json_res = JSON.parse(result);
          var title = "Team Commit History";
          var graph = {};
          var data = [];
          var series = [];
          var labels = json_res.labels;
          for (i = 0; i < json_res.history.length; i++) {
            series.push(json_res.history[i].member);
            data.push(json_res.history[i].commits);
          }
          graph = ChartFactory.createChart(title, data, labels, series, "bar", false);
          this.graphs.push(graph);
      }

      this.loadFileCommitHistoryGraph = function() {
          var result = '{"filename": "/asda/adad.js", "history": [{"message": "Commit Message 1","member": "May"},{"message": "Commit Message 2","member": "John"},{"message": "Commit Message 3","member": "John"}]}';
          var json_res = JSON.parse(result);
          var title = "Commit History - " + json_res.filename;
          var graph = {};
          var data = [];
          var series = [];
          var labels = ["Message", "Member"];
          for (i = 0; i < json_res.history.length; i++) {
            data.push([json_res.history[i].message, json_res.history[i].member]);
            series.push("Commit " + i);
          }
          graph = ChartFactory.createDataTable(title, data, labels, series, false);
          this.graphs.push(graph);
      }

      this.loadGraphs = function() {
          this.loadContributionGraph();
          this.loadTeamCommitHistoryGraph();
          this.loadFileCommitHistoryGraph();
          var graph = {};
          graph = ChartFactory.createChart("Title", null,null,null,"bar" ,false);
          this.graphs.push(graph);
          graph2 = ChartFactory.createChart();
          this.graphs.push(graph2);
          graph3 = ChartFactory.createChart();
          this.graphs.push(graph3);
      };

};
