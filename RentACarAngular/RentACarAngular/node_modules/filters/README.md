filters [![build status](https://secure.travis-ci.org/calmh/node-filters.png)](http://travis-ci.org/calmh/node-filters)
=======

This module implements 1D noise reduction filters. There are currently two
available:

 - median filter

 - rolling average with threshold

median
------

```javascript
median(data, windowSize)
```

 - `data`: An array of numbers.

 - `windowSize`: The size of the window over which the median is applied.
   Should be an odd number greater than one, defaults to `3`.

### Example

```javascript
var median = require('filters').median;
var raw = [ 2, 3, 4, 9, 6, 2 ];
console.log(median(raw));
// => [ 2, 3, 4, 6, 6, 2 ]
```

average
-------

```javascript
average(data, windowSize, threshold)
```

 - `data`: An array of numbers.

 - `windowSize`: The size of the rolling average window. Should be two or
   greater, defaults to `3`.

 - `threshold`: Maximum difference between two numbers for the average still to
   be applied. Use this to smooth out small variations but large varitions
   through immediately. The difference between /a/ and /b/ is calculated as
   /(max(a, b) - min(a, b)) / max(a, b)/. No default.

### Example

```javascript
var median = require('filters').average;
var raw = [ 2, 3, 4, 9, 6, 2 ];
console.log(average(raw, 3, 0.5));
// => [ 2, 2.5, 3, 9, 7.5, 2 ]
```

License
-------

MIT

