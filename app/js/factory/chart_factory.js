app.factory('ChartFactory', function() {
  return {
    createChart : function(title, data, labels, series, chart_type, only_one_series_active) {
      var chart = {};
      chart.title = title;
      chart.shown_amt = 0;
      chart.is_table = 0;
      chart.show_legend = 1;
      chart.data = data;
      chart.labels = labels;
      chart.chart_type = chart_type || "line";
      chart["actual_data"] = data || [
        [65, 59, 80, 81, 56, 55, 40],
        [35, 39, 30, 31, 36, 35, 30],
        [28, 48, 40, 19, 86, 27, 90]
      ];
      chart["labels"] = labels || ["January", "February", "March", "April", "May", "June", "July"];
        chart["actual_series"] = series || ['Series A', 'Series B', 'Series C'];

      chart["data"] = chart["actual_data"];
      if (!only_one_series_active) {
        chart["series"] = chart["actual_series"];
      } else {
        chart["series"] = null;
        chart["data"] = chart["actual_data"][0];
      }

      chart["legend_status"] = {};

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
        if (only_one_series_active) {
          for (series in chart["legend_status"]) {
            chart["legend_status"][series] = false;
          }
          chart["legend_status"][index] = !chart["legend_status"][index];
          chart["data"] = chart["actual_data"][index];
        } else {
          chart["data"] = [];
          chart["series"] = [];
          for (series in chart["legend_status"]) {
            if (chart["legend_status"][series]) {
              chart["data"].push(chart["actual_data"][series]);
              chart["series"].push(chart["actual_series"][series]);
            }
          }
        }
      }

      for (series in chart["actual_series"]) {
        chart["legend_status"][series] = true;
        chart.shown_amt += 1;
        if (only_one_series_active) {
          chart.toggleSeries(0);
          break;
        }
      }
      return chart;
    },
    createDataTable : function(title, data, labels, series, only_one_series_active) {
      var chart = {};
      chart.title = title;
      chart.shown_amt = 0;
      chart.is_table = 1;
      chart.show_legend = 0;
      chart.data = data;
      chart.labels = labels;
      chart["actual_data"] = data || [
        [65, 59, 80, 81, 56, 55, 40],
        [35, 39, 30, 31, 36, 35, 30],
        [28, 48, 40, 19, 86, 27, 90]
      ];
      chart["labels"] = labels || ["January", "February", "March", "April", "May", "June", "July"];
        chart["actual_series"] = series || ['Series A', 'Series B', 'Series C'];

      chart["data"] = chart["actual_data"];
      if (!only_one_series_active) {
        chart["series"] = chart["actual_series"];
      } else {
        chart["series"] = null;
        chart["data"] = chart["actual_data"][0];
      }
      chart["legend_status"] = {};
      return chart;
    }
  }
});
