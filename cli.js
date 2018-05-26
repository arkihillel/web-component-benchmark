const colors 	= require('colors');
const cli 		= require('command-line-args');
const path 		= require('path');

const cliDefinition = [
	{
		name: 'output',
		alias: 'o',
		type: String,
		description: 'Save the results to a JSON file'
	}, 
	// {
	// 	name: 'browser',
	// 	alias: 'b',
	// 	type: String,
	// 	defaultValue: [],
	// 	description: 'Browser against which the performance test will be run – Default: [chrome]'
	// },
	// {
	// 	name: 'all-browsers',
	// 	alias: 'a',
	// 	type: Boolean,
	// 	defaultValue: false,
	// 	description: 'Runs against all avaliable browsers'
	// },
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
		name: 'quiet',
		alias: 'q',
		type: Boolean,
		defaultValue: false,
		description: 'Silence output'
	}, 
	{
		name: 'root',
		type: String,
		defaultValue: process.cwd(),
		description: 'Root of the project (defaults to current location)'
	}, 
	{
		name: 'path',
		alias: 'p',
		type: String,
		defaultValue: process.cwd(),
		description: 'Path to the component (defaults to current location)'
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
	},
	{
		name: 'easter',
		type: Boolean,
		defaultValue: false
	}  
];

const config = cli(cliDefinition);


if (config.help) {
	const getUsage = require('command-line-usage');

	// hide the easter egg
	cliDefinition.splice(cliDefinition.length - 1, 1);

	const sections = [{
		header: 'Web Component Benchmark',
		content: 'Benchmarks Web Components by running them multiple time'
	}, {
		header: 'Options',
		optionList: cliDefinition
	}];

	const usage = getUsage(sections);

	console.log(usage);
	process.exit();
}

if (config.verbose) console.log(JSON.stringify(config, null, 2).grey);

config.root = path.resolve(process.cwd(), config.root);

if(!config.components.length) 
	config.components = null;
else
	config.components = config.components.map(component => 
		`${path.resolve(config.root, component).replace(config.root + '/', '')}`
	);

config.regressions = config['regression-testing'];

module.exports = config;