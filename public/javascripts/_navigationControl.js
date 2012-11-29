/*globals  $, window*/
"use strict";
var initializeNavigator = function () {
	var navigationControl = window.navigationControl,
		setSourceArray = function(count){
			$('#sourceArrayLength').text('');
			var array = [];
			for (var i = 0; i < count; i++) {
				array.push(i);
			};
			navigationControl.setSourceArray(array);
		},
		onSetSourceArray = function (sourcArrayLength) {
			$('#sourceArrayLengthOutput').text(sourcArrayLength);
		
		},		
		onNavigate = function (currentIndex) {
			$('#currentIndexOutput').text(currentIndex);
		};
    $(function () {
        var controls = {
				navigateFirstControl :  $('#navigateFirst'),
				navigatePreviousControl :  $('#navigatePrevious'),
				navigateNextControl :  $('#navigateNext'),
				navigateLastControl :  $('#navigateLast'),
				removeCurrentControl :  $('#removeCurrent')
			};
        navigationControl.addListener('setSourceArray', onSetSourceArray)
        navigationControl.addListener('navigate', onNavigate)
        navigationControl.addListener('removeCurrent', onSetSourceArray)
        navigationControl.ready(controls);
        $('#setSourceArraySelect').change(function () {
        	var count = $(this).val();
        	setSourceArray(count);
    	});
    });
};