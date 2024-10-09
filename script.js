const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function toggleSidebar() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

menuToggle.addEventListener('click', function() {
    toggleSidebar();
});

overlay.addEventListener('click', function() {
    toggleSidebar();
});

/* Création des graphes spécifiques */

/* Premier graphe : Poussée en g par rapport au % d'activation du moteur */
const ctx1 = document.getElementById('graph1').getContext('2d');

// Données pour le premier graphe
const activationPourcentage = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const pousseeEnG = activationPourcentage.map(p => (Math.random() * p / 50).toFixed(2)); // Génération de données aléatoires pour la poussée

const chart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: activationPourcentage,
        datasets: [{
            label: 'Poussée en g',
            data: pousseeEnG,
            backgroundColor: 'rgba(22, 185, 78, 0.2)',
            borderColor: '#16b94e',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: '% d\'activation du moteur'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Poussée (g)'
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Poussée en g vs % d\'activation du moteur'
            }
        }
    }
});

/* Deuxième graphe : Intensité du son par rapport à la fréquence */
const ctx2 = document.getElementById('graph2').getContext('2d');

// Données pour le deuxième graphe
const frequences = [];
for (let i = 100; i <= 1000; i += 100) {
    frequences.push(i);
}
const intensiteSonore = frequences.map(f => (Math.random() * 100).toFixed(2)); // Génération de données aléatoires pour l'intensité

const chart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: frequences,
        datasets: [{
            label: 'Intensité sonore (dB)',
            data: intensiteSonore,
            backgroundColor: '#16b94e',
            borderColor: '#16b94e',
            borderWidth: 1,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Fréquence (Hz)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Intensité sonore (dB)'
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Intensité sonore vs Fréquence'
            }
        }
    }
});

/* Événements des boutons des graphes */

// Bouton du premier graphe
document.getElementById('graph1-button').addEventListener('click', function() {
    // Générer de nouvelles données pour la poussée
    const nouvellesDonnees = activationPourcentage.map(p => (Math.random() * p / 50).toFixed(2));
    chart1.data.datasets[0].data = nouvellesDonnees;
    chart1.update();
});

// Bouton du deuxième graphe
document.getElementById('graph2-button').addEventListener('click', function() {
    // Générer de nouvelles données pour l'intensité sonore
    const nouvellesDonnees = frequences.map(f => (Math.random() * 100).toFixed(2));
    chart2.data.datasets[0].data = nouvellesDonnees;
    chart2.update();
});
