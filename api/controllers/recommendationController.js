const sequelize = require('../config/database');
const RecommendationService = require('../services/recommendationService'); 
const recommendationService = new RecommendationService();

exports.postAnimesRecommendation = async (req, res) => {
    const { genreList } = req.body;
    const userId = req.params.id;

    if (!genreList) {
        return res.status(400).json({ erreur: 'Le paramètre genreList est requis.' });
    }

    try {
        const recommendations = await sequelize.query(`
            CALL GetAnimeRecommendations(:genreList);
        `, {
            replacements: { genreList },
            type: sequelize.QueryTypes.RAW
        });

        if (!recommendations || recommendations.length === 0) {
            return res.status(404).json({ message: 'Aucune recommandation trouvée pour les genres spécifiés.' });
        }

        await recommendationService.createRecommendation(userId, recommendations.map(r => r.id));
        return res.status(200).json(recommendations);
    } catch (error) {
        console.error('Erreur lors de la récupération des recommandations:', error);
        return res.status(500).json({ erreur: 'Une erreur est survenue lors de la récupération des recommandations.' });
    }
};


exports.getRecommendationsByUserId = async (req, res) => {
    const userId = req.params.id;

    try {
        const recommendations = await recommendationService.getRecommendationsByUserId(userId);
        return res.status(200).json(recommendations);
    } catch (error) {
        console.error('Erreur lors de la récupération des recommandations:', error);
        return res.status(500).json({ erreur: 'Une erreur est survenue lors de la récupération des recommandations.' });
    }
}