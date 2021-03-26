// The MIT License
// 
// Copyright (c) 2011 Votizen Inc.
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var stream = require('stream'),
    util   = require('util');

/**
 * FilterStream is a pipe-able object with an over-writable `write` method which
 * allows all sorts of data transformation / handling before piping to another stream.
 *
 * You can either create a new instance then overwrite the `write` method, or inherit
 * from the FilterStream prototype, then create a new write method.
 *
 * @constructor
 * @extends {Stream}
 * @param {Function} writeMethod: (Optional) specify a write method as an shortcut.
 */
var FilterStream = function FilterStream (writeMethod) {
  var self      = this;
  this.source   = null;
  this.paused   = false;
  this.encoding = null;
  this.writable = true;
  this.readable = true;

  this.on('pipe', function (source) {
    self.setupStream(source);
  });

  if (writeMethod) {
    this.write = writeMethod;
  }
};

util.inherits(FilterStream, stream.Stream);

module.exports = FilterStream;

/**
 * Set encoding
 *
 * @param {String} encoding: The encoding type to set to.
 */
FilterStream.prototype.setEncoding = function (encoding) {
  this.encoding = encoding;
};

/**
 * Setup a source stream.
 *
 * @param {Stream} source
 */
FilterStream.prototype.setupStream = function (source) {
  this.source = source;

  if (this.encoding) {
    source.setEncoding(encoding);
  }
  if (this.paused) {
    source.pause();
  }

  this.writable = true;

  return this;
};

/**
 * Try to stop emitting data.
 */
FilterStream.prototype.pause = function () {
  this.paused = true;

  if (this.source) {
    return this.source.pause();
  }

  return true;
};

/**
 * Try to resume emitting data.
 */
FilterStream.prototype.resume = function () {
  this.paused = false;

  if (this.source) {
    return this.source.resume();
  }

  return true;
};

/**
 * When piped to this method is called.
 *
 * @param {Mixed} data: Depends on what stream / data is being piped to the stream.
 */
FilterStream.prototype.write = function (data) {
  this.emit('data', data);

  return true;
};

/**
 * End method called by pipe()
 */
FilterStream.prototype.end = function () {
  this.writable = false;
  this.readable = false;
  this.emit('end');
  this.emit('close');
};
