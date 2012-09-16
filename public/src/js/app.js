require([

    // Libraries
    "jquery", "underscore", "backbone", "hogan",

    // Base View
    "view/main"

    // Plugins

], function ($, _, Backbone, Hogan, MainView) {

    'use strict';
    console.debug("one two");

    $(function () {

        console.debug("are we in here yet?");

        var mainView = new MainView({
            el: $("#main")
        });

    });
});