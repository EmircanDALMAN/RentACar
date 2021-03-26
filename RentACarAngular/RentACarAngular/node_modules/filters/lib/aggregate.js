"use strict";

module.exports = function aggregate(arr, fun) {
    var tmp = Object.create(null);
    for (var i = 0; i < arr.length; i++) {
        var k = fun(arr[i][0]);
        var v = arr[i][1];

        var t = tmp[k] || [];
        t.push(v);
        tmp[k] = t;
    }

    var res = [];
    for (var key in tmp) {
        var d = tmp[key];
        d.sort(function (a, b) { return a - b; });
        var min = Math.min.apply(null, d);
        var max = Math.max.apply(null, d);
        var sum = d.reduce(function (a, b) { return a + b; }, 0);
        var med = d[Math.floor(d.length / 2)];
        // If it looks like a numeric key, make it one
        if ('' + (+key) === key) {
            key = +key;
        }
        res.push([key, {min:min, max:max, sum:sum, med:med, cnt:d.length}]);
    }

    return res;
};
