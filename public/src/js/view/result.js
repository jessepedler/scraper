define([
    // Libraries.
    "jquery", "underscore", "backbone", "hogan",

    // Template
    "plugin/text!template/result.html"


], function ($, _, Backbone, Hogan, template) {

    'use strict';

    // Pre Render templates
    var compiledTemplate = Hogan.compile(template);

    return Backbone.View.extend({

        initialize: function () {

            this.render();

            $.ajax({
                type    : 'POST',
                url     : "/scrape",
                data    : {
                    url: this.options.url
                },
                success : _.bind(this.renderResults, this),
                dataType: "json"
            });

            return this;

        },

        template: compiledTemplate,

        render: function () {

            this.$el.html(this.template.render({
                url: this.options.url
            }));

            this.$alert = this.$(".alert.alert-info");

            return this;

        },

        renderResults : function(data){

            console.debug("data", data);

        }
    });

});