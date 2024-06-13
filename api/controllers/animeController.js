const AnimeService = require('../services/animeService');
const animeService = new AnimeService();

// Afficher tous les animes
exports.getAllAnimes = async (req, res) => {
  try {
    const animes = await animeService.getAllAnimes();
    res.status(200).json(animes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des animes', error: error.message });
  }
};

// Afficher un anime spécifique par son ID
exports.getAnimeById = async (req, res) => {
  try {
    const anime = await animeService.getAnimeById(req.params.id);
    if (!anime) {
      return res.status(404).json({ message: 'Anime non trouvé' });
    }
    res.status(200).json(anime);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'anime', error: error.message });
  }
};

// Rechercher un anime par titre ou synonyme
exports.searchAnimeByTitleOrSynonym = async (req, res) => {
  try {
    const searchTerm = req.query.term;
    const animes = await animeService.searchAnimeByTitleOrSynonym(searchTerm);
    res.status(200).json(animes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche des animes', error: error.message });
  }
};

// AnimeController.js

exports.getAnimesByGenreName = async (req, res) => {
  try {
    const genreName = req.params.genreName;
    const animes = await animeService.getAnimesByGenreName(genreName);
    if (!animes) {
      return res.status(404).json({ message: 'Aucun anime trouvé pour ce genre' });
    }
    res.status(200).json(animes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche des animes', error: error.message });
  }
};

// Créer un nouvel anime
exports.createAnime = async (req, res) => {
  try {
    const anime = animeService.createAnime(req.body);
    res.status(201).json(anime);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'anime', error: error.message });
  }
};

// Mettre à jour un anime existant
exports.updateAnime = async (req, res) => {
  try {
    const anime = await animeService.updateAnime(req.params.id, req.body);
    if (!anime) {
      return res.status(404).json({ message: 'Anime non trouvé' });
    }
    res.status(200).json(anime);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'anime', error: error.message });
  }
};

// Supprimer un anime
exports.deleteAnime = async (req, res) => {
  try {
    const anime = await animeService.deleteAnime(req.params.id);
    if (!anime) {
      return res.status(404).json({ message: 'Anime non trouvé' });
    }
    res.status(204).send(); // Pas de contenu à renvoyer après suppression
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'anime', error: error.message });
  }
};

exports.addGenresToAnime = async (req, res) => {
  try {
    const { animeId, genreIds } = req.body;
    await animeService.addGenresToAnime(animeId, genreIds);
    res.status(200).json({ message: 'Genres ajoutés avec succès à l\'anime' });
  } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l\'ajout des genres à l\'anime', error: error.message });
  }
};