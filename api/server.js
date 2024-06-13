const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./route/authRoutes');
const animeRoutes = require('./route/animeRoutes');
const genreRoutes = require('./route/genreRoutes');
const userRoutes = require('./route/userRoutes');
const seasonRoutes = require('./route/seasonRoutes');
const adminRoutes = require('./route/adminRoutes');
const quizzRoutes = require('./route/quizzRoutes');
const recommendationRoutes = require('./route/recommendationRoutes');
const Anime = require('./models/animeModel');
const Genre = require('./models/genreModel');
const Season = require('./models/seasonModel');
const Synonyms = require('./models/synonymsModel');
const AnimeGenre = require('./models/AnimeGenre');
const Question = require('./models/questionModel');
const Answer = require('./models/answerModel');
const Recommendation = require('./models/recommendationModel');
const AnswerGenre = require('./models/answerGenreModel'); 
const User = require('./models/userModel');

cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

corsOptions = { 
  origin: '*'
};

app.use(cors(corsOptions));

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const models = {
    Anime: Anime,
    Synonyms: Synonyms,
    Genre: Genre,
    AnimeGenre: AnimeGenre,
    Season: Season, 
    Question: Question,
    Answer: Answer,
    Recommendation: Recommendation,
    AnswerGenre: AnswerGenre,
    User: User
  };
  
  Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));

app.use('/api/auth', authRoutes);
app.use('/api', animeRoutes);
app.use('/api/resource', userRoutes);
app.use('/api', genreRoutes);
app.use('/api', seasonRoutes);
app.use('/api', adminRoutes);
app.use('/api', quizzRoutes);
app.use('/api', recommendationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
