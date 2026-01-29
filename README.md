# Chavez-PEMBEDS-IntruderAlertArduino

**Intruder Alert: IoT Movement Scanner**

A real-time security system built for the **Programming Embedded Systems (PEMBEDS)** course. This project uses an ultrasonic sensor to detect movement and displays alert data on a web dashboard.

## 🛠 Architecture & Deployment
* **Frontend:** React + Vite (Deployed on **Vercel**)
* **Backend:** Django REST Framework (Deployed on **PythonAnywhere**)
* **Database:** PostgreSQL (Managed via **Supabase**)

## 🔌 Hardware
* **Microcontroller:** Arduino Uno R4 WiFi
* **Sensor:** HC-SR04 Ultrasonic Sensor
* **Alerts:** Passive Buzzer and LED

## 🔄 Data Flow
* **Detection:** The sensor detects movement → Arduino triggers Buzzer/LED → Sends a **POST** request to the Django API.
* **Storage:** Django receives the data and saves the event with a timestamp to **Supabase**.
* **Display:** The React frontend sends a **GET** request to the API to show the latest logs and history.
