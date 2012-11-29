/*global  describe, beforeEach, afterEach, it*/
"use strict";
var sinon = require('sinon'),
	assert = require('assert'),
	$ = require('jquery'),
	common = require('../modules/common').common(),
	eventListener = require('../modules/eventListener').eventListener(),
	sut = require('../modules/navigationControl').navigationControl(eventListener, common),
	ctrls,
	index,
	createInput = function (id) {
		var input =  $('<input/>');
		input.attr('id', id);
		return input;
	},
	setup = function () {
		index = 0;
		ctrls = {
			navigateFirstControl :  createInput('navigateFirstControl'),
			navigatePreviousControl  : createInput('navigatePreviousControl'),
			navigateNextControl  : createInput( 'navigateNextControl'),
			navigateLastControl  :  createInput('navigateLastControl'),
			removeCurrentControl  :  createInput('removeCurrentControl')
		};
	};
describe('navigationControl_module', function () {
	beforeEach(setup);
	describe('ready', function () {
		it("should fire setSourceArray event with array length of 0", function () {
			var spy = sinon.spy(eventListener, 'fire');
  			sut.ready(ctrls);
			eventListener.fire.restore();
			sinon.assert.calledWith(spy, 'setSourceArray', [0]);
		});
		it("should fire navigate event with current index of 0", function () {
			var spy = sinon.spy(eventListener, 'fire');
  			sut.ready(ctrls);
			eventListener.fire.restore();
			sinon.assert.calledWith(spy, 'navigate', [0]);
		});
		it("should disable controls", function () {
			var disableSpy = sinon.spy(common, 'disableControls');
  			sut.ready(ctrls);
			common.disableControls.restore();
			sinon.assert.calledWith(disableSpy, [
				ctrls.navigateFirstControl, 
				ctrls.navigatePreviousControl,
				ctrls.navigateNextControl,
				ctrls.navigateLastControl,
				ctrls.removeCurrentControl]); 
		});
	});
	describe('addListener', function () {
		it("should call eventListener addListener", function () {
			var spy = sinon.spy(eventListener, 'addListener'),
				func = function () {};
  			sut.addListener("test", func);
			eventListener.addListener.restore();
			sinon.assert.calledWith(spy, "test",func);
		});
	});
	describe("removeListener", function () {
		it("should call eventListener removeListener", function () {
			var spy = sinon.spy(eventListener, 'removeListener'),
				func = function () {};
  			sut.removeListener("test", func);
			eventListener.removeListener.restore();
			sinon.assert.calledWith(spy, "test", func);
		});
	});
	describe('setSourceArray', function () {
		beforeEach(function () {
			sut.ready(ctrls);			
		});
		describe('when array is undefined', function () {
			it("should disable controls", function () {
				var disableSpy = sinon.spy(common, 'disableControls');
				sut.setSourceArray();
				common.disableControls.restore();
				sinon.assert.calledWith(disableSpy, [
					ctrls.navigateFirstControl, 
					ctrls.navigatePreviousControl,
					ctrls.navigateNextControl,
					ctrls.navigateLastControl,
					ctrls.removeCurrentControl]);
			});
			it("should fire setSourceArray event with array length of 0", function () {
				var spy = sinon.spy(eventListener, 'fire');
				sut.setSourceArray();
				eventListener.fire.restore();
				sinon.assert.calledTwice(spy);
				sinon.assert.calledWith(spy, 'setSourceArray', [0]);
			});
			it("should fire navigate event with current index", function () {
				var spy = sinon.spy(eventListener, 'fire');
				sut.setSourceArray();
				eventListener.fire.restore();
				sinon.assert.calledTwice(spy);
				sinon.assert.calledWith(spy, 'navigate', [0]);
			});
		});
		describe('when array is empty', function () {
			var sourceArray = [];
			it("should disable controls", function () {
				var disableSpy = sinon.spy(common, 'disableControls');
				sut.setSourceArray(sourceArray);
				common.disableControls.restore();
				sinon.assert.calledWith(disableSpy, [
					ctrls.navigateFirstControl, 
					ctrls.navigatePreviousControl,
					ctrls.navigateNextControl,
					ctrls.navigateLastControl,
					ctrls.removeCurrentControl]); 
			});
			it("should fire setSourceArray event with array length of 0", function () {
				var spy = sinon.spy(eventListener, 'fire');
				sut.setSourceArray(sourceArray);
				eventListener.fire.restore();
				sinon.assert.calledTwice(spy);
				sinon.assert.calledWith(spy, 'setSourceArray', [0]);
			});
			it("should fire navigate event with current index", function () {
				var spy = sinon.spy(eventListener, 'fire');
				sut.setSourceArray();
				eventListener.fire.restore();
				sinon.assert.calledTwice(spy);
				sinon.assert.calledWith(spy, 'navigate', [0]);
			});
		});
		describe('when array has more than one element', function () {
			it("should do enable first, previous, next, last and remove controls", function () {
				var mock = sinon.mock(common);
				mock.expects("enableControl").withArgs(ctrls.navigateFirstControl);
				mock.expects("enableControl").withArgs(ctrls.navigatePreviousControl);
				mock.expects("enableControl").withArgs(ctrls.navigateNextControl);
				mock.expects("enableControl").withArgs(ctrls.navigateLastControl);
				mock.expects("enableControl").withArgs(ctrls.removeCurrentControl);
				sut.setSourceArray(['element1', 'element2', 'element3']);
				mock.verify();
				mock.restore();
			});
			it("should fire setSourceArray event with source array length", function () {
				var spy = sinon.spy(eventListener, 'fire');
				sut.setSourceArray(['element1', 'element2', 'element3']);
				eventListener.fire.restore();
				sinon.assert.calledTwice(spy);
				sinon.assert.calledWith(spy, 'setSourceArray', [3]);
			});

			it("should fire navigate event with current index", function () {
				var spy = sinon.spy(eventListener, 'fire');
				sut.setSourceArray(['element1', 'element2', 'element3']);
				ctrls.navigateNextControl.click();
				eventListener.fire.restore();
				sinon.assert.calledThrice(spy);
				sinon.assert.calledWith(spy, 'navigate', [1]);
			});
			describe('and current index is 0', function () {
				it("should disable first and previous controls", function () {
					var mock = sinon.mock(common);
					mock.expects("disableControls").withExactArgs( [
						ctrls.navigateFirstControl, 
						ctrls.navigatePreviousControl,
						ctrls.navigateNextControl,
						ctrls.navigateLastControl,
						ctrls.removeCurrentControl]).thrice();
					mock.expects("disableControls").withExactArgs([ctrls.navigateFirstControl, ctrls.navigatePreviousControl]).thrice();
					sut.setSourceArray(['element1', 'element2', 'element3']);
					ctrls.navigateFirstControl.click();
					sut.setSourceArray(['element1', 'element2', 'element3']);
					mock.verify();
					mock.restore();
				});
			});
			describe('and current index is greater than 0 and less than source array length - 1', function () {
				it("should not disable first and previous controls", function () {
					var mock = sinon.mock(common);
					mock.expects("disableControls").withExactArgs( [
						ctrls.navigateFirstControl, 
						ctrls.navigatePreviousControl,
						ctrls.navigateNextControl,
						ctrls.navigateLastControl,
						ctrls.removeCurrentControl]).exactly(3);
					 mock.expects("disableControls").withExactArgs([ctrls.navigateFirstControl, ctrls.navigatePreviousControl]).twice();
					 mock.expects("disableControls").withExactArgs([ctrls.navigateNextControl, ctrls.navigateLastControl]).never();
					sut.setSourceArray(['element1', 'element2', 'element3']);
					ctrls.navigateNextControl.click();
				    sut.setSourceArray(['element1', 'element2', 'element3']);
					mock.verify();
					mock.restore();
				});
			});
			describe('when current index is greater than 0 and equal to source array length - 1', function () {
				it("should disable last and next controls", function () {
					var mock = sinon.mock(common);
					mock.expects("disableControls").withExactArgs( [
						ctrls.navigateFirstControl, 
						ctrls.navigatePreviousControl,
						ctrls.navigateNextControl,
						ctrls.navigateLastControl,
						ctrls.removeCurrentControl]).exactly(3);
					mock.expects("disableControls").withExactArgs([ctrls.navigateFirstControl, ctrls.navigatePreviousControl]).once();
					mock.expects("disableControls").withExactArgs([ctrls.navigateNextControl, ctrls.navigateLastControl]).once();
					mock.expects("disableControls").withExactArgs([ctrls.navigateFirstControl, ctrls.navigatePreviousControl]).once();
					sut.setSourceArray(['element1', 'element2', 'element3']);
					ctrls.navigateLastControl.click();
					sut.setSourceArray(['element1', 'element2', 'element3']);
					mock.verify();
					mock.restore();
				});
			})
		});
	});
});