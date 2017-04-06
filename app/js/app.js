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
      }
    });
    ChartJsProvider.setOptions('pie', {
      scales: {
        display: false
      }
    });
}]);

//Helper functions
function get_repo_from_url(uri) {
  var breakdown = uri.match(/^((https|http):\/\/)*(www\.)*github.com\/[a-zA-Z0-9]*\/[a-zA-Z0-9]*$/);
  if (breakdown) {
    return uri.match(/[a-zA-Z0-9]*\/[a-zA-Z0-9]*$/)[0]; 
  }
  return null;
}
