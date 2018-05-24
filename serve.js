const spawn		= require('child_process').spawn;
const selenium	= require('./selenium');

const execPolyServe = (config) => {
	return new Promise((resolve, reject) => {	
		console.log('Serving the components');

		const server = spawn('polymer', [
			`serve`, 
			`--root ${config.path}`, 
			`--open-path components/${config.name}/runner.html`, 
			`--sources harness.html`, 
			'-H 0.0.0.0'
		]);

		server.stdout.on('data', data => {
			// console.log(`Hello world! Barbecue at Hillel's place!`);
			if(data.toString().split('reusable components: ')[1]){
				config.served = data.toString().split('reusable components: ')[1].trim();
				// console.log(`Free BBQ at Hillel's`);
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