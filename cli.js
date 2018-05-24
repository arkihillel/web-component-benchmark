const colors 	= require('colors');
const cli 		= require('command-line-args');

const cliDefinition = [
	{
		name: 'output',
		alias: 'o',
		type: String,
		description: 'Save the results to a JSON file'
	}, 
	{
		name: 'browser',
		alias: 'b',
		type: String,
		defaultValue: [],
		description: 'Browser against which the performance test will be run – Default: [chrome]'
	},
	{
		name: 'all-browsers',
		alias: 'a',
		type: Boolean,
		defaultValue: false,
		description: 'Runs against all avaliable browsers'
	},
	{
		name: 'runs',
		type: Number,
		defaultValue: 10,
		description: 'Number of times the harness run (defaults to 10)'
	},
	{
		name: 'times',
		type: Number,
		defaultValue: 100,
		description: 'Number of times the element is instantiated per harness run (defaults to 100)'
	},
	{
		name: 'baseline',
		type: String,
		defaultValue: 'input',
		description: 'Base native HTML tag against which performence will be measured (defaults to input)'
	},
	{
		name: 'components',
		alias: 'c',
		type: String,
		multiple: true,
		defaultValue: [],
		description: 'Which components you want to benchmark (defaults to the content of bower.json "main" entry)'
	},
	{
		name: 'hub',
		type: String,
		defaultValue: false,
		description: 'Remote selenium hub address (leave empty for local)'
	},
	{
		name: 'regression-testing',
		alias: 'r',
		type: String,
		multiple: true,
		defaultValue: [],
		description: `Tests against a previous version of the component
- "last" – Last Git tag
- "tags/[xxx]" – compares against a specific Git tag
- [commit-hash] – compares against a specific Git commit`
	},
	{
		name: 'quiet',
		alias: 'q',
		type: Boolean,
		defaultValue: false,
		description: 'Silence output'
	}, 
	{
		name: 'path',
		alias: 'p',
		type: String,
		defaultValue: process.cwd(),
		description: 'Path to the component'
	}, 
	{
		name: 'verbose',
		alias: 'v',
		type: Boolean,
		defaultValue: false,
		description: 'Verbose mode'
	},  
	{
		name: 'help',
		alias: 'h',
		type: Boolean,
		description: 'This page'
	}
];

const config = cli(cliDefinition);


if (config.help) {
	const getUsage = require('command-line-usage');

	const sections = [{
		header: 'Web Component Benchmark',
		content: 'Benchmarks Web Components by running them multiple time'
	}, {
		header: 'Options',
		optionList: cliDefinition
	}]
	const usage = getUsage(sections);

	console.log(usage);
	process.exit();
}

if (config.verbose) console.log(JSON.stringify(config, null, 2).grey);

if(!config.components.length) 
	config.components = null;
else
	config.components = config.components.map(component => `${component}.html`)

config.regressions = config['regression-testing'];

module.exports = config;