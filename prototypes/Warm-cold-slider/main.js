//Assigning variables to slidervalue through HTML #id
let red = document.querySelector('#red');
let green = document.querySelector('#green');
let blue = document.querySelector('#blue');


function setBackgroundColor(){
  /*Returns an integer and converts it to a string with a hexadecimal value.
  Red and green are added so that it's easier to "uppgrade" the program.
  In the current state, only blue is manipulated and red/green are static (255)*/
  let hexRed = parseInt(red.value).toString(16);
  let hexGreen = parseInt(green.value).toString(16);
  let hexBlue = parseInt(blue.value).toString(16);
  /*Hex will be # + "a two nuber/letter long translation from red then green and lastly blue.
  Example RGB (255,255,130) would return #FFFF82 wich is yellow.*/
  let hex = "#" + addzero(hexRed) + addzero(hexGreen) + addzero(hexBlue);
  //sets the browsers backgroundcolor to the returned hexadecimal color.
  document.body.style.backgroundColor = hex;
}
/*If the lenght of the returned hexadecimal value is below 2, an extra "0" is added infront
beacuse a hexadecimal colorvalue is always # followed by 6 letters/numbers.
without the function below, RGB (12,12,12) would return #CCC instead of the correct #0C0C0C*/
function addzero(n){
  return (n.length<2) ? "0"+n : n;
}

//Eventlistener for type:"input" which calls the setbackgroundcolor function.
blue.addEventListener('input', function() {
  setBackgroundColor();
}, false);
