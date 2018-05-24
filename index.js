#!/usr/bin/env node

const colors 	= require('colors');
const fs 		= require('fs');
const chart 	= require('asciichart');

const config 	= require('./cli');
const init 		= require('./init');
const clean 	= require('./clean');
const test		= require('./test');
const stats		= require('./stats');
	
let raw;

init(config)
.then(test)
.then(results => {
	raw = results
	if(config.verbose) console.log(JSON.stringify(results).grey)
	return stats(results, config.baseline)
})
.then(results => {
	if(config.output)
		fs.writeFileSync(config.output, JSON.stringify({raw, results}));

	for(let component in results){
		console.log(`\n\n${component.bold}\nmin: ${results[component].min}\nmax: ${results[component].max}\navg: ${results[component].avg}\nstdDev: ${results[component].stdDev}\nperformance: ${results[component].comp.toFixed(1)}x slower than ${config.baseline} \n\n `) 

		for (var i = 0; i < raw[component].length; i++) {
			console.log(`\nRun ${i + 1}\n`.underline);
			console.log(chart.plot(raw[component][i].slice(1)) + '\n');
		}
	}

})
.then(() => {
	// return clean(config)
})
.catch(err => {
	console.log(err);
	clean(config)
	process.exit(-1);
});
