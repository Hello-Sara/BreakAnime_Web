const Genre = require('../models/genreModel');

exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des genres', error: error.message });
  }
};

exports.getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) {
      return res.status(404).json({ message: 'Genre non trouvé' });
    }
    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du genre', error: error.message });
  }
};

exports.getGenreByName = async (req, res) => {
  try {
    const genre = await Genre.findOne({ where: { name: req.body.name } });
    if (!genre) {
      return res.status(404).json({ message: 'Genre non trouvé' });
    }
    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du genre', error: error.message });
  }
}

exports.createGenre = async (req, res) => {
  try {
    // Convertit le nom du genre en minuscules
    const genreName = req.body.name.toLowerCase();

    // Vérifie si un genre avec le même nom existe déjà
    const existingGenre = await Genre.findOne({ where: { name: genreName } });
    if (existingGenre) {
      return res.status(400).json({ message: 'Ce genre existe déjà' });
    }

    // Crée le nouveau genre avec le nom en minuscules
    const genre = await Genre.create({ ...req.body, name: genreName });
    res.status(201).json(genre);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du genre', error: error.message });
  }
};

exports.updateGenre = async (req, res) => {
  try {
    const [updated] = await Genre.update(req.body, { where: { id: req.params.id } });
    if (!updated) {
      return res.status(404).json({ message: 'Genre non trouvé' });
    }
    const updatedGenre = await Genre.findOne({ where: { id: req.params.id } });
    res.status(200).json(updatedGenre);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du genre', error: error.message });
  }
};

exports.deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) {
      return res.status(404).json({ message: 'Genre non trouvé' });
    }
    await genre.destroy();
    res.status(200).json({ message: 'Genre supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du genre', error: error.message });
  }
};