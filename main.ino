#include <WiFi.h>
#include <WebSocketsServer.h>
#include "HX711.h"

// Wi-Fi setup
const char* ssid = "PoleDeVinci_IFT";
const char* password = "*c.r4UV@VfPn_0";
WebSocketsServer webSocket = WebSocketsServer(81);

#define USE_SERIAL Serial

// HX711 circuit wiring
const int LOADCELL_DOUT_PIN = 18;
const int LOADCELL_SCK_PIN = 19;
HX711 scale;

// LED and Sensor Pin Definitions
const int ledPin = 5;
const int sensorPin = 32;
const long sampleDuration = 100;
int dutyCycle = 0;  // Duty cycle initial

void hexdump(const void *mem, uint32_t len, uint8_t cols = 16) {
    const uint8_t* src = (const uint8_t*) mem;
    USE_SERIAL.printf("\n[HEXDUMP] Address: 0x%08X len: 0x%X (%d)", (ptrdiff_t)src, len, len);
    for(uint32_t i = 0; i < len; i++) {
        if(i % cols == 0) {
            USE_SERIAL.printf("\n[0x%08X] 0x%08X: ", (ptrdiff_t)src, i);
        }
        USE_SERIAL.printf("%02X ", *src);
        src++;
    }
    USE_SERIAL.printf("\n");
}

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case WStype_DISCONNECTED:
            USE_SERIAL.printf("[%u] Disconnected!\n", num);
            break;
        case WStype_CONNECTED:
            {
                IPAddress ip = webSocket.remoteIP(num);
                USE_SERIAL.printf("[%u] Connected from %d.%d.%d.%d\n", num, ip[0], ip[1], ip[2], ip[3]);
                webSocket.sendTXT(num, "Connected");
            }
            break;
        case WStype_TEXT:
            USE_SERIAL.printf("[%u] Received Text: %s\n", num, payload);
            dutyCycle = atoi((char*)payload);
            USE_SERIAL.print("PWM : ");
            USE_SERIAL.println(dutyCycle);
            dutyCycle = constrain(dutyCycle, 0, 255);

            break;
        case WStype_BIN:
            USE_SERIAL.printf("[%u] Received Binary length: %u\n", num, length);
            hexdump(payload, length);
            break;
        case WStype_ERROR:
        case WStype_FRAGMENT_TEXT_START:
        case WStype_FRAGMENT_BIN_START:
        case WStype_FRAGMENT:
        case WStype_FRAGMENT_FIN:
            break;
    }
}

void setup() {
    USE_SERIAL.begin(115200);
    USE_SERIAL.setDebugOutput(true);
    USE_SERIAL.println();
    USE_SERIAL.println();
    USE_SERIAL.println();

    for(uint8_t t = 4; t > 0; t--) {
        USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
        USE_SERIAL.flush();
        delay(1000);
    }

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(100);
        USE_SERIAL.println("Connecting to WiFi...");
    }

    USE_SERIAL.println("Connected to WiFi");
    USE_SERIAL.print("IP Address: ");
    USE_SERIAL.println(WiFi.localIP());

    webSocket.begin();
    webSocket.onEvent(webSocketEvent);
    USE_SERIAL.printf("WebSocket server running on port: %d\n", 81);

    pinMode(ledPin, OUTPUT);

    // Initialize and calibrate the HX711 scale
    USE_SERIAL.println("Initializing the scale");
    scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);

    USE_SERIAL.println("Before setting up the scale:");
    USE_SERIAL.print("read: \t\t");
    USE_SERIAL.println(scale.read());
    USE_SERIAL.print("read average: \t\t");
    USE_SERIAL.println(scale.read_average(20));
    USE_SERIAL.print("get value: \t\t");
    USE_SERIAL.println(scale.get_value(5));
    USE_SERIAL.print("get units: \t\t");
    USE_SERIAL.println(scale.get_units(5), 1);

    scale.set_scale(2280.f);  // Adjust scale based on calibration
    scale.tare();             // Reset the scale to 0

    USE_SERIAL.println("After setting up the scale:");
    USE_SERIAL.print("read: \t\t");
    USE_SERIAL.println(scale.read());
    USE_SERIAL.print("read average: \t\t");
    USE_SERIAL.println(scale.read_average(20));
    USE_SERIAL.print("get value: \t\t");
    USE_SERIAL.println(scale.get_value(5));
    USE_SERIAL.print("get units: \t\t");
    USE_SERIAL.println(scale.get_units(5), 1);
}

void loop() {
    webSocket.loop();

    long startTime = millis();
    long sum = 0;
    int sampleCount = 0;

    while (millis() - startTime < sampleDuration) {
        int sensorValue = analogRead(sensorPin);
        sum += sensorValue;
        sampleCount++;
        delay(1);
    }

    float averageSensorValue = (float)sum / sampleCount;
    USE_SERIAL.print("Sensor Average: ");
    USE_SERIAL.println(averageSensorValue);

    float weight = scale.get_units(10);
    USE_SERIAL.print("Weight: ");
    USE_SERIAL.println(weight);

    // Control LED brightness based on received PWM value
    analogWrite(0, dutyCycle);

    String dataStr = String("{\"weight\":" + String(weight, 2) + ", \"sensor\":" + String(averageSensorValue, 2) + "}");
    webSocket.broadcastTXT(dataStr);

    scale.power_down();
    delay(100);
    scale.power_up();
}