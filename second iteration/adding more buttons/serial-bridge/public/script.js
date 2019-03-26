/*
The code is from Clint H's Serial-bridge tutorial from his github:
https://github.com/ClintH/interactivity/tree/master/websockets
The code has been modified to fit our purpose
*/

if (document.readyState != 'loading') onDocumentReady();
else document.addEventListener('DOMContentLoaded', onDocumentReady);

function handleCommand(d) {

    //Handle the values from the serial.
    let b_one = parseInt(d.button1);
    let b_two = parseInt(d.button2);
    let b_three = parseInt(d.button3);
    let b_four = parseInt(d.button4);

    /*Colors in hex
    #ffff96
    #ffffba
    #ffffdd
    #ffffff
    */

    // Depending on which button is pressed (1,2,3 or 4) the different div's will change colors...
    if (b_one === 1){
      document.getElementById("div_one").style.backgroundColor = '#ffff96';
      document.getElementById("div_two").style.backgroundColor = '#000000';
      document.getElementById("div_three").style.backgroundColor = '#000000';
      document.getElementById("div_four").style.backgroundColor = '#000000	';
    }
    if (b_two === 1){
      document.getElementById("div_one").style.backgroundColor = '#ffff96';
      document.getElementById("div_two").style.backgroundColor = '#ffffba';
      document.getElementById("div_three").style.backgroundColor = '#000000';
      document.getElementById("div_four").style.backgroundColor = '#000000';
    }
    if (b_three === 1){
      document.getElementById("div_one").style.backgroundColor = '#ffff96';
      document.getElementById("div_two").style.backgroundColor = '#ffffba';
      document.getElementById("div_three").style.backgroundColor = '#ffffdd';
      document.getElementById("div_four").style.backgroundColor = '#000000';
    }
    if (b_four === 1){
      document.getElementById("div_one").style.backgroundColor = '#ffff96';
      document.getElementById("div_two").style.backgroundColor = '#ffffba';
      document.getElementById("div_three").style.backgroundColor = '#ffffdd';
      document.getElementById("div_four").style.backgroundColor = '#ffffff';
    }
}


function onDocumentReady() {
    var socket = new ReconnectingWebsocket("ws://" + location.host + "/serial");
    var sendFormEl = document.getElementById('sendForm');
    var lastMsg = null;
    lastMsgEl = document.getElementById('lastMsg');
    socket.onmessage = function(evt) {
        // Debug: see raw received message
        //console.log(evt.data);

        // Parse message, assuming <Text,Int,Float> [Changed to (see below)]
        //Parse message, now it is assuming <Text,Float,Float,Float,Float,Float>
        var d = evt.data.trim();
        if (d.charAt(0) == '<' && d.charAt(d.length-1) == '>') {
            //${
            // Looks legit
            d = d.split(',');
            if (d.length == 6) { // Yes, it has six components as we hoped
                handleCommand({
                    button1: parseFloat(d[2]),
                    button2: parseFloat(d[3]),
                    button3: parseFloat(d[4]),
                    button4: parseFloat(d[5])
                });

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

}
