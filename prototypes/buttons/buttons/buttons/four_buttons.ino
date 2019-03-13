/*
  ButtonStates
  Test the different Button methods: pressed, released, held
  and getSwitch.
  This example code is in the public domain.
  created in Aug 2018 by D. Cuartielles
  based on work by F. Vanzati (2011) and M. Loglio (2013)
*/

#include <EduIntro.h>
#include <Keyboard.h>


Button btn(D2);
Button btn2(D3);
Button btn3(D4);
Button btn4(D5);

void setup()
{
  // we are going to use the serial communication as a
  // way to see on the PC what is happening on the Arduino
  Keyboard.begin();
}

void loop()
{
  if(btn.pressed())
    Keyboard.press(75);
  if(btn.held())
    Serial.println("held");
  if(btn.released()) {
    Keyboard.release(75);
  }
  if(btn2.pressed())
    Keyboard.press(86);
  if(btn2.held())
    Serial.println("held");
  if(btn2.released()) {
    Keyboard.release(86);
  }
  if(btn3.pressed())
    Keyboard.press(78);
  if(btn3.held())
    Serial.println("held");
  if(btn3.released()) {
    Keyboard.release(78);    
  }
  if(btn4.pressed())
    Keyboard.press(66);
  if(btn4.held())
    Serial.println("held");
  if(btn4.released()) {
    Keyboard.release(66);    

  }

  delay(50);
}
