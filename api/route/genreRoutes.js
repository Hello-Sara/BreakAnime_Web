const express = require('express');
const router = express.Router();
const GenreController = require('../controllers/genreController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddlewares'); 

// Afficher tous les genres
router.get('/genre', GenreController.getAllGenres);

// Afficher un genre spécifique par son ID
router.get('/genre/:id', GenreController.getGenreById);


router.get('/genre/name/:name', GenreController.getGenByName);

// Créer un nouveau genre
router.post('/genre', authenticateToken, isAdmin, GenreController.createGenre);

// Mettre à jour un genre existant
router.put('/genre/:id', authenticateToken, isAdmin, GenreController.updateGenre);

// Supprimer un genre
router.delete('/genre/:id', authenticateToken, isAdmin, GenreController.deleteGenre);

module.exports = router;