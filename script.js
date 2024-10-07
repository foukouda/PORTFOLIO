// Adresse IP de l'ESP32 (à adapter)
const esp32Ip = "10.1.224.146"; 

// Fonction pour envoyer des requêtes HTTP
function envoyerCommande(action) {
    fetch(`${esp32Ip}/action?action=${action}`)
        .then(response => response.text())
        .then(data => {
            console.log('Réponse de l\'ESP32 :', data);
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi de la commande :', error);
        });
}

// Gestionnaires d'événements pour les boutons
document.getElementById('btnAllumer').addEventListener('click', function() {
    envoyerCommande('allumer');
});

document.getElementById('btnEteindre').addEventListener('click', function() {
    envoyerCommande('eteindre');
});

