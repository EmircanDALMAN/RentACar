var should = require('should');
var mf = require('../index').median;

describe('median filter', function () {
    it('should return single element array unfiltered', function () {
        var t = [ 42.78 ];
        mf(t).should.eql(t);
    });

    it('should return two element array unfiltered', function () {
        var t = [ 42.78, 93 ];
        mf(t).should.eql(t);
    });

    it('should apply window=3 by default', function () {
        var t = [ 2, 3, 4, 9, 6, 2 ];
        var f = [ 2, 3, 4, 6, 6, 2 ];
        mf(t).should.eql(f);
    });
    it('should sort numbers', function() {
        var t = [14, 1500, 16, 18, 19];
        var f = [14, 16, 18, 18, 18];
        mf(t).should.eql(f);
    });
});
