// Karma configuration

'use strict';

module.exports = function( config ) {
	config.set( {

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: [ 'ckeditor4-yui-to-chai', 'mocha' ],

		// list of files / patterns to load in the browser
		files: [
			{ pattern: 'ckeditor.js', included: true, served: true, watched: false, nocache: true },
			{ pattern: '+(core|plugins|skins|lang)/**/*', included: false, served: true, watched: false, nocache: true },
			{ pattern: '+(config|styles).js', included: false, served: true, watched: false, nocache: true },
			{ pattern: 'contents.css', included: false, served: true, watched: false, nocache: true },

			// Load all tests html files.
			// { pattern: 'tests/!(_*)/**/!(manual)/*.html', included: true, served: true, watched: false, nocache: true },

			'tests/_karma/init.js',
			'tests/_karma/**/*.js',

			// This test does not wait for CKEditor to fully initialize.
			// 'tests/core/ckeditor/*.html',
			// 'tests/core/ckeditor/ckeditor.js',
			// Working fine.
			'tests/core/creators/setmode.js',
			'tests/core/creators/themedui.js',
			'tests/core/tools/**/*.js',
			'tests/core/command/events.js',
			'tests/core/command/command.js',
			'tests/core/editable/aria.js'
		],


		// list of files to exclude
		exclude: [],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'tests/**/*.js': [ 'ckeditor4' ],
			'tests/**/*.html': [ 'html2js' ]
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: [ 'progress' ],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: [ 'Chrome' ],

		plugins: [
			'karma-mocha',
			'karma-chai',
			'karma-chrome-launcher',
			'karma-ckeditor4-yui-to-chai',
			'karma-ckeditor4-preprocessor',
			'karma-html2js-preprocessor'
		],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,
		// singleRun: true,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity,

		client: {
			useIframe: false,
			clearContext: true,
			__filenameOverride: __dirname + '/../index.html',
			timeout: 20000
		}
	} );
};
