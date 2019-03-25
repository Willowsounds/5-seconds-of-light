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

function addzero(n){
  return (n.length<2) ? "0"+n : n;
}

function onData(e) {
  var accel = e.accel;
  var accelGrav = e.accelGrav;
  var rot = e.rot;
  if (!frozen) showData(e);

  // let x = accelGrav.x;
  // let percent = parseInt(x*10);
  // let range = 150 + percent;
  // let hexBlue = range.toString(16);
  // let hex = "#ffff"+ addzero(hexBlue);
  //
  // if (x > 0){
  //   adzero++
  // } else {
  //   adzero--
  // }
  if (accelGrav.x > 0){
    document.body.style.backgroundColor = '#ffffff';
  } else {
    document.body.style.backgroundColor = '#ffff96  ';
  }
}



// function ChangeBackgroundColor(d) {
//     let percent = parseInt(d.float/10);
//     let range = 150 + percent;
//     let hexBlue = range.toString(16);
//     let hex = "#ffff"+ addzero(hexBlue);
//     document.body.style.backgroundColor = hex;
//     document.body.innerHTML = hex;
// }

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
