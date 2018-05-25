function standardDeviation(values){
  let avg = average(values);
  
  let squareDiffs = values.map(function(value){
	let diff = value - avg;
	let sqrDiff = diff * diff;
	return sqrDiff;
  });
  
  let avgSquareDiff = average(squareDiffs);

  let stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data){
	let sum = data.reduce(function(sum, value){
		return sum + value;
	}, 0);

	let avg = sum / data.length;
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