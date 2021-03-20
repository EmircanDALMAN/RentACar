var should = require('should');
var avg = require('../index').average;

describe('threshold calculation', function () {
    it('should return 0 for identical numbers', function () {
        avg.difference(7, 7).should.equal(0);
    });

    it('should return 25% for the difference between 3 and 4', function () {
        avg.difference(3, 4).should.equal(0.25);
        avg.difference(4, 3).should.equal(0.25);
    });

    it('should return 0.5 for the difference between 360 and 720', function () {
        avg.difference(360, 720).should.equal(0.5);
        avg.difference(720, 360).should.equal(0.5);
    });

    it('should return 1.0 for the difference between 0 and 100', function () {
        avg.difference(0, 100).should.equal(1.0);
        avg.difference(100, 0).should.equal(1.0);
    });
});

describe('median filter', function () {
    it('should return single element array unfiltered', function () {
        var t = [ 42.78 ];
        avg(t).should.eql(t);
    });

    it('should apply window=3 by default', function () {
        var t = [ 2, 3, 4, 9, 6, 2 ];
        var f = [ 2, (2+3)/2, (2+3+4)/3, (3+4+9)/3, (4+9+6)/3, (9+6+2)/3 ];
        avg(t).should.eql(f);
    });

    it('should apply a 50% threshold', function () {
        var t = [ 2, 3, 4, 9, 6, 5 ];
        var f = [ 2, (2+3)/2, (2+3+4)/3, 9, (9+6)/2, (9+6+5)/3 ];
        avg(t, 3, 0.50).should.eql(f);
    });
});
