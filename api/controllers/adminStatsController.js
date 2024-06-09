const Genre = require('../models/genreModel');
const Anime = require('../models/animeModel');
const Season = require('../models/seasonModel');
const User = require('../models/userModel');

const getAdminStats = async (req, res) => {
    try {
        const animeCount = await Anime.count();
        const genreCount = await Genre.count();
        const seasonCount = await Season.count();
        const userCount = await User.count();

        res.json({
            animes: animeCount,
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