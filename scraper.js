var jsdom  = require('jsdom');
var fs     = require('fs');
var jquery = fs.readFileSync("./public/javascripts/jquery.js").toString();



jsdom.env({
    html: 'http://mashable.com/2012/09/14/alien-planets-life/',
    src: [
        jquery
    ],
    done: function(errors, window) {
        var $ = window.$;
        var og = [];

        console.log("title", $("title").text());
        console.log("meta:description", $("meta[name=description]").attr("content"));
        console.log("meta:keywords", $("meta[name=keywords]").attr("content"));

        $("meta[property^=og]").each(function(i, tem) {
            console.log("prop", tem.getAttribute('property'));
            console.log("content", tem.getAttribute('content'));
        });

    }
});

