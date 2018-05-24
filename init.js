const fs 			= require('fs');
const colors 		= require('colors');
const shelljs		= require('shelljs');

const writeConfig = (config, path) => {
	const frontConfiguration = {
		runs: config.runs, 
		components: config.components, 
		times: config.times,
		baseline: config.baseline,
		path: config.path
	};

	fs.writeFileSync(`${path}/polyperf.js`, `window.config = ${JSON.stringify(frontConfiguration)}`);
}

module.exports = config => {
	return new Promise((resolve, reject) => {
		console.log('Initialization'.bold);

		// shelljs.cp('-R', `${__dirname}/perf-lib/*`, `${config.path}`);

		const bwr = fs.existsSync(`${config.path}/bower.json`) ? 
			JSON.parse(fs.readFileSync(`${config.path}/bower.json`)) : null;

		config.components = config.components || bwr.main;

		if(!Array.isArray(config.components))
			config.components = [config.components];

		writeConfig(config, `${config.path}`);
		// config.name = bwr.name;

		return resolve(config);
	});
};