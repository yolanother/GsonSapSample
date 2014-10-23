var gSap;

var REQ_INIT_HELLO = "req-initialize";

function log(message) {
	$('#textbox').html($('#textbox').html() + message + "<br/>\n");
}

function onConnected() {
	// TODO Handle any post connection initializations needed
	log("Connected to phone!");
	var data = {
			'timestamp': Date.now(),
			'message': "Hello from your Gear!"
		};
	gSap.send(REQ_INIT_HELLO, data, function(err) {
		// TODO Process transmission errors.
	});
}

function onConnectionFailed(error) {
	// TODO Handle connection failure
	log("Connection to phone failed: " + error);
}

function onDataReceived(type, data) {
	// TODO Process received data
	console.log("Received: " + type);
	console.log(JSON.stringify(data));
	log("<strong>" + type + "</strong>\n" + 
			"<pre>" + JSON.stringify(data) + "</pre>\n");
}

$(window).load(function(){
	document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
            tizen.application.getCurrentApplication().exit();
    });
	
	
	$('.contents').on("click", function(){
		$('#textbox').html("");				
	});

	var providerAppName = "GsonSapSample";
	var channel = 104;
	gSap = new JsonSap(providerAppName, channel);
	gSap.init(onConnected, onConnectionFailed, onDataReceived);
});