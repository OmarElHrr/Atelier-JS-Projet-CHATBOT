// Importer le module Express
const express = require('express');
// Créer une instance de l'application Express
const app = express();
// Définir le moteur de vue par défaut
app.set('view engine', 'ejs');
// Définir le dossier des vues
app.set('views', './views');
// Définir le middleware pour traiter les données de formulaire
app.use(express.urlencoded({ extended: true }));
// Définir la route pour afficher le formulaire
app.get('/', (req, res) => {
res.render('form');
});
// Définir la route pour traiter les données de formulaire
app.post('/', (req, res) => {
const name = req.body.name;
const email = req.body.email;
res.send(`Merci d'avoir soumis le formulaire ${name} (${email}).`);
});
// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
console.log('Serveur démarré sur le port 3000');
});