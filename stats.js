function standardDeviation(values){
  var avg = average(values);
  
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  
  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}

module.exports = (results, baseline) => {
	let stats = {};

	for(let component in results) {
		let compiled = [];

		for(let run of results[component])
			compiled = compiled.concat(run);

		stats[component] = {
			min: compiled.sort((a, b) => a - b)[0],
			max: compiled.sort((a, b) => a - b).slice(-1),
			avg: average(compiled),
			stdDev: standardDeviation(compiled),
			comp: (function() {
				if(component === baseline) return 1;
				return average(compiled) / stats[baseline].avg;
			}())
		};
	}

	return stats;
}