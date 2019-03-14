
//mouse variables
let mouseX;
let mouseY;

let mouseClick;
let button1 = document.getElementById("warmestColour");
let button2 = document.getElementById("warmColour");
let button3 = document.getElementById("coldColour");
let button4 = document.getElementById("coldestColour");

/*Colors:
Warmest: "#401201"
Warm: "#73473D"
Cold: "#7B9BA6"
Coldest: "#EEF4F2"
*/


button1.addEventListener("click", function(event) {
    //Fill background
    document.body.style.backgroundColor = "#401201";
    console.log("button1 clicked!");
});

button2.addEventListener("click", function(event) {
    //Fill background
    document.body.style.backgroundColor = "#73473D";
});

button3.addEventListener("click", function(event) {
    //Fill background
    document.body.style.backgroundColor = "#7B9BA6";
});

button4.addEventListener("click", function(event) {
    //Fill background
    document.body.style.backgroundColor = "#EEF4F2";
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
