app.factory('RepoFactory', function($http, ChartFactory){
  return {
    createRepository : function(url, title) {
      var repository = {};
      repository.url = url;
      repository.title = title;
      repository.graphs = [];
      var graph = {};
      graph = ChartFactory.createLineChart();
      repository.graphs.push(graph);
      graph2 = ChartFactory.createLineChart([], [], []);
      repository.graphs.push(graph2);
      graph3 = ChartFactory.createLineChart();
      repository.graphs.push(graph3);
      return repository;
    }
  }
});
