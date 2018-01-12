var myurl = window.location.host;
var protocol = window.location.protocol;
tts_token_url = protocol + '//' + myurl + "/gettoken";
console.log('The tts_token_url is found at: '+tts_token_url);

var token;

var myVideo;
var tts_audio_out;

function playPause() {
    if (myVideo.paused)
        myVideo.play();
    else
        myVideo.pause();
}

//get token
$(document).ready(function() {
	$.ajax({
		url: tts_token_url,
		type: 'GET',
		success: function(data){
			token = data;
			console.log("token: "+token);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('audio error Nodejs: '+ textStatus);
		}
	});

	myVideo = document.getElementById("video1");
	tts_audio_out = document.createElement("AUDIO");


});


function speak(greeting) {
	tts_audio_out.pause();
	WatsonSpeech.TextToSpeech.synthesize({
		text: greeting,
		//voice: 'de-DE_DieterVoice',
		voice: 'en-US_MichaelVoice',
		token: token,
		autoPlay: 'true',
		element: tts_audio_out
	});
	tts_audio_out.onended = function() {playPause()};
	tts_audio_out.onplay = function() {myVideo.play()};
}


$(document).on("click", ".listenbtn", function (e) {
	//playPause();
	speak('<speak version="1.0"><s>A wonderful good morning <break strength="weak">weak pause</break>'+
  ' and welcome here in the IBM Watson <say-as interpret-as="digits">IOT</say-as> Center in Munich!</s>'+
  '<s> <break strength="weak">weak pause</break> My name is Watson - and you will hear a lot about me and my capabilities over the day.</s>'+
  '<s> <break strength="medium">medium pause</break> But before we get to know each other better and hopefully become friends, <break strength="weak">weak pause</break>'+
  ' I would like to introduce you to our host for today - Mr. Marco Brown <break strength="weak">weak pause</break> Vice President and Business Unit Leader <break strength="x-weak">x-weak pause</break> Life Science and Energy and Utilities Germany.</s></speak>');

})
