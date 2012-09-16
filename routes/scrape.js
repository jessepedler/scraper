var jsdom = require('jsdom');
var fs = require('fs');
var jquery = fs.readFileSync("./public/src/js/libs/jquery/jquery-1.8.1.js").toString();
var _ = require("underscore");
/*
 * GET users listing.
 */

module.exports = function (req, res) {

    var url = req.body.url;
    if(url.indexOf("http") !== 0){
        url = "http://" + url;
    }

    jsdom.env({
        html: url,
        src : [
            jquery
        ],
        done: function (errors, window) {
            var $ = window.$;

            var ogProperties = ["site_name", "type", "url", "title", "description", "image"];
            var metaProperties = ["description", "keywords", "cononical"];

            var out = {
                title : "",
                og    : {},
                meta  : {},
                images: [],
                html : {}
            };

            out.title = $("title").html();

            _.each(ogProperties, function (prop) {
                out.og[prop] = $("meta[property='og:" + prop + "']").attr("content");
            });

            _.each(metaProperties, function (prop) {
                out.meta[prop] = $("meta[name='" + prop + "']").attr("content");
            });

            // Probably also want to grab the apple touch icons
            $("img").each(function(){

                var src = $(this).attr("src");

                if(src.indexOf("//") === 0){
                    src = "http://" + src;
                }

                if(src.indexOf("http") !== 0){
                    src = url + src;
                }

                out.images.push({
                    url: src
                });

            });

            out.html.h1 = $("h1").first().html();
            out.html.p = $("p").first().html();



//            $("meta[property^=og]").each(function(i, tem) {
//                console.log("prop", tem.getAttribute('property'));
//                console.log("content", tem.getAttribute('content'));
//            });
//
//
//            console.log("title", $("title").text());
//            console.log("meta:description", $("meta[name=description]").attr("content"));
//            console.log("meta:keywords", $("meta[name=keywords]").attr("content"));

            res.send(out);

        }
    });

};