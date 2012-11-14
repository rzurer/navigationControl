"use strict";
exports.navigator = function (common) {
	var controls,
		specification,
		sourceArray = [],
		currentIndex = 0,
		navigateFirst = function () {
			currentIndex = 0;
			specification.navigateCallback(currentIndex);
		},
		navigateNext = function () {
			currentIndex = sourceArray.length > 0 ? currentIndex += 1 : 0;
			specification.navigateCallback(currentIndex);
		},
		navigateLast = function () {
			currentIndex = sourceArray.length > 0 ? sourceArray.length - 1 : 0;
			specification.navigateCallback(currentIndex);
		},
		navigatePrevious = function () {
			currentIndex = sourceArray.length > 0 ? currentIndex -= 1 : 0;
			specification.navigateCallback(currentIndex);
		},
		removeCurrent = function () {
			specification.removeCallback(currentIndex);
		},
		assignEventHandlers = function () {
			controls.navigateToFirstControl.click(navigateFirst);
			controls.navigateToPreviousControl.click(navigatePrevious);
			controls.navigateToNextControl.click(navigateNext);
			controls.navigateToLastControl.click(navigateLast);
		},
		that = {
			ready : function (ctrls, spec) {
				controls = ctrls;
				specification = spec;
				assignEventHandlers();
			},

		};
	return that;
};