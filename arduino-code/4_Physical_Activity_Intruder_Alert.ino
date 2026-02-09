/*
 * FINAL INTRUDER ALERT SYSTEM 
 * Board: Arduino Uno R4 WiFi
 * Libraries Required: WiFiS3, ArduinoJson
 */

#include <WiFiS3.h>
#include <ArduinoJson.h> 

// ------------------- 1. NETWORK SETTINGS (UPDATE THESE!) -------------------
const char ssid[] = "YOUR-WIFI";        // TODO: Change this
const char pass[] = "YOUR-PASSWORD";    // TODO: Change this
char server[] = "192.xxx.x.xx";               // TODO: Your Laptop IP
int port = 8000;                             // Standard Django local port

WiFiClient client;

// ------------------- 2. PINS -------------------
const int TRIG_PIN = 4;
const int ECHO_PIN = 5;
const int BUZZER_PIN = 3;
const int LED_PIN = 2;

// ------------------- 3. THRESHOLDS -------------------
const int CRITICAL_DISTANCE = 10;
const int WARNING_DISTANCE = 20;
const int SAFE_DISTANCE = 30;

long duration;
int distance;

void setup() {
  Serial.begin(115200);

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  
  digitalWrite(BUZZER_PIN, LOW);
  digitalWrite(LED_PIN, LOW);

  // WiFi Connection
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);
  
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module failed!");
    while (true);
  }

  WiFi.begin(ssid, pass);
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    attempts++;
    if (attempts > 20) {
      Serial.println("\nStill trying to connect... Check SSID/Password!");
      attempts = 0; 
    }
  }
  Serial.println("\nConnected to WiFi!");
  Serial.print("Arduino IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // --- MEASURE ---
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  duration = pulseIn(ECHO_PIN, HIGH);
  distance = duration * 0.0343 / 2;

  if (distance <= 0 || distance > 400) return; 

  // --- ALERTS ---
  if (distance <= CRITICAL_DISTANCE) {
    Serial.print("🔴 CRITICAL: "); Serial.println(distance);
    // Rapid Pattern
    for (int i = 0; i < 3; i++) {
      digitalWrite(BUZZER_PIN, HIGH); digitalWrite(LED_PIN, HIGH);
      delay(100);
      digitalWrite(BUZZER_PIN, LOW); digitalWrite(LED_PIN, LOW);
      delay(100);
    }
  } 
  else if (distance <= WARNING_DISTANCE) {
    Serial.print("🟡 WARNING: "); Serial.println(distance);
    // Slow Pattern
    digitalWrite(BUZZER_PIN, HIGH); digitalWrite(LED_PIN, HIGH);
    delay(300);
    digitalWrite(BUZZER_PIN, LOW); digitalWrite(LED_PIN, LOW);
    delay(200);
  } 
  else if (distance <= SAFE_DISTANCE) {
    Serial.print("🟢 SAFE: "); Serial.println(distance);
    // Blink Pattern
    digitalWrite(LED_PIN, HIGH); delay(100); digitalWrite(LED_PIN, LOW);
  } 
  else {
    digitalWrite(BUZZER_PIN, LOW); digitalWrite(LED_PIN, LOW);
    delay(500);
    return; // Don't send data if far away
  }

  sendToLaptop(distance);
  delay(100); 
}

void sendToLaptop(int dist) {
  // --- PROFESSIONAL JSON CREATION ---
  JsonDocument doc; 
  doc["sensor_type"] = "ultrasonic";
  doc["distance"] = dist;

  String jsonPayload;
  serializeJson(doc, jsonPayload);

  Serial.println("Sending: " + jsonPayload);

  if (client.connect(server, port)) {
    client.println("POST /api/detections/ HTTP/1.0");
    client.print("Host: "); client.println(server);
    client.println("Content-Type: application/json");
    client.print("Content-Length: "); client.println(jsonPayload.length());
    client.println();
    client.println(jsonPayload);
    
    Serial.println("✅ Sent!");
    client.stop();
  } else {
    Serial.println("❌ Connect Failed! Check Laptop IP.");
  }
}

//Codes made with the help of Gemini