var lastMsgEl = null;
if (document.readyState != 'loading') onDocumentReady();
else document.addEventListener('DOMContentLoaded', onDocumentReady);

function handleCommand(d) {
   lastMsgEl.innerHTML =  `text: ${d.text} <br />int: ${d.integer} <br />float: ${d.float}`;
    wholePageEl = document.getElementById( "wholePage" );
    console.log("d float " + d.float + '\n');

    var color = d.float/4;
     wholePageEl.style.backgroundColor = `rgba(${color},130,100,255)`;

/*    if ( d.float < 255 ) {
        wholePageEl.style.backgroundColor = `rgba(255,130,100,255)`;

    } else if ( 255 < d.float && d.float <= 511 ) {
        wholePageEl.style.backgroundColor = `rgba(0,130,100,255)`;

    } else if ( 511 < d.float && d.float <= 767 ) {
        wholePageEl.style.backgroundColor = `rgba(255,0,100,255)`;

    } else if ( 767 < d.float ) {
        wholePageEl.style.backgroundColor = `rgba(255,255,255,255)`;

    }
*/
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
        if (d.charAt(0) == '<' && d.charAt(d.length-1) == '>') {${
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

    sendFormEl.addEventListener('submit', function(evt) {
        evt.preventDefault();
        var send = document.getElementById('sendtoSerial').value;
        socket.send(send);  
    })
}