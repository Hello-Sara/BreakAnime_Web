const Genre = require('../models/AnimeGenre');
const Season = require('../models/Season');
const User = require('../models/User');

const getAdminStats = async (req, res) => {
    try {
        const genreCount = await Genre.count();
        const seasonCount = await Season.count();
        const userCount = await User.count();

        res.json({
            genres: genreCount,
            seasons: seasonCount,
            users: userCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des statistiques.' });
    }
};

module.exports = {
    getAdminStats
};