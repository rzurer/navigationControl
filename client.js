/*jslint browser: true*/
/*global  window, localStorage, $*/
"use strict";
var common = require('./modules/common').common(),
	initializeNavigator = function () {
		window.navigator = require('./modules/navigator').navigator(common);
	},
	initialize = function () {
	    initializeNavigator();
	};
initialize();

