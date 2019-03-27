var socket = null;
var frozen = false;
let setColor;
let setBrightness;

if (document.readyState != 'loading') ready();
else document.addEventListener('DOMContentLoaded', ready);

function ready() {

  document.getElementById('last').addEventListener('click', e=> {
    frozen = !frozen;
    document.getElementById('last').classList.toggle('frozen');
  });

  initWebsocket();
}

/*
 * Group 5: 
 * Calculate the average value of the values in an array
 */
function average(values) {
  let sum = 0;
  for( let i = 0; i < values.length; i++) {
    sum = sum + values[i];
  }
  return sum/values.length;
}

/*
 * Group 5:
 * We made changes in the onData function below.
 */
function onData(e) {
  var accel = e.accel;
  var accelGrav = e.accelGrav;
  var rot = e.rot;
  if (!frozen) showData(e);

  // The arrays that store the latest measured values
  let xInputValues = [];
  let yInputValues = [];

  // Push values to the arrays
  xInputValues.push(accelGrav.x);
  yInputValues.push(accelGrav.y);

  // Calculate the averages over the latest values
  let xAverage = average(xInputValues);
  let yAverage = average(yInputValues);

  // Use the averages to calculate what colors to set
  if (xAverage < -5 && xAverage>-10){
    setColor = 70;
  } else if(xAverage> -5 && xAverage<0){
    setColor = 80;
  } else if (xAverage >0 && xAverage <5){
    setColor = 90;
  } else if(xAverage >5 && xAverage <10){
    setColor = 100;
  }

  // Use the averages to 
  if (yAverage < -5 && yAverage > -10){
    setBrightness = 50;
  } else if(yAverage> -5 && yAverage<0){
    setBrightness = 65;
  } else if(yAverage> 0 && yAverage<5){
    setBrightness = 80;
  } else if(yAverage> 5 && yAverage<10){
    setBrightness = 100;
  }

  // We found that calculating the average over 10 values was a good compromise
  // between speed of change and smoothness.
  if (xInputValues.length > 10) {
    xInputValues.shift();
  }
  if (yInputValues.length > 10) {
    yInputValues.shift();
  }
  changeBackground(setColor,setBrightness);
}

/*
 * Group5: Change the background color
 */
function changeBackground(setColor,setBrightness){
  document.body.style.backgroundColor = `hsl(49, ${setColor}%, ${setBrightness}%)`;
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
