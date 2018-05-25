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

	fs.writeFileSync(`${path}/__benchmark_config.js`, `window.config = ${JSON.stringify(frontConfiguration)}`);
}

module.exports = config => {
	return new Promise((resolve, reject) => {
		console.log('Initialization'.bold);

		fs.symlinkSync(`${__dirname}/perf-lib/runner.html`, `${config.path}/__benchmark_runner.html`)
		fs.symlinkSync(`${__dirname}/perf-lib/harness.html`, `${config.path}/__benchmark_harness.html`)
		fs.symlinkSync(`${__dirname}/node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js`, `${config.path}/__benchmark_webcomponentsjs-lite.js`);
		fs.symlinkSync(`${__dirname}/node_modules/@polymer/polymer/polymer.html`, `${config.path}/__benchmark_polymer.html`);

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