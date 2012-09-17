define([
    // Libraries.
    "jquery", "underscore", "backbone", "hogan",

    // Template
    "plugin/text!template/result.html",
    "plugin/text!template/og.html",
    "plugin/text!template/meta.html",
    "plugin/text!template/success.html",
    "plugin/text!template/other.html",
    "plugin/text!template/images.html"


], function ($, _, Backbone, Hogan, template, ogTemplate, metaTemplate, successTemplate, otherTemplate, imagesTemplate) {

    'use strict';

    // Pre Render templates
    var compiledTemplate = Hogan.compile(template);
    var compiledOGTemplate = Hogan.compile(ogTemplate);
    var compiledMetaTemplate = Hogan.compile(metaTemplate);
    var compiledSuccessTemplate = Hogan.compile(successTemplate);
    var compiledOtherTemplate = Hogan.compile(otherTemplate);
    var compiledImagesTemplate = Hogan.compile(imagesTemplate);

    return Backbone.View.extend({

        initialize: function () {

            this.render();

            $.ajax({
                type       : 'POST',
                url        : "/scrape",
                data       : JSON.stringify({
                    url: this.options.url
                }),
                contentType: "application/json",
                success    : _.bind(this.renderResults, this),
                dataType   : "json"
            });

            return this;

        },

        template: compiledTemplate,

        render: function () {

            this.$el.html(this.template.render({
                url: this.options.url
            }));

            this.$alert = this.$(".alert.alert-info");
            this.$og = this.$(".og-results");
            this.$meta = this.$(".meta-results");
            this.$images = this.$(".img-results");
            this.$other = this.$(".other-results");

            return this;

        },

        renderResults: function (data) {

            var self = this;

            console.debug("data", data);

            this.$alert.replaceWith(compiledSuccessTemplate.render({
                url  : this.options.url,
                title: data.title
            }));

            if (!_.isEmpty(data.og)) {
                this.$og.html(compiledOGTemplate.render({
                    data: _.map(data.og, function (value, key) {
                        return {
                            key  : key,
                            value: value
                        };
                    })
                }));

                this.$og.find("td[data-type='image']").html(function (index, html) {
//                    var $ul = $("<ul/>").addClass("thumbnails");
//                    var $li = $("<li/>").addClass("span3").appendTo($ul);
//                    var $a = $("<a/>").attr({
//                        href  : html,
//                        target: "_blank"
//                    }).appendTo($li);
                    return $("<img/>").attr({
                        src: html
                    }).css("maxWidth", 160);
                });

                this.$og.find("td[data-type='url']").html(function (index, html) {
                    return $("<a/>").attr({
                        href  : html,
                        target: "_blank"
                    }).html(html);
                });

            }

            if (!_.isEmpty(data.meta)) {
                this.$meta.html(compiledMetaTemplate.render({
                    data: _.map(data.meta, function (value, key) {
                        return {
                            key  : key,
                            value: value
                        };
                    })
                }));
            }

            if (!_.isEmpty(data.html)) {
                this.$other.html(compiledOtherTemplate.render({
                    data: _.map(data.html, function (value, key) {
                        return {
                            key  : key,
                            value: value
                        };
                    })
                }));
            }

            if (!_.isEmpty(data.images)) {
                this.$images.html(compiledImagesTemplate.render({
                    images: data.images
                }));
            }

        }
    });

});