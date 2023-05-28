const {Configuration, OpenAIApi} = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const url = "mongodb+srv://chatbot:chatbot@cluster0.nzhrghj.mongodb.net/?retryWrites=true&w=majority"


const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connexion à votre base de données MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion à la base de données MongoDB établie');
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base de données MongoDB:', err);
  });

// Création du schéma pour les données
const promptSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true
  }
});

// Création du modèle pour les données
const Prompt = mongoose.model('Prompt', promptSchema);

const config = new Configuration({
  apiKey: process.env.API_TOKEN
});

const openai = new OpenAIApi(config);

app.post('/message', (req, res) => {
  const prompt = req.body.prompt;

  // Création d'une instance de modèle Prompt
  const newPrompt = new Prompt({
    prompt: prompt
  });

  // Sauvegarde du prompt dans la base de données
  newPrompt.save()
    .then(() => {
      const response = openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 256
      });

      response.then((data) => {
        console.log(data.data.choices[0].text);
        res.send({ message: data.data.choices[0].text });
      }).catch((err) => {
        res.send({ message: err });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: 'Erreur lors de l\'enregistrement du prompt' });
    });
});

app.listen(3000, () => {
  console.log('Écoute sur le port 3000');
});
