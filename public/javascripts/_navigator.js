/*globals  $, window*/
"use strict";
var initializeNavigator = function () {
    $(function () {
        var ctrls = {
                defaultControl : $('#defaultImageCheckbox')
            },
            spec = {
                defaultControlTitle : 'This is the default control title'
            };
        window.navigator.ready(ctrls, spec);
    });
};