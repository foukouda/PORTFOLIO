// script-esp32.js

// Adresse IP de l'ESP32 sur le réseau local
const ESP32_IP = '10.1.224.94'; // Remplacez par l'adresse IP réelle de votre ESP32

// Initialisation de la connexion WebSocket
var socket;

function initWebSocket() {
    socket = new WebSocket(`ws://10.1.224.94:81`);

    socket.onopen = function() {
        console.log("Connexion WebSocket établie");
    };

    socket.onmessage = function(event) {
        console.log("Message reçu :", event.data);
        // Traitez les messages reçus ici (par exemple, mise à jour des graphiques)
        if (event.data.startsWith("HX711:")) {
            const hx711Value = event.data.split(":")[1];
            // Mettre à jour le graphique ou afficher la valeur HX711
            console.log("Valeur HX711 :", hx711Value);
        }
    };

    socket.onclose = function() {
        console.log("Connexion WebSocket fermée, tentative de reconnexion dans 5 secondes...");
        setTimeout(initWebSocket, 5000);
    };

    socket.onerror = function(error) {
        console.error("Erreur WebSocket :", error);
    };
}

// Gestion du bouton de connexion
const connectButton = document.getElementById('connect-esp32-button');
if (connectButton) {
    connectButton.addEventListener('click', function() {
        initWebSocket();
    });
}

// Gestion du bouton d'arrêt d'urgence
const emergencyButton = document.querySelector('.emergency-button');
if (emergencyButton) {
    emergencyButton.addEventListener('click', function() {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send("EMERGENCY_STOP");
        }
    });
}

// Gestion du slider PWM
const pwmSlider = document.getElementById('pwm-slider');
const pwmValue = document.getElementById('pwm-value');
if (pwmSlider && pwmValue) {
    pwmSlider.addEventListener('input', function() {
        const pwmPercentage = pwmSlider.value;
        pwmValue.textContent = pwmPercentage + '%';

        // Envoyer la valeur du signal PWM à l'ESP32 via WebSocket
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(`SET_PWM:${pwmPercentage}`);
        }
    });
}
