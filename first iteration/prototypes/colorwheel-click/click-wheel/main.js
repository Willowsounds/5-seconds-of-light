
//mouse variables
let mouseX;
let mouseY;

let mouseClick;
let button1 = document.getElementById("warmestColour");
let button2 = document.getElementById("warmColour");
let button3 = document.getElementById("coldColour");
let button4 = document.getElementById("coldestColour");

/*Colors:
Warmest: "hsl(16, 97%, 13%)"
Warm: "hsl(11, 31%, 35%)"
Cold: "hsl(195, 19%, 57%)"
Coldest: "hsl(160, 21%, 95%)"
*/


button1.addEventListener("click", function(event) {
    //Fill background
    document.body.style.backgroundColor = "hsl(16, 97%, 13%)";
    console.log("button1 clicked!");
});

button2.addEventListener("click", function(event) {
    //Fill background
    document.body.style.backgroundColor = "hsl(11, 31%, 35%)";
});

button3.addEventListener("click", function(event) {
    //Fill background
    document.body.style.backgroundColor = "hsl(195, 19%, 57%)";
});

button4.addEventListener("click", function(event) {
    //Fill background
    document.body.style.backgroundColor = "hsl(160, 21%, 95%)";
});

//handle mouse elements
function handleMouseMove(event){
    mouseX = event.pageX;
    mouseY = event.pageY;
}


function handleMouseClick(event){
  mouseClick = false;
}

//set listeners
document.addEventListener("mouseover", handleMouseOver, false);
document.addEventListener("mousemove", handleMouseMove, false);
document.addEventListener("click", handleMouseClick, false);
