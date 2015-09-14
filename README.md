# RESTful Framework

[![Build Status](https://travis-ci.org/jalleng/restful-framework.svg?branch=assignment)](https://travis-ci.org/jalleng/restful-framework)

Create a series of help libraries/functions for creating REST APIs using the node HTTP module. This is a pretty open ended assignment, you're welcome to take it as far as you want. The final project should be able to be brought into a Javascript file using the require function, it should also be able to be published on npm. It should be well testing and be setup on TravisCI, don't forget the docs! Submit the repo, no need to submit as a pull request.


```js
var http = require('http')
var framework = require('framework')
var frame = framework()

frame.get('/', function(req, res {
  res.send("Hello, world");
});

http.createServer(frame.route).listen(3000);
```

## Installation

```bash
$  npm install framework
```

##frame.get(url, callback(req, res))

  * url : String
  * callback : Function

Creates a GET method request function. Passes the request and response to the callback.

##frame.post(url, callback(req, res))

  * url : String
  * callback : Function

Creates a POST method request function. Passes the request and response to the callback.

##res.set([option], [value])

  * option : String
  * value : String / Number

Sets the response header option equal to the value.

##res.send(data)

Puts the data in the response body.

##res.json(req)

Reads the json data in the request body and saves it.
