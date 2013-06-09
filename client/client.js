/*jslint browser: true*/
/*global  window, localStorage, $*/
"use strict";
var initializeNavigator = function () {
        var common, eventListener;
        common = require('../modules/common').common();
        eventListener = require('../modules/eventListener').eventListener();
        window.navigationControl = require('../modules/navigationControl').navigationControl(eventListener, common);
    };
initializeNavigator();

