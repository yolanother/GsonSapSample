var gSap;

var REQ_INIT_HELLO = "req-initialize";

function onConnected() {
	// TODO Handle any post connection initializations needed
	alert("Connected to phone!");
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
	alert("Connection to phone failed.");
}

function onDataReceived(type, data) {
	// TODO Process received data
	console.log("Received: " + type);
	console.log(JSON.stringify(data));
}

$(window).load(function(){
	document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
            tizen.application.getCurrentApplication().exit();
    });
	
	
	$('.contents').on("click", function(){
		$('#textbox').html($('#textbox').html() == "Basic" ? "Sample" : "Basic");				
	});

	var providerAppName = "GsonSapSampleProvider";
	var channel = 104;
	gSap = new JsonSap(providerAppName, channel);
	gSap.init(onConnected, onConnectionFailed, onDataReceived);
});