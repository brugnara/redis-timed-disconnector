redis-timed-disconnection
=========================

Get a redis connection and auto-terminate after 30 seconds.

If you require a new connection, you will get the one active if present.

If there is no active connection, a new one will be created. Very useful when digesting a huge queue

# Usage

```
ar redis = require('redis-timed-disconnector');

var client = redis.getClient(); // this client will end() in 30 seconds.
```

# Why

This module is very useful when you are parsing a huge queue when each worker requires a redis connections.
You can create a global **client** and use when you need, but you will have to **end()** it manually.

I wrote this module because I have a server that is listening for new queues and parse when needed.
Mantaining a redis connection is not a good solution for me, so this module solves my problem perfectly.

# Example

Let's suppose we have a worker that is parsing 1000 queue elements.

This may be the code of our worker:

```
function worker(task, cb) {
  var client = redis.getClient();
  var key = 'what:a:key:' + task.id;
  //
  client.set(key, task.statut, cb);
}
```

Our queue has 200 tasks. Each task will call **getClient()**.

Each getClient() will posticipate by 30 seconds the **client.end()**, so we will use only one connection.

Let's see how this works:

```
RedisHelper.prototype.getClient = function(port, host) {
  this.startTimeout();
  if (!this.client) {
    this.client = redis.createClient(port, host);
  }
  return this.client;
};
```

Enjoy.