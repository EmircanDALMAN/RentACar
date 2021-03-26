"use strict";

var filters = {};

function fact(a, b) {
    var n1 = Math.max(a, b);
    var n2 = Math.min(a, b);
    return (n1 - n2) / n1;
}

module.exports = function (arr, wl, thres) {
    function average(arr) {
        var acc = 0;
        for (var i = 0; i < arr.length; i++) {
            acc += arr[i];
        }
        return acc / arr.length;
    }

    wl = wl || 3;

    var w = [];
    var f = [];
    for (var i = 0; i < arr.length; i++) 
    {
        if (thres && w.length > 0 && fact(arr[i], w[w.length - 1]) > thres) {
            w = [];
        } else {
            if (w.length >= wl)
                w.shift();
        }
        w.push(arr[i]);

        f.push(average(w));
    }

    return f;
};

module.exports.difference = fact;

