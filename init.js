const fs 			= require('fs');
const colors 		= require('colors');
const shelljs		= require('shelljs');

const writeConfig = (config, path) => {
	const frontConfiguration = {
		runs: config.runs, 
		components: config.components, 
		times: config.times,
		baseline: config.baseline
	};

	fs.writeFileSync(`${path}/polyperf.js`, `window.config = ${JSON.stringify(frontConfiguration)}`);
}

const copy = config => {
	return new Promise((resolve, reject) => {
		shelljs.cp('-R', `${__dirname}/perf-lib/*`, `${config.path}`);
		shelljs.rm('-rf', `${config.path}/bower_components-*`);
		const bwr = JSON.parse(fs.readFileSync(`${config.path}/bower.json`))
		config.components = config.components || bwr.main;

		if(!Array.isArray(config.components))
			config.components = [config.components];

		writeConfig(config, `${config.path}`);
		config.name = bwr.name;

		return resolve(config);
	});
};

module.exports = config => {
	return new Promise((resolve, reject) => {
		console.log('Initialization'.bold);

		copy(config)
		.then(resolve)
		.catch(reject);
	});
};