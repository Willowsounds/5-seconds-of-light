//mouse variables
let mouseX;
let mouseY;


let isMouseOver;
let button1 = document.getElementById("warmestColour");
let button2 = document.getElementById("warmColour");
let button3 = document.getElementById("coldColour");
let button4 = document.getElementById("coldestColour");

button1.addEventListener("mouseover", function(event) {
        //Fill background
        document.body.style.backgroundColor = "red";
});

button2.addEventListener("mouseover", function(event) {
    //Fill background
    document.body.style.backgroundColor = "blue";
});

button3.addEventListener("mouseover", function(event) {
    //Fill background
    document.body.style.backgroundColor = "green";
});

button4.addEventListener("mouseover", function(event) {
    //Fill background
    document.body.style.backgroundColor = "pink";
});


//handle mouse elements
function handleMouseMove(event){
    mouseX = event.pageX;
    mouseY = event.pageY;
}


function handleMouseOver(event){
    isMouseOver = false;
}

//set listeners
document.addEventListener("mouseover", handleMouseOver, false);
document.addEventListener("mousemove", handleMouseMove, false);
