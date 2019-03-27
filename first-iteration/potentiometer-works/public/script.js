/*
 * Group 3: We added functionality to receive color data. The color data is
 * used to set the background color of the page
 *
 * Color calculation is based on https://www.energyearth.com/general/categories/lighting/learn-more
 *
 */


var lastMsgEl = null;

const WARM_WHITE = {r:255,g:248,b:168,k:2700};
const COOL_WHITE = {r:255,g:255,b:255,k:3800};
const DAYLIGHT   = {r:138,g:213,b:247,k:6500};

if (document.readyState != 'loading') onDocumentReady();
else document.addEventListener('DOMContentLoaded', onDocumentReady);


function handleCommand(d) {
    //lastMsgEl.innerHTML =  `text: ${d.text} <br />int: ${d.integer} <br />float: ${d.float}`;
    let wholePageEl = document.getElementById("wholePage");
    //console.log("d float " + d.float + '\n');

    let controllerValue = d.float;
    let percent = (controllerValue / 1024) * 100;
    let colorTemperature = calculateColorTemperature(percent);
    let color = calculateRGB(colorTemperature);
    let colorDampened = calculateIntensity(color, Math.max(percent, 30) );
    colorDampened = colorTruncate(colorDampened);
    color = colorTruncate(color);
    wholePageEl.style.backgroundColor = `rgba(${colorDampened.r},${colorDampened.g},${colorDampened.b},255)`;

    lastMsgEl.innerHTML =  `percent: ${Math.trunc(percent)} <br>color rgb:  ${color.r} ${color.g} ${color.b}
                            <br>color2 rgb: ${colorDampened.r} ${colorDampened.g} ${colorDampened.b}`;
}

// Truncate the decimals
function colorTruncate(color) {
    return {
        r: Math.trunc(color.r),
        g: Math.trunc(color.g),
        b: Math.trunc(color.b)
    }
}

// Change the intensity of the color
function calculateIntensity(color, percent) {
    return {
        r: Math.min(percent/100*color.r, 255),
        g: Math.min(percent/100*color.g, 255),
        b: Math.min(percent/100*color.b, 255)
    }
}

/*
 * Calculate an interpolated value based on the percentage value and numbers from the web page
 * https://www.energyearth.com/general/categories/lighting/learn-more
 */
function calculateColorTemperature( percent ) {
    return (percent / 100 ) * (DAYLIGHT.k - WARM_WHITE.k) + WARM_WHITE.k;
}

/*
 * Calculate the color value from the color temperature.
 */
function calculateRGB(colorTemp) {
    let red, green, blue;
    if (colorTemp < COOL_WHITE.k) {
        red = WARM_WHITE.r;
        green = WARM_WHITE.g + (COOL_WHITE.g - WARM_WHITE.g)*(colorTemp - WARM_WHITE.k)/(COOL_WHITE.k - WARM_WHITE.k);
        blue = WARM_WHITE.b + (COOL_WHITE.b - WARM_WHITE.b)*(colorTemp - WARM_WHITE.k)/(COOL_WHITE.k - WARM_WHITE.k);
    } else {
        red = COOL_WHITE.r - (COOL_WHITE.r - DAYLIGHT.r)*(colorTemp - COOL_WHITE.k)/(DAYLIGHT.k - COOL_WHITE.k);
        green = COOL_WHITE.g - (COOL_WHITE.g - DAYLIGHT.g)*(colorTemp - COOL_WHITE.k)/(DAYLIGHT.k - COOL_WHITE.k);
        blue = COOL_WHITE.b - (COOL_WHITE.b - DAYLIGHT.b)*(colorTemp - COOL_WHITE.k)/(DAYLIGHT.k - COOL_WHITE.k);
    }

    return {r:red,g:green,b:blue};
}

function onDocumentReady() {
    var socket = new ReconnectingWebsocket("ws://" + location.host + "/serial");
    var sendFormEl = document.getElementById('sendForm');
    var lastMsg = null;
    lastMsgEl = document.getElementById('lastMsg');
    socket.onmessage = function(evt) {
        // Debug: see raw received message
        //console.log(evt.data);

        // Parse message, assuming <Text,Int,Float>
        var d = evt.data.trim();
        if (d.charAt(0) == '<' && d.charAt(d.length-1) == '>') {
            // Looks legit
            d = d.split(',');
            if (d.length == 3) { // Yes, it has three components as we hoped
                handleCommand({
                    text:d[0].substr(1),
                    integer: parseInt(d[1]),
                    float: parseFloat(d[2])
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
