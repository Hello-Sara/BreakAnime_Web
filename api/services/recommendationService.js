const Recommendation = require('../models/recommendationModel');
const sequelize = require('../config/database');

exports.createRecommendation = async (userId, animeIds) => {
  try {
    const saveRecommendations = animeIds.map(animeId => ({
      user_id: userId,
      anime_id: animeId
    }));

    await saveRecommendations.forEach(async element => {
        await Recommendation.create(element);    
    });
    
    console.log('Recommandations créées avec succès.');
  } catch (error) {
    console.error('Erreur lors de la création des recommandations:', error);
    throw error;
  }
};