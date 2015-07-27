// Read pin 7 for input and pipe the state to the console
// var gpio = require('rpi-gpio');
//  
// gpio.on('change', function(channel, value) {
//     console.log('Channel ' + channel + ' value is now ' + value);
// });
// gpio.setup(7, gpio.DIR_IN);

var gpio = require('rpi-gpio'); 

// Load the http module to create an http server.
var http = require('http');
var doorState = '';
 
function readInput() {
    gpio.read(7, function(err, value) {
    	doorState = value;
        console.log('The value is ' + value);
    });
}


// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Door State: " + doorState + "\n");
});

// Setup the pin
gpio.setup(7, gpio.DIR_IN, readInput)

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");


setTimeout(readInput, 5000);

while(1) {
	readInput();
}
 
