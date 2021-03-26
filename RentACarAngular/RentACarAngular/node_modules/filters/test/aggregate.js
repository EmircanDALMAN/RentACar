var should = require('should');
var aggregate = require('../index').aggregate;

describe('aggregation', function () {
    it('should return the identity', function () {
        var o = [[1, 2], [3, 4], [5, 6], [7, 8]];
        var r = o.map(function (a) { return [a[0], {min:a[1], max:a[1], sum:a[1], med:a[1], cnt:1}] });
        aggregate(o, function (x) { return x; }).should.eql(r);
    });

    it('should return string keys', function () {
        var o = [[1, 2], [3, 4], [5, 6], [7, 8]];
        var r = o.map(function (a) { return [a[0] + 'a', {min:a[1], max:a[1], sum:a[1], med:a[1], cnt:1}] });
        aggregate(o, function (x) { return x + 'a'; }).should.eql(r);
    });

    it('should aggregate to one item', function () {
        var o = [[1, 2], [3, 4], [5, 6], [7, 8]];
        var r = [[0, {min:2, max:8, sum:2+4+6+8, med:6, cnt:4}]];
        aggregate(o, function (x) { return Math.floor(x / 10); }).should.eql(r);
    });

    it('should produce correct median', function () {
        var o = [[1, 20], [3, 14], [5, 140], [7, 92]];
        var a = aggregate(o, function (x) { return Math.floor(x / 10); });
        a[0][1].med.should.eql(92);
    });

    it('should handle negative values', function () {
        var o = [[1, -2], [3, -4], [5, -6], [6, 0], [7, -8]];
        var r = [[0, {min:-8, max:0, sum:-(2+4+6+8), med:-4, cnt:5}]];
        aggregate(o, function (x) { return Math.floor(x / 10); }).should.eql(r);
    });
});
