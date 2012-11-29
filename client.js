/*jslint browser: true*/
/*global  window, localStorage, $*/
"use strict";
var common = require('./modules/common').common(),
	eventListener = require('./modules/eventListener').eventListener(),
	initializeNavigator = function () {
		window.navigationControl = require('./modules/navigationControl').navigationControl(eventListener, common);
	},
	initialize = function () {
	    initializeNavigator();
	};
initialize();

