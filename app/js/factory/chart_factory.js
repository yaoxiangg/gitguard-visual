app.factory('ChartFactory', function() {
  return {
    createLineChart : function(data, labels, series) {
      var chart = {};
      chart.shown_amt = 0;
      chart.data = data;
      chart.labels = labels;
      chart.chart_type = "line";
      chart.series = series;
      chart["actual_data"] = data || [
        [65, 59, 80, 81, 56, 55, 40],
        [35, 39, 30, 31, 36, 35, 30],
        [28, 48, 40, 19, 86, 27, 90]
      ];
      chart["labels"] = labels || ["January", "February", "March", "April", "May", "June", "July"];
      chart["actual_series"] = series || ['Series A', 'Series B', 'Series C'];

      chart["data"] = chart["actual_data"];
      chart["series"] = chart["actual_series"];

      chart["legend_status"] = {};
      for (series in chart["actual_series"]) {
        chart["legend_status"][series] = true;
        chart.shown_amt += 1;
      }

      chart.toggleSeries = function(index) {
        if (!chart["legend_status"][index]) {
          if (chart.shown_amt == 1) {
            chart["legend_status"][index] = !chart["legend_status"][index];
            return;
          } else {
            chart.shown_amt -= 1;
          }
        } else {
          chart.shown_amt += 1;
        }

        chart["data"] = [];
        chart["series"] = [];
        for (series in chart["legend_status"]) {
          if (chart["legend_status"][series]) {
            chart["data"].push(chart["actual_data"][series]);
            chart["series"].push(chart["actual_series"][series]);
          }
        }
      }
      return chart;
    }
  }
});
