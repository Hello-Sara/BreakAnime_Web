const Recommendation = require('../models/recommendationModel');
const sequelize = require('../config/database');
const Anime = require('../models/animeModel');

class RecommendationService {
  async createRecommendation(userId, animeIds) {
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
  }

  async getRecommendationsByUserId(userId) {
    try {
      const recommendations = await Recommendation.findAll({
        where: {
          user_id: userId
        },
        order: [
          ['created_at', 'DESC']
        ],
        include: {
          model: Anime,
          attributes: ['picture'] // Add the attributes you want to retrieve from the Anime table
        }
      });
  
      return recommendations;
    } catch (error) {
      console.error('Erreur lors de la récupération des recommandations:', error);
      throw error;
    }
  }
};

module.exports = RecommendationService;