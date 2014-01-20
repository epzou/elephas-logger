'use strict';

// TODO support clustering

var _ = require('lodash');
var util = require('util');

var Logger = function() {

  var self = this;

  self._logger = {};

};

Logger.prototype.get = function(category) {
  var self = this;
  return self._logger[category];
};

Logger.prototype.print = function() {
  var args = Array.prototype.slice.call(arguments);
  var items = [];
  _.each(args, function(item) {
    items.push(util.inspect(item, false, null));
  });
  console.log.apply(null, items);
};

Logger.prototype.configure = function(opts, cwd) {

  var self = this;

  var log4js = require('log4js');
  log4js.configure({ appenders: opts.appenders }, { cwd: cwd });
  _.each(opts.appenders, function(appender) {
    var logger = log4js.getLogger(appender.category);

    if (opts.level) {
      logger.setLevel(opts.level);
    }
    self._logger[appender.category] = logger;
  });

};

module.exports = new Logger();
