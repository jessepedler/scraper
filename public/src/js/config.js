// Set the require.js configuration for your application.
require.config({

    baseUrl: './js',

    // Initialize the application with the main application file.
    deps   : ["app"],

    paths: {
        // JavaScript folders.
        libs: "libs",

        plugin: "require",

        view      : "view",

        // Libraries.
        jquery    : "libs/jquery/jquery-1.8.1",
        bootstrap : "libs/jquery/bootstrap.min",
        backbone  : "libs/backbone",
        underscore: "libs/underscore",
        hogan     : "libs/hogan-2.0.0",

        // templates
        template : "../template"
    },

    shim: {
        // Backbone library depends on lodash and jQuery.
        "backbone": {
            deps   : ["underscore", "jquery"],
            exports: "Backbone"
        },

        hogan: {
            exports: "Hogan"
        },

        underscore : {
            exports: "_"
        },

        //jQuery and plugins
        "jquery"   : {
            exports: "jQuery"
        },
        // Third party plugins that we commonly use everywher
        "bootstrap": {
            deps: ["jquery"]
        }

    }

});
