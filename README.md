redis-timed-disconnection
=========================

Get a redis connection and auto-terminate after 30 seconds.

If you require a new connection, you will get the one active if present.

If there is no active connection, a new one will be created. Very useful when digesting a huge queue