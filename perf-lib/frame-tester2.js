	
(function() {
	'use strict';

	class FrameTester extends HTMLElement {
		static get observedAttributes() {
			return ['runs'];
		}

		static get template() {
			return `<style>

				    frame-tester {
				      display: block;
				      font-family: sans-serif;
				      overflow: hidden;
				    }

				    frame-tester iframe {
				      position: absolute;
				      border: 0;
				      width: 1920px;
				      height: 1080px;
				      left: -2000px;
				      top: -2000px;
				      visibility: hidden;
				      xdisplay: none;
				    }

				    frame-tester o, frame-tester n {
				      display: inline-block;
				      xwidth: 24px;
				      margin: 2px;
				      text-align: right;
				      font-family: monospace;
				    }

				    frame-tester o {
				      color: rgba(255, 0, 0, 0.5);
				    }

				    frame-tester n {
				      display: inline-block;
				      color: green;
				      font-weight: bold;
				    }

				    frame-tester .card {
				      padding: 16px;
				      box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
				                  0 3px 14px 2px rgba(0, 0, 0, 0.12),
				                  0 5px 5px -3px rgba(0, 0, 0, 0.4);
				      margin: 16px;
				      overflow: hidden;
				      background-color: #fff;
				    }

				  </style>

				  <div id="log"></div>

				  <div id="results"></div>

				  <div id="done"></div>

				  <iframe id="frame"></iframe>`;
		}

		constructor() {
			console.log('cons')
			super();
			this.runs = 25;
			this.base = '';
		}

		connectedCallback() {
			if(!this.shadowRoot) {
				this.attachShadow({mode: 'open'});
				this.shadowRoot.innerHTML = this.constructor.template;

				this.results = {};
				// debugger;
				this.frame = this.shadowRoot.querySelector('#frame');
				this.log = this.shadowRoot.querySelector('#log');
				this.resultsHTML = this.shadowRoot.querySelector('#results');
				this.done = this.shadowRoot.querySelector('#done');
				

				window.addEventListener('message', (e) => this.scoreMessage(e));
			}
		}

		get tests() {
		  return this._tests;
		}

		set tests(value) {
		  this._tests = value;
		  this.go();
		}

		shuffle(tests) {
		  var shuffled = [];
		  var ordered = tests.slice(0);
		  var count = ordered.length;
		  for (var i=0, j; i<count; i++) {
		    j = Math.floor(Math.random()*count);
		    // TODO(sjmiles): this is an easy but poorly randomized distribution
		    for (; !ordered[j]; j = (j + 1) % count);
		    shuffled.push(j);
		    ordered[j] = null;
		  }
		  return shuffled;
		}

		go() {
		  this.count = 0;
		  this.results = {};
		  this.tempResults = {};
		  this.total = [];
		  this.times = [];
		  this.infos = [];
		  for (var i=0; i<this.tests.length; i++) {
		    this.total[i] = 0;
		    this.times[i] = [];
		    this.results[this.tests[i].split('wc-element=')[1].split('&')[0]] = [];
		    this.tempResults[this.tests[i].split('wc-element=')[1].split('&')[0]] = [];
		  }
		  this.startRun();
		}

		startRun() {
		  this.shuffled = this.shuffle(this.tests);
		  this.index = -1;
		  //console.group('run', this.count);
		  this.nextTest();
		}

		nextTest() {
		  // last test in this run?
		  if (++this.index === this.tests.length) {
		    //console.groupEnd();
		    // report results
		    ++this.count;
		    this.report();
		    // more runs?
		    if (this.count < this.runs) {
		      this.startRun();
		    } else {
		      // all done!
		      this.dispatchEvent(new CustomEvent('done'));
		      this.resultsHTML.innerHTML = JSON.stringify(this.results);
		      this.done.innerHTML = 'done'
		    }
		    return;
		  }
		  // test order is randomized
		  this.test = this.shuffled[this.index];
		  this.frame.src = this.base + this.tests[this.test];
		  // it's possible for a test to end before the load event fires,
		  // so assume the frame loads immediately and start waiting
		  // for a result.
		  this.load();
		}

		load() {
		  // frame is loaded, measure the time, then proceed
		  this.measure(function(info) {
		    this.record(info);
		    this.nextTest();
		  });
		}

		measure(next) {
		  this.afterScore = next;
		}

		saveResults(e) {
		  const data = e.data;
		  this.results[data.info.name] = this.results[data.info.name] || [];
		  this.results[data.info.name].push(data.time);
		  console.log(this.results);
		}


		singleRecord(data) {
		  console.log('here');
		  console.log(data);
		  this.tempResults[data.info.name].push(data.time);
		  console.log(this.tempResults);
		}

		scoreMessage(e) {
		  if(e.data.type === 'single') {
		    return this.singleRecord(e.data);
		  }



		  if (this.afterScore) {
		    var info = e.data;
		    if (typeof info !== 'object') {
		      info = {time: info};
		    }
		    info.time = parseInt(info.time);
		    this.afterScore(info);
		  }
		}

		record(info) {
		  

		  // if(e.data.type === 'endedRun') {
		  if(true) {
		    this.results[info.element].push(this.tempResults[info.element].slice(0));
		    this.tempResults[info.element] = [];
		  }

		  console.log(this.tempResults)
		  console.log(this.results)

		  if (!this.infos[this.test]) {
		    this.infos[this.test] = info;
		  }
		  this.times[this.test].push(info.time || 0);
		  this.total[this.test] += info.time || 0;
		}

		report() {
		  var info = '<br>Runs: ' + this.count + '/' + this.runs + '<br><br>';
		  this.log.innerHTML = info;
		}

		stats(a) {
		  var r = {mean: 0, variance: 0, deviation: 0}, t = a.length;
		  for (var m, s = 0, l = t; l--; s += a[l]);
		  for (m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));
		  r.outlier = this.strategy.outlier;
		  return r.deviation = Math.sqrt(r.variance = s / t), r;
		}
	}

	customElements.define('frame-tester', FrameTester);
})();
