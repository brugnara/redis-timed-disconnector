var redis = require('redis');

var AUTO_CLOSE_CONNECTION = 30 * 1000; //seconds

function RedisHelper() {
  this.autoCloseTimeout = null;
  this.client = null;
};

RedisHelper.prototype.getClient = function(port, host) {
  this.startTimeout();
  if (!this.client) {
    this.client = redis.createClient(port, host);
  }
  return this.client;
};

RedisHelper.prototype.startTimeout = function() {
  console.info('Starting redis auto-close connection timeout...');
  clearTimeout(this.autoCloseTimeout);
  this.autoCloseTimeout = setTimeout(function() {
    console.info('Redis connection closed due timeout (%d ms)', AUTO_CLOSE_CONNECTION);
    this.client.end();
    this.client = null;
  }.bind(this), AUTO_CLOSE_CONNECTION);
};

module.exports = new RedisHelper();