# Chavez-PEMBEDS-IntruderAlert and Smart Home (Arduino R4 WiFi IoT Systems)

**Intruder Alert: IoT Movement Scanner**

A real-time security system built for the **Programming Embedded Systems (PEMBEDS)** course. This project uses an ultrasonic sensor to detect movement and displays alert data on a web dashboard.

## 🛠 Architecture & Deployment

- **Frontend:** React + Vite (Deployed on **Vercel**)
- **Backend:** Django REST Framework (Deployed on **PythonAnywhere**)
- **Database:** PostgreSQL (Managed via **Supabase**)

## 🔌 Hardware

- **Microcontroller:** Arduino Uno R4 WiFi
- **Sensor:** HC-SR04 Ultrasonic Sensor
- **Alerts:** Passive Buzzer and LED

## 🔄 Data Flow

- **Detection:** The sensor detects movement → Arduino triggers Buzzer/LED → Sends a **POST** request to the Django API.
- **Storage:** Django receives the data and saves the event with a timestamp to **Supabase**.
- **Display:** The React frontend sends a **GET** request to the API to show the latest logs and history.

# Smart Home Control Panel: IoT Dashboard

**Intruder Alert: IoT Movement Scanner**

A real-time home automation system built for the Programming Embedded Systems (PEMBEDS) course. This project allows users to remotely control lighting brightness and motor speed through a responsive web interface.

## 🛠 Architecture & Deployment

- **Frontend:** React + Vite (Deployed on **Vercel**)
- **Backend:** Django REST Framework (Deployed on **PythonAnywhere**)
- **Database:** PostgreSQL (Managed via **Supabase**)

## 🔌 Hardware

- **Microcontroller:** Arduino Uno R4 WiFi
- **Lighting:** 5x LEDs (Blue, Green, Yellow, Red)
- **Motor Control:** 1x DC Motor + L293D Motor Driver IC
- **Power:** 9V Battery (Motor Power) + USB (Logic Power)

## 🔄 Data Flow

- **Control:** User adjusts a slider or toggle switch on the React Dashboard.
- **API Request:** The frontend sends a PATCH request to the Django API to update the device state.
- **Synchronization:** The Arduino constantly polls the API via GET requests.
- **Actuation:** The Arduino reads the new values and uses Pulse Width Modulation (PWM) to adjust LED brightness or Motor speed instantly.
