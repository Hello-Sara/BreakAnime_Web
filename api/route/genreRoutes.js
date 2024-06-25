const express = require('express');
const router = express.Router();
const GenreController = require('../controllers/genreController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddlewares'); 


router.get('/genre', GenreController.getAllGenres);
router.get('/genre/:id', GenreController.getGenreById);
router.get('/genre/name/:name', GenreController.getGenreByName);

router.post('/genre', authenticateToken, isAdmin, GenreController.createGenre);

router.put('/genre/:id', authenticateToken, isAdmin, GenreController.updateGenre);

router.delete('/genre/:id', authenticateToken, isAdmin, GenreController.deleteGenre);

module.exports = router;