'use strict';

var app = angular.module('GitGuardApp', [
  'lumx',
  'chart.js'
]).config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#E41000', '#FF7065'],
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        labels: {fontColor: "#ffffff"}, 
        display: true
      },
      scales: {
        xAxes: [{ 
          ticks: {
            fontColor: "#CCC"
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: "#CCC"
          }
        }]
      },
      pan: {
        enabled: true,
        mode: 'xy'
      },
      zoom: {
        enabled: true,
        mode: 'xy',
      }
    });
    ChartJsProvider.setOptions('pie', {
      scales: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            var allData = data.datasets[tooltipItem.datasetIndex].data;
            var tooltipLabel = data.labels[tooltipItem.index];
            var tooltipData = allData[tooltipItem.index];
            var total = 0;
            for (var i in allData) {
              total += allData[i];
            }
            var tooltipPercentage = Math.round((tooltipData / total) * 100);
            return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
          }
        }
      }
    });
}]);

//Helper functions
function get_user_repo_from_url(uri) {
  var breakdown = uri.match(/^((https|http):\/\/)*(www\.)*github.com\/[a-zA-Z0-9]*\/[a-zA-Z0-9\_\-\.]*$/);
  if (breakdown) {
    return uri.match(/[a-zA-Z0-9]*\/[a-zA-Z0-9\_\-\.]*$/)[0]; 
  }
  return null;
}
