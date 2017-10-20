var webdriver = require('selenium-webdriver');
var SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;
var remoteHub = 'http://10.44.38.74:4545/wd/hub';



const buildDriver = remote => {
	if(remote)
		return new webdriver.Builder()
	            .usingServer(remoteHub)
			    .forBrowser('chrome')
			    .build();

	return new webdriver.Builder()
		    .forBrowser('chrome')
		    .build();
};


module.exports = (config, serverPid) => {
	return new Promise((resolve, reject) => {
		var driver = buildDriver(!config.local);

		console.log(`Launching Selenium against ${config.served}runner.html`)

		driver.get(`${config.served}runner.html`);


		var element = driver.findElement(webdriver.By.id('results'));
		var done = driver.findElement(webdriver.By.id('done'));

		driver.wait(webdriver.until.elementTextContains(done, 'done'), 3600000)

		// console.log('Come join the BBQ at Hillel\'s. Free beer!');

		element.getText().then(results => {
			driver.quit();
			process.kill(serverPid);
			return resolve(JSON.parse(results));
		});
	});
};