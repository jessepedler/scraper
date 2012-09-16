define([
    // Libraries.
    "jquery", "underscore", "backbone", "hogan",

    // Sub Views
    "view/result",

    // Template
    "plugin/text!template/main.html"


], function ($, _, Backbone, Hogan, ResultView, template) {

    'use strict';

    // Pre Render templates
    var compiledTemplate = Hogan.compile(template);

    console.debug("compiled temp", compiledTemplate);

    return Backbone.View.extend({

        initialize : function () {

            return this.render();

        },

        template: compiledTemplate,

        events : {
            "submit form" : "submit"
        },

        render : function () {

            this.$el.html(this.template.render());

            this.$results = this.$("#results");
            this.$url = this.$("#url");

            return this;

        },

        submit: function(e){

            e.stopPropagation();
            e.preventDefault();

            var result = new ResultView({
                url: this.$url.val()
            });

            this.$results.append(result.el);

            this.$url.val("");

        }

    });

});