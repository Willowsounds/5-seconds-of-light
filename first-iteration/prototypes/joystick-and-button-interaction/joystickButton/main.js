
//mouse variables
let mouseX;
let mouseY;
let isMouseOver;

//button variables
let button1 = document.getElementById("warmestColour");
let button2 = document.getElementById("warmColour");
let button3 = document.getElementById("coldColour");
let button4 = document.getElementById("coldestColour");

/*Colors that are used:
Warmest: "#401201"
Warm: "#73473D"
Cold: "#7B9BA6"
Coldest: "#EEF4F2"
*/

// Event listeners for all of the different buttons
button1.addEventListener("mouseover", function(event) {
      //Fill background
      document.body.style.backgroundColor = "hsl(60, 100%, 79.4%)";
});

button2.addEventListener("mouseover", function(event) {
    //Fill background
    document.body.style.backgroundColor = "hsl(60, 100%, 86.5%)";
});

button3.addEventListener("mouseover", function(event) {
    //Fill background
    document.body.style.backgroundColor = "hsl(60, 100%, 93.7%)";
});

button4.addEventListener("mouseover", function(event) {
    //Fill background
    document.body.style.backgroundColor = "hsl(0, 0%, 100%)";
});


//handle mouse elements
function handleMouseMove(event){
    mouseX = event.pageX;
    mouseY = event.pageY;
}

// If the mouse is over one of the divs, this function will be called
function handleMouseOver(event){
    isMouseOver = false;
}


//set listeners
document.addEventListener("mouseover", handleMouseOver, false);
document.addEventListener("mousemove", handleMouseMove, false);
//document.addEventListener("mouseclick", handleMouseClick, false);
