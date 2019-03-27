var socket = null;
var frozen = false;

if (document.readyState != 'loading') ready();
else document.addEventListener('DOMContentLoaded', ready);

function ready() {

  document.getElementById('last').addEventListener('click', e=> {
    frozen = !frozen;
    document.getElementById('last').classList.toggle('frozen');
  });

  initWebsocket();
}

function onData(e) {
  var accel = e.accel;
  var accelGrav = e.accelGrav;
  var rot = e.rot;
  if (!frozen) showData(e);

//changes the backgroundcolor in the browser depending on the value of the horizontal rotation of the phone (event.accelgrav.x).
//between 5-10 is one color, 0-5 is another, -5-0 and -5-10.
  // if (accelGrav.x > 5 && accelGrav.x < 10){
  //   document.body.style.backgroundColor = '#ffffff';
  // } else if (accelGrav.x < 5 && accelGrav.x > 0){
  //   document.body.style.backgroundColor = '#ffffdf';
  // } else if (accelGrav.x < 0 && accelGrav.x > -5){
  //   document.body.style.backgroundColor = '#ffffba';
  // } else if (accelGrav.x < -5 && accelGrav.x > -10){
  //   document.body.style.backgroundColor = '#ffff96';
  // }

  if (accelGrav.x < -5 && accelGrav.x>-10){
   setColor = 30;
 } else if(accelGrav.x> -5 && accelGrav.x<0){
   setColor = 50;
 } else if (accelGrav.x >0 && accelGrav.x <5){
   setColor = 80;
 } else if(accelGrav.x >5 && accelGrav.x <10){
   setColor = 100;
 }
 if (accelGrav.y < -5 && accelGrav.y > -10){
   setBrightness = 30;
 } else if(accelGrav.y> -5 && accelGrav.y<0){
   setBrightness = 50;
 } else if(accelGrav.y> 0 && accelGrav.y<5){
   setBrightness = 80;
 } else if(accelGrav.y> 5 && accelGrav.y<10){
   setBrightness = 100;
 }
 function changeBackground(setColor,setBrightness){
   document.body.style.backgroundColor = `hsl(47, $(setColor)%, $(setBrightness)%)`;

}

function initWebsocket() {
  const url = 'ws://' + location.host + '/ws';
  socket = new ReconnectingWebsocket(url);

  // Connection has been established
  socket.onopen = function(evt) {
    console.log('Web socket opened: ' + url);
  };

  // Received a message
  socket.onmessage = function(evt) {
    // To convert text back to an object (if it was sent with 'sendObject'):
    var o = JSON.parse(evt.data);
    onData(o);
  };
}

//displays live values from phone orientation in browser.
function showData(m) {
  let html = 'accel';
  html += '<table><tr><td>' + m.accel.x.toFixed(3) + '</td><td>' + m.accel.y.toFixed(3) + '</td><td>' + m.accel.z.toFixed(3) + '</tr></table>';
  html += '</table>';

  html += 'rot';
  html += '<table><tr><td>' + m.rot.alpha.toFixed(3) + '</td><td>' + m.rot.beta.toFixed(3) + '</td><td>' + m.rot.gamma.toFixed(3) + '</tr></table>';

  html += 'rotMotion';
  html += '<table><tr><td>' + m.rotMotion.alpha.toFixed(3) + '</td><td>' + m.rotMotion.beta.toFixed(3) + '</td><td>' + m.rotMotion.gamma.toFixed(3) + '</tr></table>';

  html += 'accelGrav';
  html += '<table><tr><td>' + m.accelGrav.x.toFixed(3) + '</td><td>' + m.accelGrav.y.toFixed(3) + '</td><td>' + m.accelGrav.z.toFixed(3) + '</tr></table>';
  html += '</table>';
  document.getElementById('last').innerHTML = html;
}
