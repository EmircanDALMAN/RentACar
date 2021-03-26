"use strict";

var filters = {};

module.exports = function (arr, wl) {
    function median(arr) {
        var s = arr.slice().sort(function(a,b){
            return a - b;
        });
        return s[Math.floor((s.length - 1) / 2)];
    }

    wl = wl || 3;

    if (arr.length < wl) {
        return arr;
    }

    var f = [];
    var w = [];
    var i;

    w.push(arr[0]);
    for (i = 0; i < arr.length; i++) 
    {
        if (arr.length - 1 >= i + Math.floor(wl / 2))
            w.push(arr[i + Math.floor(wl / 2)]);
        f.push(median(w));
        if (i >= Math.floor(wl / 2))
            w.shift();
    }

    return f;
};


