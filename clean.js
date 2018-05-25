const shelljs		= require('shelljs');

module.exports = config => {
	return new Promise((resolve, reject) => {
		if(!config['keep-copid-files']){
			console.log('Removing benchmark utility files...');
			shelljs.rm(`${config.path}/__benchmark_*`);
		}

		return resolve();
	});
};