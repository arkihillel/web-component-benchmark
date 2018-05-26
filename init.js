const fs 			= require('fs');
const colors 		= require('colors');
const shelljs		= require('shelljs');

const writeConfig = (config, path) => {
	const frontConfiguration = {
		runs: config.runs, 
		components: config.components.map(component => {
			return {
				path: component, 
				name: component.split('/').slice(-1).join('').replace('.html', '').replace('.js', ''),
				type: component.split('.').slice(-1).join('')
			}
		}),
		times: config.times,
		baseline: config.baseline,
		path: config.path
	};

	fs.writeFileSync(`${path}/__benchmark_config.js`, `window.config = ${JSON.stringify(frontConfiguration)}`);
}

module.exports = config => {
	return new Promise((resolve, reject) => {
		console.log('Initialization'.bold);

		fs.symlinkSync(`${__dirname}/perf-lib/runner.html`, `${config.root}/__benchmark_runner.html`);
		fs.symlinkSync(`${__dirname}/perf-lib/harness.html`, `${config.root}/__benchmark_harness.html`);

		const bwr = fs.existsSync(`${config.root}/bower.json`) ? 
			JSON.parse(fs.readFileSync(`${config.root}/bower.json`)) : null;

		config.components = config.components || bwr.main;

		if(!Array.isArray(config.components))
			config.components = [config.components];

		writeConfig(config, `${config.root}`);

		return resolve(config);
	});
};