const serve 		= require('./serve');

module.exports = config => {
	return new Promise((resolve, reject) => {

		// const regressions = config.regressions.concat(['current']);
		const regressions = ['current'];

		config.waiting = {};

		for(let version of regressions) {
			config.waiting[version] = config.browser;
			// serve.start(config)
			// .then(console.log)
			return resolve(serve.start(config));
		}
	});
};