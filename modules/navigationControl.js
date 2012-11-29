"use strict";
exports.navigationControl = function (eventListener, common) {
	var controls,
		sourceArray,
		currentIndex,
		coordinateControls = function () {
			var removeCurrent = function () {
					sourceArray.splice(currentIndex, 1);
					if (currentIndex > 0) {
						currentIndex -= 1;
					}
					coordinateControls();
					eventListener.fire('removeCurrent', [sourceArray.length]);
				},
				first = function () {
					currentIndex = 0;
					coordinateControls();
				},
				next = function () {
					currentIndex = sourceArray.length > 0 ? currentIndex += 1 : 0;
					coordinateControls();
				},
				last = function () {
					currentIndex = sourceArray.length > 0 ? sourceArray.length - 1 : 0;
					coordinateControls();
				},
				previous = function () {
					currentIndex = sourceArray.length > 0 ? currentIndex -= 1 : 0;
					coordinateControls();
				};
			eventListener.fire('navigate', [currentIndex]);
			common.disableControls([
				controls.navigateFirstControl,
				controls.navigatePreviousControl,
				controls.navigateNextControl,
				controls.navigateLastControl,
				controls.removeCurrentControl,
			]);
			if (!sourceArray || sourceArray.length < 1) {
				return;
			}
			if (sourceArray.length === 1) {
				common.enableControl(controls.removeCurrentControl, removeCurrent);
				return;
			}
			common.enableControl(controls.navigateFirstControl, first);
			common.enableControl(controls.navigatePreviousControl, previous);
			common.enableControl(controls.navigateNextControl, next);
			common.enableControl(controls.navigateLastControl, last);
			common.enableControl(controls.removeCurrentControl, removeCurrent);
			if (currentIndex === 0) {
				common.disableControls([controls.navigateFirstControl, controls.navigatePreviousControl]);
				return;
			}
			if (currentIndex === sourceArray.length - 1) {
				common.disableControls([controls.navigateNextControl, controls.navigateLastControl]);
			}
		},
		that = {
			addListener : function (type, listener) {
				eventListener.addListener(type, listener);
			},
			removeListener : function (type, listener) {
				eventListener.removeListener(type, listener);
			},
			ready : function (ctrls) {
				currentIndex = 0;
				sourceArray = [];
				controls = ctrls;
				coordinateControls();
				eventListener.fire('setSourceArray', [0]);
			},
			setSourceArray : function (array) {
				currentIndex = 0;
				sourceArray = array || [];
				coordinateControls();
				eventListener.fire('setSourceArray', [sourceArray.length]);
			}
		};
	return that;
};