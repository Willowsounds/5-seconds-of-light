if (document.readyState != 'loading') onDocumentReady();
else document.addEventListener('DOMContentLoaded', onDocumentReady);

function handleCommand(d) {

    /*let percent = parseInt(d.float/10); //if we use buttons, then parseInt(d.float);
    let range = 150 + percent;          //if (d.float === 0); then do this
    let hexBlue = range.toString(16);   //else; do that
    let hex = "#ffff"+ addzero(hexBlue); */
    let b_one = parseFloat(d.button1);
    let b_two = parseFloat(d.button2);
    let b_three = parseFloat(d.button3);
    let b_four = parseFloat(d.button4);
    /*Colors in hex
    #ffff96
    #ffffba
    #ffffdf
    #ffffff
    */

    if (b_one === 1){
      /*document.body.style.backgroundColor = '#ffff96';
      document.body.innerHTML = '#ffff96'; */
      document.getElementById("div_one").style.backgroundColor = '#ffff96';
      document.getElementById("div_two").style.backgroundColor = '#000000';
      document.getElementById("div_three").style.backgroundColor = '#000000';
      document.getElementById("div_four").style.backgroundColor = '#000000	';
    }
    if (b_two === 1){
    /*  document.body.style.backgroundColor = '#ffffba';
      document.body.innerHTML = '#ffffba'; */
      document.getElementById("div_one").style.backgroundColor = '#ffff96';
      document.getElementById("div_two").style.backgroundColor = '#ffffba';
      document.getElementById("div_three").style.backgroundColor = '#000000';
      document.getElementById("div_four").style.backgroundColor = '#000000';
    }
    if (b_three === 1){
    /*  document.body.style.backgroundColor = '#fffffd';
      document.body.innerHTML = '#fffffd'; */
      document.getElementById("div_one").style.backgroundColor = '#ffff96';
      document.getElementById("div_two").style.backgroundColor = '#ffffba';
      document.getElementById("div_three").style.backgroundColor = '#fffffd';
      document.getElementById("div_four").style.backgroundColor = '#000000';
    }
    if (b_four === 1){
    /*  document.body.style.backgroundColor = '#ffffff';
      document.body.innerHTML = '#ffffff'; */
      document.getElementById("div_one").style.backgroundColor = '#ffff96';
      document.getElementById("div_two").style.backgroundColor = '#ffffba';
      document.getElementById("div_three").style.backgroundColor = '#fffffd';
      document.getElementById("div_four").style.backgroundColor = '#ffffff';
    }
}

/*
function addzero(n){
  return (n.length<2) ? "0"+n : n;
}
*/

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
            if (d.length == 6) { // Yes, it has six components as we hoped (changed from the original code)
                handleCommand({
                    //text:d[0].substr(1),
                    button1: parseFloat(d[2]),
                    button2: parseFloat(d[3]),
                    button3: parseFloat(d[4]),
                    button4: parseFloat(d[5])
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
