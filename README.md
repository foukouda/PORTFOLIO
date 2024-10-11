# Responsive Web Interface for Trust Stand

This repository contains the HTML, JavaScript, and CSS code for a responsive web interface for managing the "Trust Stand" test platform. The project includes dynamic charts, a sidebar menu, and WebSocket integration for ESP32 communication.

## FIGMA lINK

https://www.figma.com/proto/kf5Ook12Ous0l0PIEMVUty/Untitled?node-id=0-1&t=xqmq3c0P0xDhc0Y3-1

## Project Overview

This project is intended to provide a user-friendly web interface for monitoring and controlling tests performed on the Trust Stand. It includes the following main features:

- **Sidebar Navigation**: A responsive sidebar for easy navigation.
- **Dynamic Charts**: Two graphs to visualize data, such as motor thrust and sound intensity.
- **ESP32 Integration**: WebSocket connection to an ESP32 microcontroller for real-time data exchange and control.
- **Stylish Layout**: A well-designed CSS theme inspired by the provided graphic charter.

## Folder Structure

- **index.html**: The main HTML page of the project, which includes a responsive sidebar and content area, integrating JavaScript and CSS files.
- **script/script-animations.js**: JavaScript for sidebar interaction and managing graph behavior.
- **script/script-esp32.js**: JavaScript that manages the WebSocket connection with an ESP32 and includes functionalities like PWM control and emergency stop.
- **style/style-desktop.css**: CSS styling to provide a visually appealing layout with a responsive design. The style follows the color scheme and typography specified in the graphic charter.
- **CHARTE GRAPHIQUE.pdf**: The document that outlines the color scheme, typography, and visual identity for the project.
- **charte pour afficher des donner discret.pdf**: Documentation with guidelines for displaying discrete data, including example cases and additional features.

## Features

1. **Responsive Sidebar**:
   - Collapsible menu for easy access to different sections.
   - Implements smooth transitions.
   - Additional options for adding other applications if needed.

2. **Interactive Graphs**:
   - Uses Chart.js for visualizing data.
   - Dynamic updates to display different parameters such as thrust and sound intensity.
   - Standardized tests for the motor, with options for data recording and graphical display.

3. **ESP32 WebSocket Integration**:
   - Establishes a WebSocket connection to receive real-time data and control the device.
   - Supports sending PWM signals and an emergency stop command.
   - Uses the FFT library to process data, such as frequency analysis for audio signals.

4. **Connection and Safety**:
   - Includes a button for establishing a connection to the ESP32.
   - Emergency stop button for immediate shutdown of operations.

## Usage

### Prerequisites

- A web server to serve the HTML, JavaScript, and CSS files.
- An ESP32 device configured for WebSocket communication.

### Getting Started

1. Clone the repository.
2. Place the files in a server directory (e.g., Apache, Nginx, or a simple Python HTTP server).
3. Replace the `ESP32_IP` in `script-esp32.js` with the actual IP address of your ESP32 on the local network.
4. Open `index.html` in a web browser.

### Running the Interface

- Use the sidebar for navigation.
- Press the "Connect ESP32" button to establish a WebSocket connection.
- Start a new test using the "Start new test" button.
- Adjust the PWM signal using the provided slider.

## Technologies Used

- **HTML5**: Provides the structure for the web interface.
- **CSS3**: Styles the interface to ensure a consistent and attractive user experience.
- **JavaScript**: Adds interactivity, including handling WebSocket communication and controlling the UI.
- **Chart.js**: Used for rendering the graphs.
- **FFT Library**: Used for processing frequency data in real time.

## License

This project is open-source, feel free to modify and use it as per your needs.

## Contact

If you have any questions or need further assistance, please reach out to Siebert Dimitry.
