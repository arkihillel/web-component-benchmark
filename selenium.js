let webdriver = require('selenium-webdriver');
let SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;

const buildDriver = hub => {
	if(hub)
		return new webdriver.Builder()
		.usingServer(hub)
		.forBrowser('chrome')
		.build();

	return new webdriver.Builder()
	.forBrowser('chrome')
	.build();
};


module.exports = (config, serverPid) => {
	return new Promise((resolve, reject) => {
		let driver = buildDriver(config.hub);

		console.log(`Launching Selenium against ${config.served}__benchmark_runner.html`)

		driver.get(`${config.served}__benchmark_runner.html`);


		let element = driver.findElement(webdriver.By.id('results'));
		let done = driver.findElement(webdriver.By.id('done'));

		driver.wait(webdriver.until.elementTextContains(done, 'done'), 3600000)

		if(config.easter)
			console.log('Come join the BBQ at Hillel\'s. Free beer!');

		element.getText().then(results => {
			driver.quit();
			process.kill(serverPid);
			return resolve(JSON.parse(results));
		});
	});
};