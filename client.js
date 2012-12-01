/*jslint browser: true*/
/*global  window, localStorage, $*/
"use strict";
var common = require('../common/modules/common').common(),
	eventListener = require('../common/modules/eventListener').eventListener(),
	initializeNavigator = function () {
		window.navigationControl = require('./modules/navigationControl').navigationControl(eventListener, common);
	},
	initialize = function () {
	    initializeNavigator();
	};
initialize();

