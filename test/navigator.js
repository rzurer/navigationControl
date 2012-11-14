/*global  describe, beforeEach, afterEach, it*/
"use strict";
var sinon = require('sinon'),
	assert = require('assert'),
	$ = require('jquery'),
	common = require('../modules/common').common(),
	sut = require('../modules/navigator').navigator(common),
	ctrls,
	spec,
	index,
	createInput = function () {
		return $('<input/>');
	},
	setup = function () {
		index = 0;
		ctrls = {
			navigateToFirstControl :  createInput(),
			navigateToPreviousControl  : createInput(),
			navigateToNextControl  : createInput(),
			navigateToLastControl  :  createInput(),
		};
		spec = {
			navigateCallback : function (currentIndex) {
				index = currentIndex;
			},
			removeCallback : function (currentIndex) {
				index = currentIndex;
			}
		};
	};
describe('navigator_module', function () {
	beforeEach(setup);
	describe('ready', function () {
		it("should assign navigateToFirstControl click event", function () {
			var spy = sinon.spy(spec, 'navigateCallback');
			sut.ready(ctrls, spec);
			ctrls.navigateToFirstControl.click();
			sinon.assert.calledOnce(spy);
			spec.navigateCallback.restore();
		});
		it("should assign navigateToPreviousControl click event", function () {
			var spy = sinon.spy(spec, 'navigateCallback');
			sut.ready(ctrls, spec);
			ctrls.navigateToPreviousControl.click();
			sinon.assert.calledOnce(spy);
			spec.navigateCallback.restore();
		});
		it("should assign navigateToNextControl click event", function () {
			var spy = sinon.spy(spec, 'navigateCallback');
			sut.ready(ctrls, spec);
			ctrls.navigateToNextControl.click();
			sinon.assert.calledOnce(spy);
			spec.navigateCallback.restore();
		});
		it("should assign navigateToLastControl click event", function () {
			var spy = sinon.spy(spec, 'navigateCallback');
			sut.ready(ctrls, spec);
			ctrls.navigateToNextControl.click();
			sinon.assert.calledOnce(spy);
			spec.navigateCallback.restore();
		});
	});
});