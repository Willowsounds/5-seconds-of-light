/*
  JoystickMouseControl

  Controls the mouse from a joystick on an Arduino Leonardo, Micro or Due.
  Uses a pushbutton to turn on and off mouse control, and a second pushbutton
  to click the left mouse button.

  Hardware:
  - 2-axis joystick connected to pins A0 and A1
  - pushbuttons connected to pin D2 and D3

  The mouse movement is always relative. This sketch reads two analog inputs
  that range from 0 to 1023 (or less on either end) and translates them into
  ranges of -6 to 6.
  The sketch assumes that the joystick resting values are around the middle of
  the range, but that they vary within a threshold.

  WARNING: When you use the Mouse.move() command, the Arduino takes over your
  mouse! Make sure you have control before you use the command. This sketch
  includes a pushbutton to toggle the mouse control state, so you can turn on
  and off mouse control.

  created 15 Sep 2011
  updated 28 Mar 2012
  by Tom Igoe

  This example code is in the public domain.

  http://www.arduino.cc/en/Tutorial/JoystickMouseControl
*/

#include "Mouse.h"

/*Buttons added*/
#include <EduIntro.h>
#include <Keyboard.h>


Button btn(D2);
Button btn2(D3);
Button btn3(D4);
Button btn4(D5);
/*Buttons added*/

// set pin numbers for switch, joystick axes, and LED:
//const int switchPin = 2;      // switch to turn on and off mouse control
//const int mouseButton = 6;    // input pin for the mouse pushButton
const int xAxis = A0;         // joystick X axis
const int yAxis = A1;         // joystick Y axis
//const int ledPin = 5;         // Mouse control LED


// parameters for reading the joystick:
int range = 12;               // output range of X or Y movement
int responseDelay = 5;        // response delay of the mouse, in ms
int threshold = range / 4;    // resting threshold
int center = range / 2;       // resting position value

bool mouseIsActive = true;    // whether or not to control the mouse
int lastSwitchState = LOW;        // previous switch state

void setup() {
 pinMode(6,INPUT);
  // take control of the mouse:
 Mouse.begin();
 Keyboard.begin();

}

void loop() {

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

  delay(5);

  // read and scale the two axes:
  int xReading = readAxis(A0);
  int yReading = readAxis(A1);

  // if the mouse control state is active, move the mouse:
  if (mouseIsActive) {
    Mouse.move(xReading, yReading, 0);
  }

  delay(responseDelay);

}
/*
  reads an axis (0 or 1 for x or y) and scales the analog input range to a range
  from 0 to <range>
*/

int readAxis(int thisAxis) {
  // read the analog input:
  int reading = analogRead(thisAxis);

  // map the reading from the analog input range to the output range:
  reading = map(reading, 0, 1023, 0, range);

  // if the output reading is outside from the rest position threshold, use it:
  int distance = reading - center;

  if (abs(distance) < threshold) {
    distance = 0;
  }

  // return the distance for this axis:
  return distance;
}
