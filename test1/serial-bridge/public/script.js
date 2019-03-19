if (document.readyState != 'loading') onDocumentReady();
else document.addEventListener('DOMContentLoaded', onDocumentReady);

function handleCommand(d) {
    let percent = parseInt(d.float/10);
    let range = 150 + percent;
    let hexBlue = range.toString(16);
    let hex = "#ffff"+ addzero(hexBlue);
    document.body.style.backgroundColor = hex;
}

function addzero(n){
  return (n.length<2) ? "0"+n : n;
}


function onDocumentReady() {
    var socket = new ReconnectingWebsocket("ws://" + location.host + "/serial");
    var sendFormEl = document.getElementById('sendForm');
    var lastMsg = null;
    lastMsgEl = document.getElementById('lastMsg');
    socket.onmessage = function(evt) {
        // Debug: see raw received message
        //console.log(evt.data);

        //document.getElementById( "wholePage" ).style.backgroundColor = 'rgba(255,130,100,${d';

        // Parse message, assuming <Text,Int,Float>
        var d = evt.data.trim();
        if (d.charAt(0) == '<' && d.charAt(d.length-1) == '>') {
            //${
            // Looks legit
            d = d.split(',');
            if (d.length == 3) { // Yes, it has three components as we hoped
                handleCommand({
                    text:d[0].substr(1),
                    integer: parseInt(d[1]),
                    float: parseFloat(d[2])
                });
//                var buttonValue = parseInt(d[2]);
//                float: parseFloat(d[2].substr(0,d.length-1))
//                document.getElementById( "wholePage" ).style.backgroundColor = `rgba(255,130,100,${buttonValue})`;
//                console.log(buttonValue);
                return;
            }
        }

        // Doesn't seem to be formatted correctly, just display as-is
        if (evt.data != lastMsg) {
            lastMsgEl.innerText =  evt.data;
            lastMsg = evt.data;
        }
    }
    socket.onopen = function(evt) {
        console.log("Socket opened");
    }

    /*
    sendFormEl.addEventListener('submit', function(evt) {
        evt.preventDefault();
        var send = document.getElementById('sendtoSerial').value;
        socket.send(send);
    })
    */
}
