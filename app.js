/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

//new
var watson = require('watson-developer-cloud');
var bodyParser = require('body-parser');
var request = require('request');
var cors = require('cors');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

//new
app.use(bodyParser.json()); // for parsing application/json
app.use(cors());

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});



var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
var tts_username = vcapServices.text_to_speech[0].credentials.username;
var tts_password = vcapServices.text_to_speech[0].credentials.password;
//authorization token text to speech
app.get('/gettoken', function(req, res) {
   // read from VCAP services
   //var tts_username = tts_username;
   //var tts_password = tts_password;

   var buffer = Buffer.from(tts_username + ':' + tts_password);
   var authstring = 'Basic ' + buffer.toString('base64');
   //console.log("authstring: "+authstring);
   auth_url = "https://stream-fra.watsonplatform.net/authorization/api/v1/token"; //-fra when running in frankfurt
   tts_url = vcapServices.text_to_speech[0].credentials.url;
   var options = {
                  url: auth_url + '?url=' + tts_url,
                  headers: {
                      'Authorization': authstring
                  }
   };
   request(options,function(err,response,body){
      //console.log(body);
      if(!err){
        res.send(body);
      }
      else {
        res.status(500).send('Something broke!');
      }
   });
});
