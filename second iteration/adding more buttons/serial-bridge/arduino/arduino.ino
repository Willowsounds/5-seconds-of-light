// Serial I/O based on example http://forum.arduino.cc/index.php?topic=396450


// Serial communication
const byte numChars = 32;
char receivedChars[numChars];
char tempChars[numChars];
char messageFromPC[numChars] = {0};
int integerFromPC = 0;
float floatFromPC = 0.0;
boolean newData = false;
long lastFakeReport = 0;


Button buttonPinA(D2);
Button buttonPinB(D3);
Button buttonPinC(D4);
Button buttonPinD(D5);
/*
const int buttonPinA = 2;
const int buttonPinB = 3;
const int buttonPinC = 4;
const int buttonPinD = 5;
*/
int analogPinA0 = A0;
int sensorValue = 0;
int sensorValue2 = 0;
int sensorValue3 = 0;
int sensorValue4 = 0;

enum {
  MsgAcknowledge, // 0
  MsgError,       // 1
  MsgMove,        // 2
  MsgMoveResult,  // 3
  MsgPosition,    // 4
};


void setup()  {
 Serial.begin(115200);
/* pinMode( buttonPinA, INPUT);
 pinMode( buttonPinB, INPUT);
 pinMode( buttonPinC, INPUT);
 pinMode( buttonPinD, INPUT);
 */
 //pinMode( analogPinA0, INPUT);
 report(MsgAcknowledge, "Ready");
}

void loop() {
  // Process serial communucation
  recvWithStartEndMarkers();

  // If we received a command, process it
  if (newData == true) {
    strcpy(tempChars, receivedChars);
    parseData();
    switch (integerFromPC) {
      case MsgPosition:
        // Report fake result
        report(MsgPosition, 10);
        break;
      case MsgMove:
        // Pretend to do something
        report(MsgMoveResult, 10);
        break;
      }

      // Debug: print parsed command to serial
      // showParsedData();
      newData = false;
    }


  // Every so often report a fake position
  if (millis() - lastFakeReport > 100) {
    //sensorValue = analogRead(analogPinA0);

    if(buttonPinA.pressed())
      sensorValue = 1;
    if(buttonPinA.held())
      sensorValue = 1;
    if(buttonPinA.released()) {
      sensorValue = 0;
    }
    if(buttonPinB.pressed())
      sensorValue2 = 1;
    if(buttonPinB.held())
      sensorValue2 = 1;
    if(buttonPinB.released()) {
      sensorValue2 = 0;
    }
    if(buttonPinC.pressed())
      sensorValue3 = 1;
    if(buttonPinC.held())
      sensorValue3 = 1;
    if(buttonPinC.released()) {
      sensorValue3 = 0;
    }
    if(buttonPinD.pressed())
      sensorValue4 = 1;
    if(buttonPinD.held())
      sensorValue4 = 1;
    if(buttonPinD.released()) {
      sensorValue4 = 0;
    }

    /*
    //if we want to read values from buttons
    sensorValue = digitalRead(buttonPinA);
    sensorValue2 = digitalRead(buttonPinB);
    sensorValue3 = digitalRead(buttonPinC);
    sensorValue4 = digitalRead(buttonPinD);
*/


    report(MsgPosition, sensorValue, sensorValue2, sensorValue3, sensorValue4);
    //console.log(sensorValue);
//    report(MsgPosition, (random(0,100)));
    lastFakeReport = millis();

  }
}

// ---- Serial communication
void report(int code, const char *message) {
  Serial.print("<");
  Serial.print("ws-bridge,");
  Serial.write(code);
  Serial.write(",");
  Serial.write(message);
  Serial.print(">\r\n");
  Serial.flush();
}

void report(int code, int val1, int val2, int val3, int val4) {
  Serial.print("<");
  Serial.print("ws-bridge,");
  Serial.print(code);
  Serial.print(",");
  Serial.print(val1);

  Serial.print(",");
  Serial.print(val2);

  Serial.print(",");
  Serial.print(val3);

  Serial.print(",");
  Serial.print(val4);


  Serial.print(">\r\n");
  Serial.flush();
}

void recvWithStartEndMarkers() {
    static boolean recvInProgress = false;
    static byte ndx = 0;
    char startMarker = '<';
    char endMarker = '>';
    char rc;

    while (Serial.available() > 0 && newData == false) {
        rc = Serial.read();

        if (recvInProgress == true) {
            if (rc != endMarker) {
                receivedChars[ndx] = rc;
                ndx++;
                if (ndx >= numChars) {
                    ndx = numChars - 1;
                }
            }
            else {
                receivedChars[ndx] = '\0'; // terminate the string
                recvInProgress = false;
                ndx = 0;
                newData = true;
            }
        }

        else if (rc == startMarker) {
            recvInProgress = true;
        }
    }
}

void parseData() {      // split the data into its parts
    char * strtokIndx; // this is used by strtok() as an index

    strtokIndx = strtok(tempChars,",");      // get the first part - the string
    strcpy(messageFromPC, strtokIndx); // copy it to messageFromPC

    strtokIndx = strtok(NULL, ","); // this continues where the previous call left off
    integerFromPC = atoi(strtokIndx);     // convert this part to an integer

    strtokIndx = strtok(NULL, ",");
    floatFromPC = atof(strtokIndx);     // convert this part to a float
}

void showParsedData() {
    Serial.print("Message ");
    Serial.println(messageFromPC);
    Serial.print("Integer ");
    Serial.println(integerFromPC);
    Serial.print("Float ");
    Serial.println(floatFromPC);
}
