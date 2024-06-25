const express = require('express');
const router = express.Router();
const animeController = require('../controllers/animeController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddlewares'); 

router.get('/animes', animeController.getAllAnimes);
router.get('/animes/:id', animeController.getAnimeById);
router.get('/anime/search', animeController.searchAnimeByTitleOrSynonym);
router.get('/animes/genre/:genreName', animeController.getAnimesByGenreName);

router.post('/animes', authenticateToken, isAdmin, animeController.createAnime);
router.post('/anime/addGenres', authenticateToken, isAdmin, animeController.addGenresToAnime);

router.put('/animes/:id', authenticateToken, isAdmin, animeController.updateAnime);

router.delete('/animes/:id', authenticateToken, isAdmin, animeController.deleteAnime);


module.exports = router;