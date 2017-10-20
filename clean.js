const shelljs		= require('shelljs');

module.exports = config => {
	return new Promise((resolve, reject) => {
		if(!config['keep-copid-files']){
			console.log('Removing copied files...');
			shelljs.rm('-rf', `${__dirname}/tmp`);
			shelljs.rm('-rf', `${config.path}/wcp`);
			shelljs.rm('-f', `${config.path}/frame-tester.html`);
			shelljs.rm('-f', `${config.path}/frame-tester2.js`);
			shelljs.rm('-f', `${config.path}/harness.html`);
			shelljs.rm('-f', `${config.path}/runner.html`);
			shelljs.rm('-f', `${config.path}/perf.js`);
			shelljs.rm('-f', `${config.path}/polyperf.js`);
		}

		return resolve();
	});
};