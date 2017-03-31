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

      this.loadGraphs = function() {
          var graph = {};
          graph = ChartFactory.createLineChart();
          this.graphs.push(graph);
          graph2 = ChartFactory.createLineChart();
          this.graphs.push(graph2);
          graph3 = ChartFactory.createLineChart();
          this.graphs.push(graph3);
      };
};
