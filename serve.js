const spawn		= require('child_process').spawn;
const selenium	= require('./selenium');

const execPolyServe = (config) => {
	return new Promise((resolve, reject) => {	
		console.log('Serving the components');

		const server = spawn('polymer', [
			`serve`, 
			`--root ${config.root}`, 
			`--open-path ${config.root}/__benchmark_runner.html`, 
			`--sources __benchmark_harness.html`, 
			'-H 0.0.0.0'
		]);

		server.stdout.on('data', data => {
			if(data.toString().split('applications: ')[1]){
				config.served = data.toString().split('applications: ')[1].trim().split('\n')[0];
				return resolve(selenium(config, server.pid))
			}
		});
	})
};

const killPid = pid => {
	process.kill(-pid);
};

module.exports = {
	start: execPolyServe,
	stop: killPid
};

