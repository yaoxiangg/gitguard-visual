app.factory('RepoFactory', function($http, ChartFactory){
  return {
    createRepository : function(url, title) {
      return new Repository(url, ChartFactory);
    }
  }
});

function Repository(url, ChartFactory) {
      this.url = url;
      this.title = "test";
      this.graphs = [];

      this.loadContributionGraph = function() {
          var result = '{"contributions": [{"member": "John","commits": 10,"insertions": 280,"deletions": 100},{"member": "May","commits": 20,"insertions": 100,"deletions": 200},{"member": "Mary","commits": 2,"insertions": 20,"deletions": 175}]}';
          var json_res = JSON.parse(result);
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
          graph = ChartFactory.createChart(data, labels, series, "pie", true);
          this.graphs.push(graph);
      }
      this.loadGraphs = function() {
          this.loadContributionGraph();
          var graph = {};
          graph = ChartFactory.createChart(null,null,null,"bar" ,false);
          this.graphs.push(graph);
          graph2 = ChartFactory.createChart();
          this.graphs.push(graph2);
          graph3 = ChartFactory.createChart();
          this.graphs.push(graph3);
      };

};
