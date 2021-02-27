
#include <SoftwareSerial.h>


int state=0;
int Tx=2;
int Rx=3;
SoftwareSerial bt(Tx,Rx);
int relaypin =8;
char c;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  bt.begin(9600);
  pinMode(relaypin, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  while(bt.available()) {
    state=(int)bt.read();
    Serial.println(state);
    if(state==48) {
      Serial.println("on!!");
      digitalWrite(relaypin, HIGH);
    }
    else if(state==49) {
      Serial.println("off!!");
      digitalWrite(relaypin, LOW);
    }
    delay(15);
  }
  if(state!=0) {
    state=0;
  }
}
