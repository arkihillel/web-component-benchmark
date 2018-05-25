# web-component-benchmark - alpha 1

A tool that aims to provide benchmarks for Polymer 2 web components
The benchmark is simply made by measuring the time it takes to instantiate a component.
It runs multiple times in order to get statiscally significant results

An ASCII chart and statistics are generated

This theoretically also allows detecting memory leaks like the one on [paper-input-char-counter](http://jsfiddle.net/mnxfh4Lq/)

## Installation

```bash
npm i -g web-component-benchmark
```

## Example

```bash
wcb -c paper-input
```

## Usage

```bash
-o, --output string                 Save the results to a JSON file                                               
--runs number                       Number of times the harness run (defaults to 10)                              
--times number                      Number of times the element is instantiated per harness run (defaults to 100) 
--baseline string                   Base native HTML tag against which performence will be measured (defaults to  
                                    input)                                                                        
-c, --components string[]           Which components you want to benchmark (defaults to the content of bower.json 
                                    "main" entry)                                                                 
--hub string                        Remote selenium hub address (leave empty for local)                           
-q, --quiet                         Silence output                                                                
-p, --path string                   Path to the component                                                         
-v, --verbose                       Verbose mode                                                                  
-h, --help                          This page 
```

## Future releases

This is still an alpha tool, multiple issues are still to be solved:
- Support Polymer 1 and 3 as well as vanilla components and lit elements
- Support all the common browsers
- Pass the benchmark runner and its dependencies as a data/html string instead of copying them over and removing them
- Tests!
- I'm currently considering regression testing for use in a CI environment

Help and feature requests are very welcome