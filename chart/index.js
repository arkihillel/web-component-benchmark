const puppeteer = require('puppeteer');
const template = require('./template.js');

module.exports = async(data) => {
	return new Promise((resolve, reject) => {

		let series = [];

		for(let component in data.raw) {
			for (var i = 0; i < data.raw[component].length; i++) {
				series.push({
					name: `${component} (run ${i + 1})`,
					type: 'scatter',
					data: data.raw[component][i]
				});
			}
		}

		console.log(typeof puppeteer)

		// const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.setContent(template(series), {waitUntil: 'networkidle2'});
		await page.screenshot({path: 'example.png'});
		await browser.close();
	})
}
