
//based on  http://www.arduino.cc/en/Tutorial/Button


// include the EduIntro library
#include <EduIntro.h>
#include <Keyboard.h>

Button button(D2);	// creating the object 'button' on pin D7
Button button2(D3);
Button button3(D4);
Button button4(D5);

Led led(D10);		// creating the object 'led' on pin D10


void setup() {

Keyboard.begin();
}

void loop()
{
  if (button.pressed()){
    Keyboard.write(77);
  }
  else if (button2.pressed()) {
    Keyboard.write(65);
  }
  else if (button3.pressed()) {
    Keyboard.write(60);
  }
  else if (button4.pressed()) {
    Keyboard.write(55);
  }
}
