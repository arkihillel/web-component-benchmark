module.exports = data => {
	return `
		<!DOCTYPE html>
		<html>
		    <head>
		        <title>
		        </title>
		    </head>
		    <body>
		        <style>
		         	#container {
					  min-width: 310px;
					  max-width: 100%;
					  height: 800px;
					  margin: 0 auto
					}
		        </style>
		        
		        <script src="https://code.highcharts.com/highcharts.js"></script>
		        <script src="https://code.highcharts.com/modules/series-label.js"></script>
		        <script src="https://code.highcharts.com/modules/exporting.js"></script>
		        
		        <div id="container"></div>
		        <script>
		            Highcharts.chart('container', {

					  title: {
					    text: 'web component benchmark'
					  },

					  chart: {
					  	type: 'line'
					  },

					  yAxis: {
					    title: {
					      text: 'milliseconds'
					    }
					  },

					  legend: {
					    layout: 'vertical',
					    align: 'right',
					    verticalAlign: 'middle'
					  },

					  plotOptions: {
					    series: {
					      label: {
					        connectorAllowed: false
					      },
					      pointStart: 1
					    }
					  },

					  series: ${data},

					  responsive: {
					    rules: [{
					      condition: {
					        maxWidth: 500
					      },
					      chartOptions: {
					        legend: {
					          layout: 'horizontal',
					          align: 'center',
					          verticalAlign: 'bottom'
					        }
					      }
					    }]
					  }

					});
		        </script>
		    </body>
		</html>
	`;
}