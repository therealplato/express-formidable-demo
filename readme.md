express-formidable-demo

Currently broken due to unknown bug

Usage:
------

git clone https://github.com/therealplato/express-formidable-demo.git

cd express-formidable-demo; node app.js

browse to localhost:3000 in a browser, submit form

Problem:
--------

form.parse() function (in app.js) hangs without ever getting to callback

Turns out this is because I was parsing the form once with `express.bodyParser`
and then a second time with `form.parse`. If you comment out the
express.bodyParser middleware in app.js, formidable's parsing works.

Solution:
--------

Use built in `bodyParser` exclusively; it handles files and fields behind the
scenes, as `req.files.*` and `req.body.*` respectively. We don't have to
directly use formidable at all.

See `/formpost2` route for example
