// - - - - - - - - - - \\
// Module dependencies \\
// - - - - - - - - - - \\

var express    = require('express');
var device     = require('express-device');
var validator  = require('express-validator');
var path       = require('path');
var fs         = require('fs');
var http       = require('http');
var nodemailer = require("nodemailer");
var routes     = require('./routes');

var app        = express();

// - - - - - - - - - - - - - - \\
// Set  environment variables  \\
// - - - - - - - - - - - - - - \\

//app.set('env', 'development');
app.set('env', 'production');

// Set server port to listen on
app.set('port', process.env.PORT || 3000);

// Set views directory where Jade templates are stored
app.set('views', path.join(__dirname, 'views'));

// Set view engine to Jade
app.set('view engine', 'jade');


// - - - - - - - - - - - - - - - - - - \\
// Tell Express what middleware to use \\
// - - - - - - - - - - - - - - - - - - \\

// Use express-validator to validate incoming form data
app.use (validator([]));

// Set the favicon to use for the website
app.use(express.favicon(path.join(__dirname, 'public/img/favicon.ico')));

app.use(express.compress());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

// Use express-device to detect what kind of device is accessing the website
app.use(device.capture());
app.enableDeviceHelpers();

// Use routing middleware
app.use(app.router);

// Set the public directory to be served statically.
// Contains client-side javascript, css
app.use(express.static(path.join(__dirname, 'public')));

// For debugging purposes
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.use(express.logger('dev'));
}

// Set up node-mailer middleware for sending emails
var mailer = nodemailer.createTransport("SMTP", {
    service: "Hotmail",
    auth: {
        user: "",
        pass: ""
    }
});
app.mailer = mailer;


// - - - - - - - - \\
// Set Node routes \\
// - - - - - - - - \\

app.get ('/', routes.index);
app.get ('/ajax/quote_form', routes.get_quote_form);
app.post ('/ajax/quote_form', routes.post_quote_form);

app.get('/about-us', routes.about_us);
app.get('/reno', routes.renovation);


// - - - - - - - - - - - - - - - - \\
// Create and start the web server \\
// - - - - - - - - - - - - - - - - \\

http.createServer (app).listen (app.get ('port'), function () {
    console.log('Express server listening on port ' + app.get('port') +' in ' + app.get('env') + ' mode.');
});
